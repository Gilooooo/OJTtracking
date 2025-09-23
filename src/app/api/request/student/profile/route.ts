import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PUT(request: NextRequest) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { username, fullName, email, phone, student_id, gwa, achievements, yearlevel, school, course } = await request.json();
    await client.query(
      "UPDATE accounts SET full_name = $1, email_add = $2, phone_number = $3 WHERE user_name = $4",
      [fullName, email, phone, username]
    );
    await client.query(
        "UPDATE students SET course = $1, school = $2, year_level = $3 WHERE student_id = $4",
        [course, school, yearlevel, student_id]
    );
    const checkProfile = await client.query(`SELECT COUNT(*) as count FROM student_profile WHERE student_id = $1`, [student_id])
    if(checkProfile.rows[0].count == 0){
        await client.query(`INSERT INTO student_profile (name, student_id, gwa, achievements, created_date) VALUES ($1, $2, $3, $4, NOW())`, [fullName, student_id, gwa, JSON.stringify(achievements)])
    }else{
        await client.query(`UPDATE student_profile SET name = $1, gwa = $2, achievements = $3 WHERE student_id = $4`, [fullName, gwa, JSON.stringify(achievements), student_id])
    }
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
