import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Update a project (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getUserFromRequest(request);

    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate category if provided
    if (body.category !== undefined && !["rover", "ongoing"].includes(body.category)) {
      return NextResponse.json(
        { error: "Category must be 'rover' or 'ongoing'" },
        { status: 400 }
      );
    }

    // Validate progress if provided
    if (body.progress !== undefined) {
      if (typeof body.progress !== "number" || body.progress < 0 || body.progress > 100) {
        return NextResponse.json(
          { error: "Progress must be between 0 and 100" },
          { status: 400 }
        );
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name.trim() }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.year !== undefined && { year: body.year }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.specs !== undefined && { specs: body.specs }),
        ...(body.features !== undefined && { features: body.features }),
        ...(body.progress !== undefined && { progress: body.progress }),
        ...(body.highlight !== undefined && { highlight: body.highlight }),
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

    return NextResponse.json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a project (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getUserFromRequest(request);

    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}