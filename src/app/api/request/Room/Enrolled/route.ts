import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET(request: NextRequest) {
  const client = await pool.connect();
  
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('student_id');
    const userName = searchParams.get('user_name')
    if (!studentId || !userName) {
      return NextResponse.json({ error: 'Student ID and username are required' }, { status: 400 });
    }
    console.log(studentId, userName)
    // Get enrolled room for this student (1 student = 1 room)
    const enrolled = await client.query(
      `SELECT enrolled_code FROM student_enrolled WHERE student_id = $1 AND user_name = $2`, 
      [studentId, userName]
    );
    console.log(enrolled.rows[0])
    if (enrolled.rows.length === 0) {
      return NextResponse.json({ rooms: [] });
    }

    // Get room details for the enrolled room
    const roomCode = enrolled.rows[0].enrolled_code;
    const result = await client.query(
      `SELECT * FROM room_created WHERE room_code = $1`,
      [roomCode]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    console.log(result.rows[0])
    return NextResponse.json({ 
      rooms: [result.rows[0]], // Return as array for consistency
    });

  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  } finally {
    client.release();
  }
}