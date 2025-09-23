import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function GET(request : NextRequest){
    const client = await pool.connect()
    try{
        const { searchParams } = new URL(request.url)
        const email_add = searchParams.get('email_add')
        const logbook_result = await client.query("SELECT * FROM log_book WHERE email_add = $1 ORDER BY created_at DESC", [email_add])
        return new Response(JSON.stringify({progress: logbook_result.rows}), {status: 200})
    }catch(error){
        console.error('Error fetching data:', error)
        return new Response(JSON.stringify({error: 'Error fetching data'}), {status: 500})
    }finally{
        client.release()
    }
}