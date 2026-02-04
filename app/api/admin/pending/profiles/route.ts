import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Get all pending profile updates (admin only)
export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);
    
    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const pendingProfiles = await prisma.profileUpdate.findMany({
      where: { status: "pending" },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ pendingProfiles });
  } catch (error) {
    console.error("Get pending profiles error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
