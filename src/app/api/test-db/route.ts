import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function GET() {
  try {
    const client = await pool.connect()
    
    // Test query
    const result = await client.query('SELECT NOW() as current_time')
    
    client.release()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully',
      timestamp: result.rows[0].current_time
    })
    
  } catch (error) {
    console.error('Database connection error:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}