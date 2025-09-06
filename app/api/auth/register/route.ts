import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

// Local enum definition to avoid Prisma client dependency
enum UserRole {
  BUYER = "BUYER",
  SELLER = "SELLER",
  LAWYER = "LAWYER",
  ADMIN = "ADMIN"
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
      phone,
      role,
      barNumber,
      specialization = [],
    } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { message: "Invalid user role" },
        { status: 400 }
      );
    }

    // Validate lawyer-specific fields
    if (role === UserRole.LAWYER && (!barNumber || !specialization?.length)) {
      return NextResponse.json(
        { 
          message: "Bar number and at least one specialization are required for lawyers" 
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        ...(role === UserRole.LAWYER && {
          barNumber,
          specialization,
          isVerified: false, // Admin needs to verify lawyers
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // TODO: Send verification email
    // TODO: Notify admin about new lawyer registration

    return NextResponse.json(
      { 
        message: "User registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
