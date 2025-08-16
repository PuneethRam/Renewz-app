import { NextResponse } from "next/server";
import { createConnection } from '@/lib/db';

// Type definitions
interface ProjectQueryRow {
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
  subscribed_capacity: number;
  available_capacity: number;
  roi: number;
  avg_monthly_units: number;
  payout_per_unit: number;
  total_units_generated: number;
  recent_daily_generation: number;
  is_live: number;
}

export async function GET(req: Request) {
  let connection;
  
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const region = searchParams.get('region') || 'all';
    const roiRange = searchParams.get('roiRange') || 'all';
    const sortBy = searchParams.get('sortBy') || 'roi';

    // Create database connection
    connection = await createConnection();

    // Build the base query with calculated fields including generation data
    let query = `
      SELECT 
        p.id,
        p.title,
        p.location,
        p.total_capacity_kw,
        p.cost_per_kw,
        p.rate_per_unit_investor,
        p.rate_per_unit_host,
        p.status,
        p.banner_url,
        p.created_at,
        COALESCE(SUM(s.subscribed_kw), 0) as subscribed_capacity,
        (p.total_capacity_kw - COALESCE(SUM(s.subscribed_kw), 0)) as available_capacity,
        -- Calculate ROI based on rates (simplified calculation)
        ROUND(((p.rate_per_unit_investor * 365 * 4) / p.cost_per_kw) * 100, 1) as roi,
        -- Calculate average monthly units (estimated)
        ROUND((p.total_capacity_kw * 4 * 30), 0) as avg_monthly_units,
        -- Calculate monthly payout per kW
        ROUND((p.rate_per_unit_investor * 4 * 30), 0) as payout_per_unit,
        -- Get total units generated from generation_data table
        COALESCE(
          (SELECT SUM(gd.units_generated_kwh) 
           FROM generation_data gd 
           WHERE gd.project_id = p.id), 0
        ) as total_units_generated,
        -- Get recent generation data (last 30 days average)
        COALESCE(
          (SELECT AVG(gd.units_generated_kwh) 
           FROM generation_data gd 
           WHERE gd.project_id = p.id 
           AND gd.date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)), 
          (p.total_capacity_kw * 4)
        ) as recent_daily_generation,
        -- Check if project is live (has recent generation data)
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM generation_data gd 
            WHERE gd.project_id = p.id 
            AND gd.date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
          ) THEN 1 
          ELSE 0 
        END as is_live
      FROM projects p
      LEFT JOIN subscriptions s ON p.id = s.project_id
      WHERE p.status = 'active'
    `;

    const queryParams: string[] = [];

    // Add search filter
    if (search.trim()) {
      query += ` AND (p.title LIKE ? OR p.location LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    // Add region filter
    if (region !== 'all') {
      query += ` AND p.location LIKE ?`;
      queryParams.push(`%${region}%`);
    }

    query += ` GROUP BY p.id`;

    // Add ROI filter (applied after grouping)
    if (roiRange !== 'all') {
      const roiConditions = {
        '10-12': 'HAVING roi >= 10 AND roi < 12',
        '12-15': 'HAVING roi >= 12 AND roi < 15',
        '15+': 'HAVING roi >= 15'
      };
      
      if (roiConditions[roiRange as keyof typeof roiConditions]) {
        if (query.includes('HAVING')) {
          query += ` AND ${roiConditions[roiRange as keyof typeof roiConditions].replace('HAVING ', '')}`;
        } else {
          query += ` ${roiConditions[roiRange as keyof typeof roiConditions]}`;
        }
      }
    }

    // Add sorting
    const sortOptions = {
      roi: 'ORDER BY roi DESC',
      capacity: 'ORDER BY available_capacity DESC',
      payout: 'ORDER BY payout_per_unit DESC'
    };

    query += ` ${sortOptions[sortBy as keyof typeof sortOptions] || sortOptions.roi}`;

    const [rows] = await connection.execute(query, queryParams);
    
    // Transform the data to match the expected format
    const projects = (rows as ProjectQueryRow[]).map(row => ({
      id: row.id,
      title: row.title,
      location: row.location,
      totalCapacity: parseFloat(String(row.total_capacity_kw)),
      availableCapacity: parseFloat(String(row.available_capacity)),
      costPerKw: parseFloat(String(row.cost_per_kw)),
      roi: parseFloat(String(row.roi)),
      avgMonthlyUnits: parseInt(String(row.avg_monthly_units)),
      payoutPerUnit: parseInt(String(row.payout_per_unit)),
      ratePerUnitInvestor: parseFloat(String(row.rate_per_unit_investor)),
      ratePerUnitHost: parseFloat(String(row.rate_per_unit_host)),
      status: row.status,
      bannerUrl: row.banner_url,
      subscriptions: parseInt(String(row.subscribed_capacity)) || 0,
      unitsGenerated: parseInt(String(row.total_units_generated)) || 0,
      recentDailyGeneration: parseFloat(String(row.recent_daily_generation)) || 0,
      isLive: Boolean(row.is_live)
    }));

    return NextResponse.json({
      success: true,
      data: projects,
      total: projects.length
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