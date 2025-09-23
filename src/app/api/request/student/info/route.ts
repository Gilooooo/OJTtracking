import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function GET(request : NextRequest){
    const client = await pool.connect()
    try{
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        if (!id) {
            return new Response(JSON.stringify({error: 'ID required'}), {status: 400})
        }
        const accountResult = await client.query("SELECT * FROM students WHERE id = $1", [id])
        if (accountResult.rows.length === 0) {
            return new Response(JSON.stringify({error: 'Student not found'}), {status: 404})
        }
        const studentProfile = await client.query("SELECT gwa, achievements FROM student_profile WHERE student_id = $1",[accountResult.rows[0].student_id])
        return new Response(JSON.stringify({...accountResult.rows[0], ...studentProfile.rows[0] || { gwa: null, achievements: null }}), {status: 200})
    }catch(error){
        console.error('Error fetching data:', error)
        return new Response(JSON.stringify({error: 'Error fetching data'}), {status: 500})
    }finally{
        client.release()
    }
}