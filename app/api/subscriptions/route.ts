// api/subscriptions/route.ts
import { NextResponse } from "next/server";
import { createConnection } from '@/lib/db';

// Type definition
interface SubscriptionWithProjectRow {
  id: string;
  user_id: string;
  project_id: string;
  subscribed_kw: number;
  amount_paid: number;
  start_date: string;
  status: string;
  title: string;
  location: string;
  total_capacity_kw: number;
  cost_per_kw: number;
  rate_per_unit_investor: number;
  rate_per_unit_host: number;
  project_status: string;
  banner_url: string;
}

export async function GET(req: Request) {
  let connection;
  
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    connection = await createConnection();

    // Get subscriptions with project details
    const [subscriptions] = await connection.execute(`
      SELECT 
        s.*,
        p.title,
        p.location,
        p.total_capacity_kw,
        p.cost_per_kw,
        p.rate_per_unit_investor,
        p.rate_per_unit_host,
        p.status as project_status,
        p.banner_url
      FROM subscriptions s
      JOIN projects p ON s.project_id = p.id
      WHERE s.user_id = ?
      ORDER BY s.start_date DESC
    `, [userId]);

    // Transform data to match frontend interface
    const formattedSubscriptions = (subscriptions as SubscriptionWithProjectRow[]).map(sub => ({
      id: sub.id,
      user_id: sub.user_id,
      project_id: sub.project_id,
      subscribed_kw: parseFloat(String(sub.subscribed_kw)),
      amount_paid: parseFloat(String(sub.amount_paid)),
      start_date: sub.start_date,
      status: sub.status,
      project: {
        id: sub.project_id,
        title: sub.title,
        location: sub.location,
        total_capacity_kw: parseFloat(String(sub.total_capacity_kw)),
        cost_per_kw: parseFloat(String(sub.cost_per_kw)),
        rate_per_unit_investor: parseFloat(String(sub.rate_per_unit_investor)),
        rate_per_unit_host: parseFloat(String(sub.rate_per_unit_host)),
        status: sub.project_status,
        banner_url: sub.banner_url
      }
    }));

    return NextResponse.json({ 
      subscriptions: formattedSubscriptions 
    }, { status: 200 });
    
  } catch (error) {
    console.error("❌ MySQL Query Error:", error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Unknown error",
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error("Error closing connection:", closeError);
      }
    }
  }
}