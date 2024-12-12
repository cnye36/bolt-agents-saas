import { NextResponse } from 'next/server'
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" }, 
        { status: 400 }
      )
    }

    // Create new user with hashed password
    const user = await db.user.create({
      data: {
        name,
        email,
        password 
      }
    })

    return NextResponse.json(
      { message: "User created successfully", userId: user.id }, 
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "Error creating user" }, 
      { status: 500 }
    )
  }
}