import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  
  try {
    const { token, newPassword } = await request.json();
    
    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
    }

    // Check if token exists and is valid
    const tokenResult = await client.query(
      'SELECT email_add, created_date FROM forgetpass WHERE code = $1',
      [token]
    );
    
    if (tokenResult.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    const { email_add, created_date } = tokenResult.rows[0];
    
    // Check if token is expired (1 hour)
    const tokenAge = Date.now() - new Date(created_date).getTime();
    const oneHour = 3600000; // 1 hour in milliseconds
    if (tokenAge < oneHour) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password in accounts table
    await client.query(
      'UPDATE accounts SET password = $1 WHERE email_add = $2',
      [hashedPassword, email_add]
    );
    
    // Delete used token
    await client.query(
      'DELETE FROM forgetpass WHERE code = $1 OR email_add = $2',
      [token, email_add]
    );
    
    return NextResponse.json({ message: 'Password updated successfully' });
    
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  } finally {
    client.release();
  }
}