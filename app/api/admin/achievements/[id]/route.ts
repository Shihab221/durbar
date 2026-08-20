import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

const VALID_ICONS = ["trophy", "award", "medal", "star"];

// Update an achievement (admin only)
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
        { error: "Invalid achievement ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Validate icon if provided
    if (body.icon !== undefined && !VALID_ICONS.includes(body.icon)) {
      return NextResponse.json(
        {
          error: `Icon must be one of: ${VALID_ICONS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const achievement = await prisma.achievement.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.description !== undefined && {
          description: body.description,
        }),
        ...(body.location !== undefined && { location: body.location }),
        ...(body.year !== undefined && { year: body.year }),
        ...(body.icon !== undefined && { icon: body.icon }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.imageAlt !== undefined && { imageAlt: body.imageAlt }),
        ...(body.highlight !== undefined && { highlight: body.highlight }),
        ...(body.order !== undefined && { order: body.order }),
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
      message: "Achievement updated successfully",
      achievement,
    });
  } catch (error) {
    console.error("Update achievement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete an achievement (admin only)
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
        { error: "Invalid achievement ID" },
        { status: 400 }
      );
    }

    await prisma.achievement.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error("Delete achievement error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}