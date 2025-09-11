import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PUT(request: NextRequest) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { username, fullName, email, phone } = await request.json();
    console.log(username, fullName, email, phone);
    await client.query(
      "UPDATE accounts SET full_name = $1, email_add = $2, phone_number = $3 WHERE user_name = $4",
      [fullName, email, phone, username]
    );
    await client.query("COMMIT");
    return new Response(
      JSON.stringify({ message: "Profile updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error updating profile:", error);
    return new Response(JSON.stringify({ error: "Error updating profile" }), {
      status: 500,
    });
  } finally {
    client.release();
  }
}
