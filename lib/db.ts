import mysql from "mysql2/promise";

// Database configuration
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT),
  ssl: {
    ca: process.env.MYSQL_SSL_CERT?.replace(/\\n/g, "\n"), // Keep your existing SSL config
    rejectUnauthorized: true
  },
  // Optimized for serverless
  acquireTimeout: 60000,
  timeout: 60000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Create individual connection
export const createConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Failed to create database connection:', error);
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Helper function for simple queries (optional convenience method)
export const executeQuery = async (query: string, params?: unknown[]) => {
  const connection = await createConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results;
  } finally {
    await connection.end();
  }
};

// For backward compatibility (if you have other files still importing default)
export default createConnection;