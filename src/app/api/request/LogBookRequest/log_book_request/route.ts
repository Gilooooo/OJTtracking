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
        if (!email_add) {
            return new Response(JSON.stringify({error: 'Email required'}), {status: 400})
        }
        const accountResult = await client.query("SELECT progress, updated_date, created_date FROM log_book WHERE email_add = $1", [email_add])
        console.log("REQUEST", accountResult.rows[0])
        return new Response(JSON.stringify(accountResult.rows[0]), {status: 200})

    }catch(error){
        console.error('Error fetching data:', error)
        return new Response(JSON.stringify({error: 'Error fetching data'}), {status: 500})
    }finally{
        client.release()
    }
}