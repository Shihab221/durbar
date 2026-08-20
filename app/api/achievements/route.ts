import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all achievements (public)
export async function GET(request: NextRequest) {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ achievements });
  } catch (error) {
    console.error("Get achievements error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}