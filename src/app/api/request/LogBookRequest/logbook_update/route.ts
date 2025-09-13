import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function PUT(request : NextRequest){
    const client = await pool.connect()
    try{
        await client.query("BEGIN")
        const { email_add, originalTitle, updatedProgress} = await request.json()
        
        await client.query(
            `UPDATE log_book SET progress = (
                SELECT jsonb_agg(CASE WHEN elem->>'title' = $1 THEN $2::jsonb ELSE elem END)
                FROM jsonb_array_elements(progress) elem
            ) WHERE email_add = $3`,
            [originalTitle, JSON.stringify(updatedProgress), email_add]
        )
        await client.query('COMMIT')
        return new Response(JSON.stringify({message: 'Logbook updated successfully'}), {status: 200})
        // return new Response(JSON.stringify(), {status: 200})

    }catch(error){
        await client.query('ROLLBACK')
        console.error('Error updating logbook:', error)
        return new Response(JSON.stringify({error: 'Error updating logbook'}), {status: 500})
    }finally{
        client.release()
    }
}