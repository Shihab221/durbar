import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all approved users for the /about page
export async function GET() {
  try {
    const approvedUsers = await prisma.user.findMany({
      where: {
        isProfileApproved: true,
        name: { not: null },
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        batch: true,
        roll: true,
        subTeam: true,
        designation: true,
        contribution: true,
      },
      orderBy: [
        { subTeam: "asc" },
        { name: "asc" },
      ],
    });

    return NextResponse.json({ users: approvedUsers });
  } catch (error) {
    console.error("Get approved users error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
