import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Approve or reject a blog post
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
        { error: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { action } = body; // "approve" or "reject"

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve' or 'reject'" },
        { status: 400 }
      );
    }

    // Find the blog post
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    if (blog.status !== "pending") {
      return NextResponse.json(
        { error: "Blog post has already been reviewed" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      await prisma.blog.update({
        where: { id },
        data: {
          status: "approved",
          reviewedAt: new Date(),
          reviewedBy: authUser.userId,
          approvedAt: new Date(),
        },
      });

      return NextResponse.json({
        message: "Blog post approved successfully",
      });
    } else {
      await prisma.blog.update({
        where: { id },
        data: {
          status: "rejected",
          reviewedAt: new Date(),
          reviewedBy: authUser.userId,
        },
      });

      return NextResponse.json({
        message: "Blog post rejected",
      });
    }
  } catch (error) {
    console.error("Review blog error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
