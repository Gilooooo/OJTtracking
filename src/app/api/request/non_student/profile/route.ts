import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function PUT(request : NextRequest){
    const client = await pool.connect()
    try{
        await client.query('BEGIN')
        const {username } = await request.json()
        console.log(username);
    }catch(error){
        console.error('Error fetching data:', error)
        return new Response(JSON.stringify({error: 'Error fetching data'}), {status: 500})
    }finally{
        client.release()
    }
}