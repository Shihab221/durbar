import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

const VALID_ICONS = ["trophy", "award", "medal", "star"];

// Get all achievements (admin)
export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);

    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

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
    console.error("Get admin achievements error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new achievement (admin only)
export async function POST(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);

    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      location,
      year,
      icon,
      imageUrl,
      imageAlt,
      highlight,
      order,
    } = body;

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Validate icon if provided
    const finalIcon = icon || "trophy";
    if (!VALID_ICONS.includes(finalIcon)) {
      return NextResponse.json(
        {
          error: `Icon must be one of: ${VALID_ICONS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const achievement = await prisma.achievement.create({
      data: {
        title: title.trim(),
        description,
        location: location || null,
        year: year || null,
        icon: finalIcon,
        imageUrl: imageUrl || null,
        imageAlt: imageAlt || null,
        highlight: highlight ?? false,
        order: typeof order === "number" ? order : 0,
        createdById: authUser.userId,
      },
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

    return NextResponse.json(
      {
        message: "Achievement created successfully",
        achievement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create achievement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}