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
        console.log(accountResult.rows[0])
        return new Response(JSON.stringify(accountResult.rows[0]), {status: 200})

    }catch(error){
        console.error('Error fetching data:', error)
        return new Response(JSON.stringify({error: 'Error fetching data'}), {status: 500})
    }finally{
        client.release()
    }
}