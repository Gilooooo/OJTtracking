import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET(request: NextRequest) {
  const client = await pool.connect();
  
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const username = searchParams.get('username');

    if (!email || !username) {
      return NextResponse.json({ error: 'Email and username are required' }, { status: 400 });
    }

    // Get rooms created by this supervisor
    const result = await client.query(
      `SELECT 
        room_code,
        room_name,
        room_description,
        company,
        company_location,
        date
       FROM room_created
       WHERE supervisor_email = $1 AND user_name = $2
       ORDER BY date DESC`,
      [email, username]
    );
    return NextResponse.json({ 
      rooms: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  } finally {
    client.release();
  }
}