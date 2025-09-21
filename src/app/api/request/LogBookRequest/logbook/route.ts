import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PUT(request: NextRequest) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { username, email_add, roomcode, status, account_type, progress } =
      await request.json();
    const {
      date,
      time,
      hours_worked,
      tasks_completed,
      entry_type,
      title,
      description,
      attachments,
    } = progress;
    const values = Array.from({ length: 13 }, (_, i) => `$${i + 1}`).join(", ");
  
      await client.query(
        `INSERT INTO log_book (user_name, email_add, room_code, account_type, date, time, hours_worked, entry_type, title, description, tasks_completed, attachments, status) VALUES (${values})`,
        [
          username,
          email_add,
          roomcode,
          account_type,
          date,
          time,
          hours_worked,
          entry_type,
          title,
          description,
          tasks_completed,
          JSON.stringify(attachments),
          status,
        ]
      );
    
    await client.query("COMMIT");
    return new Response(
      JSON.stringify({ message: "Logbook added successfully" }),
      { status: 200 }
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Error fetching data" }), {
      status: 500,
    });
  } finally {
    client.release();
  }
}
