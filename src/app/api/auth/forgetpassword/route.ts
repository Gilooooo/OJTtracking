import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { Resend } from 'resend';
import crypto from 'crypto';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const client = await pool.connect();
  
  try {
    const { email} = await request.json();
    
    // Check if user exists
    const userResult = await client.query(
      'SELECT user_name FROM accounts WHERE email_add = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }
    console.log(userResult.rows[0].user_name);
    // Generate reset token
    const resetToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now
    
    // Save token to database (you'll need to create this table)
    await client.query(
      'INSERT INTO forgetpass (code, user_name, email_add, created_date) VALUES ($1, $2, $3, $4)',
      [resetToken, userResult.rows[0].user_name, email, expiresAt]
    );
    
    // Send email
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reset Your Password - OJT Tracking',
      html: `
        <h2>Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.NEXTAUTH_URL}/Forgot-Password?token=${resetToken}">
          Reset Password
        </a>
        <p>This link expires in 1 hour.</p>
      `
    });
    return NextResponse.json({ message: 'Reset email sent successfully' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
  } finally {
    client.release();
  }
}
