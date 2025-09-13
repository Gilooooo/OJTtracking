import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function DELETE(request: NextRequest) {
  const client = await pool.connect();
  try {
    const { email_add, title } = await request.json();
    await client.query(
      `UPDATE log_book 
       SET progress = (
         SELECT jsonb_agg(item) 
         FROM jsonb_array_elements(progress) AS item 
         WHERE item->>'title' != $1
       ) 
       WHERE email_add = $2`,
      [title, email_add]
    );


    
    return new Response(
      JSON.stringify({ message: "Log entry deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting log entry:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete log entry" }),
      {
        status: 500,
      }
    );
  } finally {
    client.release();
  }
}
