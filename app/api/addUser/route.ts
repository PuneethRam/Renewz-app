import { NextResponse } from "next/server";
import { createConnection } from '@/lib/db'; // Import the connection function

export async function POST(req: Request) {
  let connection;
  
  try {
    const { uid, name, email } = await req.json();

    // Create database connection
    connection = await createConnection();

    await connection.execute(
      "INSERT INTO Users (firebase_uid, name, email) VALUES (?, ?, ?)",
      [uid, name, email]
    );

    return NextResponse.json({ message: "User added to MySQL" }, { status: 200 });
    
  } catch (error) {
    console.error("❌ MySQL Insert Error:", error);

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