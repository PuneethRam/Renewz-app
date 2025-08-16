import { NextResponse } from "next/server";
import { createConnection } from '@/lib/db';

// Type definitions
interface StatsRow {
  total_projects: number;
  total_capacity: number;
  available_capacity: number;
  avg_roi: number;
  total_regions: number;
}

interface RegionRow {
  region: string;
}

export async function GET() {
  let connection;
  
  try {
    // Create database connection
    connection = await createConnection();

    // Get overall statistics
    const [statsRows] = await connection.execute(`
      SELECT 
        COUNT(*) as total_projects,
        SUM(p.total_capacity_kw) as total_capacity,
        SUM(p.total_capacity_kw - COALESCE(s.subscribed_kw, 0)) as available_capacity,
        AVG(((p.rate_per_unit_investor * 365 * 4) / p.cost_per_kw) * 100) as avg_roi,
        COUNT(DISTINCT SUBSTRING_INDEX(p.location, ', ', -1)) as total_regions
      FROM projects p
      LEFT JOIN (
        SELECT project_id, SUM(subscribed_kw) as subscribed_kw
        FROM subscriptions
        GROUP BY project_id
      ) s ON p.id = s.project_id
      WHERE p.status = 'active'
    `);

    const stats = (statsRows as StatsRow[])[0];

    // Get unique regions
    const [regionRows] = await connection.execute(`
      SELECT DISTINCT SUBSTRING_INDEX(location, ', ', -1) as region
      FROM projects
      WHERE status = 'active' AND location IS NOT NULL
      ORDER BY region
    `);

    const regions = (regionRows as RegionRow[]).map(row => row.region);

    return NextResponse.json({
      success: true,
      data: {
        totalProjects: parseInt(String(stats.total_projects)) || 0,
        totalCapacity: parseFloat(String(stats.total_capacity)) || 0,
        availableCapacity: parseFloat(String(stats.available_capacity)) || 0,
        averageROI: parseFloat(String(stats.avg_roi)) || 0,
        totalRegions: parseInt(String(stats.total_regions)) || 0,
        regions: regions
      }
    });

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