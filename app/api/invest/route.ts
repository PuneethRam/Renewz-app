import { NextResponse } from "next/server";
import { createConnection } from '@/lib/db';
import { RowDataPacket, OkPacket } from 'mysql2';

// Define interfaces for type safety
interface ProjectRow extends RowDataPacket {
  total_capacity_kw: number;
}

interface SubscriptionSumRow extends RowDataPacket {
  total_subscribed: number;
}

interface ExistingSubscriptionRow extends RowDataPacket {
  id: number;
}

export async function POST(req: Request) {
  let connection;
  
  try {
    const { user_id, project_id, subscribed_kw, amount_paid } = await req.json();

    // Validate required fields
    if (!user_id || !project_id || !subscribed_kw || !amount_paid) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create database connection
    connection = await createConnection();

    // Start transaction
    await connection.beginTransaction();

    try {
      // Check if project exists and get current subscriptions
      const [projectRows] = await connection.execute<ProjectRow[]>(
        "SELECT total_capacity_kw FROM projects WHERE id = ?",
        [project_id]
      );

      if (projectRows.length === 0) {
        throw new Error("Project not found");
      }

      const project = projectRows[0];
      const totalCapacity = project.total_capacity_kw;

      // Get current total subscriptions for this project
      const [subscriptionRows] = await connection.execute<SubscriptionSumRow[]>(
        "SELECT COALESCE(SUM(subscribed_kw), 0) as total_subscribed FROM subscriptions WHERE project_id = ? AND status != 'cancelled'",
        [project_id]
      );

      const currentSubscribed = subscriptionRows[0]?.total_subscribed || 0;
      const availableCapacity = totalCapacity - currentSubscribed;

      // Check if requested capacity is available
      if (subscribed_kw > availableCapacity) {
        throw new Error(`Insufficient capacity. Available: ${availableCapacity} kW, Requested: ${subscribed_kw} kW`);
      }

      // Check if user already has subscription for this project
      const [existingSubscription] = await connection.execute<ExistingSubscriptionRow[]>(
        "SELECT id FROM subscriptions WHERE user_id = ? AND project_id = ?",
        [user_id, project_id]
      );

      if (existingSubscription.length > 0) {
        throw new Error("User already has a subscription for this project");
      }

      // Insert new subscription with status 'applied'
      const [result] = await connection.execute<OkPacket>(
        "INSERT INTO subscriptions (user_id, project_id, subscribed_kw, amount_paid, status, start_date) VALUES (?, ?, ?, ?, 'applied', CURDATE())",
        [user_id, project_id, subscribed_kw, amount_paid]
      );

      // Commit transaction
      await connection.commit();

      return NextResponse.json({ 
        success: true, 
        message: "Investment application submitted successfully",
        subscription_id: result.insertId
      }, { status: 200 });

    } catch (error) {
      // Rollback transaction on error
      await connection.rollback();
      throw error;
    }

  } catch (error) {
    console.error("❌ Investment Error:", error);
    return NextResponse.json(
      { 
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