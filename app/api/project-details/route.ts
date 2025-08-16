// app/api/project-details/route.ts
import { NextResponse } from "next/server";
import { createConnection } from '@/lib/db';

// Type definitions
interface ProjectRow {
  id: string;
  title: string;
  location: string;
  total_capacity_kw: number;
  cost_per_kw: number;
  rate_per_unit_investor: number;
  rate_per_unit_host: number;
  status: string;
  banner_url: string;
  created_at: string;
  host_name?: string;
  host_email?: string;
  host_phone?: string;
  host_location?: string;
}

interface SubscriptionData {
  subscription_count: number;
  total_subscribed_kw: number;
}

interface GenerationData {
  total_units_generated: number;
  avg_daily_generation: number;
}

export async function GET(req: Request) {
  let connection;
  
  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Create database connection
    connection = await createConnection();

    // Get project details with host information
    const [projectRows] = await connection.execute(
      `SELECT 
        p.*,
        h.name as host_name,
        h.email as host_email,
        h.phone as host_phone,
        h.location as host_location
      FROM projects p
      LEFT JOIN hosts h ON p.id = h.project_id
      WHERE p.id = ?`,
      [projectId]
    );

    if (!Array.isArray(projectRows) || projectRows.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const project = projectRows[0] as ProjectRow;

    // Get subscription count and total subscribed capacity
    const [subscriptionRows] = await connection.execute(
      `SELECT 
        COUNT(*) as subscription_count,
        COALESCE(SUM(subscribed_kw), 0) as total_subscribed_kw
      FROM subscriptions 
      WHERE project_id = ?`,
      [projectId]
    );

    const subscriptionData = Array.isArray(subscriptionRows) 
      ? subscriptionRows[0] as SubscriptionData 
      : { subscription_count: 0, total_subscribed_kw: 0 };

    // Get latest generation data
    const [generationRows] = await connection.execute(
      `SELECT 
        SUM(units_generated_kwh) as total_units_generated,
        AVG(units_generated_kwh) as avg_daily_generation
      FROM generation_data 
      WHERE project_id = ?`,
      [projectId]
    );

    const generationData = Array.isArray(generationRows) 
      ? generationRows[0] as GenerationData 
      : { total_units_generated: 0, avg_daily_generation: 0 };

    // Calculate available capacity
    const availableCapacity = Number(project.total_capacity_kw) - Number(subscriptionData.total_subscribed_kw);
    
    // Calculate ROI (this is a simplified calculation)
    const annualGeneration = Number(project.total_capacity_kw) * 1200; // Assuming 1200 kWh per kW annually
    const annualRevenue = annualGeneration * Number(project.rate_per_unit_investor);
    const totalInvestment = Number(project.total_capacity_kw) * Number(project.cost_per_kw);
    const roi = totalInvestment > 0 ? (annualRevenue / totalInvestment) * 100 : 0;

    // Format the response
    const projectDetails = {
      id: project.id,
      title: project.title,
      location: project.location,
      totalCapacity: Number(project.total_capacity_kw),
      availableCapacity: Math.max(0, availableCapacity),
      costPerKw: Number(project.cost_per_kw),
      ratePerUnitInvestor: Number(project.rate_per_unit_investor),
      ratePerUnitHost: Number(project.rate_per_unit_host),
      status: project.status,
      bannerUrl: project.banner_url,
      roi: Number(roi.toFixed(1)),
      subscriptions: Number(subscriptionData.subscription_count),
      totalSubscribedKw: Number(subscriptionData.total_subscribed_kw),
      unitsGenerated: Number(generationData.total_units_generated || 0),
      avgDailyGeneration: Number(generationData.avg_daily_generation || 0),
      isLive: project.status === 'active',
      createdAt: project.created_at,
      hostInfo: {
        name: project.host_name || 'TBD',
        email: project.host_email || '',
        phone: project.host_phone || '',
        location: project.host_location || project.location,
        type: 'Commercial Rooftop', // You can add this field to your hosts table if needed
        established: '2015' // You can add this field to your hosts table if needed
      }
    };

    return NextResponse.json({
      success: true,
      data: projectDetails
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ MySQL Query Error:", error);

    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  } finally {
    // Always close the connection
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
}