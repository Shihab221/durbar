import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all projects (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category"); // "rover" | "ongoing" | null

    const where: any = {};
    if (category && (category === "rover" || category === "ongoing")) {
      where.category = category;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ category: "asc" }, { createdAt: "desc" }],
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

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}