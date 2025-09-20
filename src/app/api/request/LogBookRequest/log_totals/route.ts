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
    const getTotal = await client.query("SELECT SUM(hours_worked) as total, COUNT(*) as total_logs FROM log_book WHERE email_add = $1",[email]);
    console.log(getTotal.rows)
    return new Response(
      JSON.stringify({total: getTotal.rows[0].total, total_logs: getTotal.rows[0].total_logs}),
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
