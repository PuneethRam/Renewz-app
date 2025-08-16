import { NextResponse } from "next/server";
import { createConnection } from '@/lib/db';

// Type definitions
interface SubscriptionRow {
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

interface PayoutRow {
  id: string;
  payout_month: string;
  units_generated_kwh: number;
  payout_amount: number;
  status: string;
}

interface GenerationDataRow {
  date: string;
  units_generated_kwh: number;
}

export async function GET(req: Request) {
  let connection;
  
  try {
    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get('subscriptionId');
    
    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    connection = await createConnection();

    // Get subscription details with project info
    const [subscriptionRows] = await connection.execute(`
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
      WHERE s.id = ?
    `, [subscriptionId]);

    if (!subscriptionRows || (subscriptionRows as SubscriptionRow[]).length === 0) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    const subscription = (subscriptionRows as SubscriptionRow[])[0];

    // Get payouts for this subscription
    const [payouts] = await connection.execute(`
      SELECT * FROM payouts 
      WHERE subscription_id = ? 
      ORDER BY payout_month DESC
    `, [subscriptionId]);

    // Get generation data for the project (last 90 days)
    const [generationData] = await connection.execute(`
      SELECT 
        date,
        units_generated_kwh * (? / ?) as units_generated_kwh
      FROM generation_data 
      WHERE project_id = ? 
      AND date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      ORDER BY date DESC
    `, [
      parseFloat(String(subscription.subscribed_kw)),
      parseFloat(String(subscription.total_capacity_kw)),
      subscription.project_id
    ]);

    // Calculate averages and metrics
    const payoutArray = payouts as PayoutRow[];
    const avgMonthlyPayout = payoutArray.length > 0 
      ? payoutArray.reduce((sum: number, p: PayoutRow) => sum + parseFloat(String(p.payout_amount)), 0) / payoutArray.length
      : 0;

    const lastMonthPayout = payoutArray.length > 0 
      ? parseFloat(String(payoutArray[0].payout_amount))
      : 0;

    const generationArray = generationData as GenerationDataRow[];
    const avgMonthlyGeneration = generationArray.length > 0
      ? (generationArray.reduce((sum: number, g: GenerationDataRow) => sum + parseFloat(String(g.units_generated_kwh)), 0) / generationArray.length) * 30
      : parseFloat(String(subscription.subscribed_kw)) * 30 * 4; // Rough estimate if no data

    // Format the response
    const response = {
      id: subscription.id,
      user_id: subscription.user_id,
      project_id: subscription.project_id,
      subscribed_kw: parseFloat(String(subscription.subscribed_kw)),
      amount_paid: parseFloat(String(subscription.amount_paid)),
      start_date: subscription.start_date,
      status: subscription.status,
      project: {
        id: subscription.project_id,
        title: subscription.title,
        location: subscription.location,
        total_capacity_kw: parseFloat(String(subscription.total_capacity_kw)),
        cost_per_kw: parseFloat(String(subscription.cost_per_kw)),
        rate_per_unit_investor: parseFloat(String(subscription.rate_per_unit_investor)),
        rate_per_unit_host: parseFloat(String(subscription.rate_per_unit_host)),
        status: subscription.project_status,
        banner_url: subscription.banner_url
      },
      payouts: payoutArray.map((p: PayoutRow) => ({
        id: p.id,
        payout_month: p.payout_month,
        units_generated_kwh: parseFloat(String(p.units_generated_kwh)),
        payout_amount: parseFloat(String(p.payout_amount)),
        status: p.status
      })),
      generationData: generationArray.map((g: GenerationDataRow) => ({
        date: g.date,
        units_generated_kwh: parseFloat(String(g.units_generated_kwh))
      })),
      avgMonthlyGeneration,
      avgMonthlyPayout,
      lastMonthPayout
    };

    return NextResponse.json(response, { status: 200 });
    
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