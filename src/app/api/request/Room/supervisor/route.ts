import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function PUT(request: NextRequest) {
  const client = await pool.connect();
  
  try {
    const { 
      company, 
      roomCode, 
      roomName, 
      roomDescription, 
      supervisorEmail, 
      supervisorUsername,
      companyLocation,
      supervisorName
    } = await request.json();

    // Validate required fields
    if (!roomName || !roomDescription || !roomCode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    console.log("Received Data:", {company, roomCode, roomName, roomDescription, supervisorEmail, supervisorUsername, companyLocation, supervisorName});
    //Insert room into database
    await client.query(
      `INSERT INTO room_created (user_name, supervisor_name, company, room_name, room_code, company_location, date) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) 
       RETURNING *`,
      [supervisorUsername, supervisorName, company, roomName, roomCode, companyLocation]
    );

    return NextResponse.json({ 
      message: 'Room created successfully',
    });

  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  } finally {
    client.release();
  }
}