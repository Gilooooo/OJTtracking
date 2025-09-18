import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function PUT(request: NextRequest) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    
    const { roomCode, studentData } = await request.json();

    // Check if room exists
    const checkRoom = await client.query(
      "SELECT * FROM room_created WHERE TRIM(room_code) = TRIM($1)", 
      [roomCode]
    );

    if(checkRoom.rows.length === 0){
      await client.query("ROLLBACK");
      return NextResponse.json({ error: "Room doesn't exist" }, { status: 404 });
    }

    // Check if student already enrolled
    const checkEnrollment = await client.query(
      "SELECT * FROM student_enrolled WHERE student_id = $1 AND enrolled_code = $2",
      [studentData.student_id, roomCode]
    );

    if(checkEnrollment.rows.length > 0){
      await client.query("ROLLBACK");
      return NextResponse.json({ error: "Already enrolled in this room" }, { status: 400 });
    }

    // Calculate end date in JavaScript
    const startDate = new Date();
    const workDays = Math.ceil(studentData.hours_required / 8);
    
    const currentDate = new Date(startDate);
    let addedDays = 0;
    
    while (addedDays < workDays) {
      currentDate.setDate(currentDate.getDate() + 1);
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        addedDays++;
      }
    }
    
    const endDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Enroll student
    await client.query(
      `INSERT INTO student_enrolled (
        student_id, course, school, year_level, hours_required, 
        created_date, user_name, start_date, end_date, enrolled_code
      ) VALUES (
        $1, $2, $3, $4, $5, 
        NOW(), $6, NOW(), 
        $7, $8
      )`,
      [
        studentData.student_id,
        studentData.course,
        studentData.school,
        studentData.year_level,
        studentData.hours_required,
        studentData.name,
        endDate,
        roomCode
      ]
    );

    await client.query("COMMIT");
    
    return NextResponse.json({
      message: "Successfully enrolled in room",
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error enrolling student:", error);
    return NextResponse.json(
      { error: "Failed to enroll in room" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}

