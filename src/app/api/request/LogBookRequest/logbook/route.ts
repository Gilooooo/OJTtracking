import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function PUT(request : NextRequest){
    const client = await pool.connect()
    try{
        await client.query("BEGIN")
        const { email_add, account_type, user_name, progress} = await request.json()
        const checkingrow = await client.query("SELECT progress FROM log_book WHERE email_add = $1", [email_add])
        if(checkingrow.rows.length == 0){
            await client.query("INSERT INTO log_book (email_add, account_type, user_name, progress, updated_date, created_date) VALUES ($1, $2, $3, $4, NOW(), NOW())", [email_add, account_type, user_name, JSON.stringify([progress])])
        }else{
            const existingProgress = checkingrow.rows[0].progress || [];
            const updatedProgress = Array.isArray(existingProgress) ? [progress ,...existingProgress] : [progress];
            await client.query("UPDATE log_book SET progress = $1, updated_date = NOW() WHERE email_add = $2", [JSON.stringify(updatedProgress), email_add])
        }
        await client.query('COMMIT')
        return new Response(JSON.stringify({message: 'Logbook updated successfully'}), {status: 200})
        // return new Response(JSON.stringify(), {status: 200})

    }catch(error){
        console.error('Error fetching data:', error)
        return new Response(JSON.stringify({error: 'Error fetching data'}), {status: 500})
    }finally{
        client.release()
    }
}