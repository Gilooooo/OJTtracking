// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  const client = await pool.connect();

  try {
    // Start transaction
    await client.query("BEGIN");
    const {
      email,
      fullName,
      username,
      phone,
      password,
      accountType,
      ...roleData
    } = await request.json();
    // 1. Insert into accounts table
    const hashedPassword = await bcrypt.hash(password, 10);
    const duplicateCheck = await client.query(
      "SELECT email_add, user_name FROM accounts WHERE email_add = $1 OR user_name = $2",
      [email, username]
    );
    let accountId;
    if (duplicateCheck.rows.length > 0) {
      const existing = duplicateCheck.rows[0];
      if (existing.email_add.trim() === email) {
        console.log("Email already exists");
        await client.query("ROLLBACK");
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
      if (existing.user_name.trim() === username) {
        console.log("Username already exists");
        await client.query("ROLLBACK");
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 400 }
        );
      }
    } else {
      const accountResult = await client.query(
        "INSERT INTO accounts (email_add, full_name, user_name, phone_number, password, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [email, fullName, username, phone, hashedPassword, accountType]
      );
      accountId = accountResult.rows[0].id;
      if (accountType === "student") {
        await client.query(
          "INSERT INTO students (id, student_id, course, school, year_level, hours_required) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            accountId,
            roleData.studentId,
            roleData.course,
            roleData.school,
            roleData.yearLevel,
            parseInt(roleData.hoursRequired) || 0,
          ]
        );
      } else if (accountType === "supervisor") {
        await client.query(
          "INSERT INTO supervisor (id, company) VALUES ($1, $2)",
          [accountId, roleData.company]
        );
      } else if (accountType === "non-student") {
        await client.query(
          "INSERT INTO non_students (id, hours_required) VALUES ($1, $2)",
          [accountId, roleData.hoursRequired]
        );
      }
    }
    // 2. Insert into role-specific table

    // Commit transaction
    await client.query("COMMIT");

    return NextResponse.json({ message: "Account created successfully" });
  } catch (error) {
    // Rollback on error
    await client.query("ROLLBACK");
    console.error("Error in signup route:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
