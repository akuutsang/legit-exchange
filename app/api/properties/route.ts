// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { propertyFiltersSchema } from "@/lib/validations/property";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { propertyFiltersSchema } from "@/lib/validations/property";
import { ZodError } from "zod";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Convert query params into plain object
    const rawParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      rawParams[key] = value;
    });

    // ✅ Validate with Zod
    const queryParams = propertyFiltersSchema.parse(rawParams);

    // 🔥 Now use queryParams as you were before...
    // Example:
    const page = parseInt(queryParams.page ?? "1");
    const limit = parseInt(queryParams.limit ?? "10");
    const skip = (page - 1) * limit;

    // ... rest of your Prisma query and response formatting stays the same
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
