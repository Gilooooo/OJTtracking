import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: NextRequest) {
  const client = await pool.connect();
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const totalHours = await client.query(
      "SELECT COALESCE(SUM((elem->>'hours_worked')::int), 0) as total_hours FROM log_book, jsonb_array_elements(progress) as elem WHERE email_add = $1",
      [email]
    );
    const totalLogs = await client.query(
      "SELECT COALESCE(jsonb_array_length(progress), 0) as total_logs FROM log_book WHERE email_add = $1",
      [email]
    );
    return new Response(
      JSON.stringify({
        total_hours: totalHours.rows[0].total_hours,
        total_logs: totalLogs.rows[0].total_logs,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
    });
  } finally {
    client.release();
  }
}
