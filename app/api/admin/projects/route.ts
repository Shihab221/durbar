import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Get all projects (admin)
export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);

    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const projects = await prisma.project.findMany({
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
    console.error("Get admin projects error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new project (admin only)
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
      name,
      category,
      year,
      status,
      description,
      imageUrl,
      specs,
      features,
      progress,
      highlight,
    } = body;

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    if (!category || !["rover", "ongoing"].includes(category)) {
      return NextResponse.json(
        { error: "Category must be 'rover' or 'ongoing'" },
        { status: 400 }
      );
    }

    // Validate category-specific fields
    if (category === "ongoing") {
      if (typeof progress !== "number" || progress < 0 || progress > 100) {
        return NextResponse.json(
          { error: "Ongoing projects must have a progress value between 0 and 100" },
          { status: 400 }
        );
      }
    }

    const project = await prisma.project.create({
      data: {
        name: name.trim(),
        category,
        year: year || null,
        status: status || null,
        description,
        imageUrl: imageUrl || null,
        specs: specs || undefined,
        features: features || [],
        progress: progress ?? null,
        highlight: highlight ?? false,
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
        message: "Project created successfully",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}