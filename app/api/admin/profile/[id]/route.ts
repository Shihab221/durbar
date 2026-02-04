import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Approve or reject a profile update
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
        { error: "Invalid profile update ID" },
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

    // Find the profile update
    const profileUpdate = await prisma.profileUpdate.findUnique({
      where: { id },
    });

    if (!profileUpdate) {
      return NextResponse.json(
        { error: "Profile update not found" },
        { status: 404 }
      );
    }

    if (profileUpdate.status !== "pending") {
      return NextResponse.json(
        { error: "Profile update has already been reviewed" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      // Update the profile update status and the user's profile
      await prisma.$transaction([
        // Update profile update status
        prisma.profileUpdate.update({
          where: { id },
          data: {
            status: "approved",
            reviewedAt: new Date(),
            reviewedBy: authUser.userId,
          },
        }),
        // Update user's profile with approved data
        prisma.user.update({
          where: { id: profileUpdate.userId },
          data: {
            name: profileUpdate.name,
            imageUrl: profileUpdate.imageUrl,
            batch: profileUpdate.batch,
            roll: profileUpdate.roll,
            subTeam: profileUpdate.subTeam,
            designation: profileUpdate.designation,
            contribution: profileUpdate.contribution,
            isProfileApproved: true,
          },
        }),
      ]);

      return NextResponse.json({
        message: "Profile update approved successfully",
      });
    } else {
      // Reject the profile update
      await prisma.profileUpdate.update({
        where: { id },
        data: {
          status: "rejected",
          reviewedAt: new Date(),
          reviewedBy: authUser.userId,
        },
      });

      return NextResponse.json({
        message: "Profile update rejected",
      });
    }
  } catch (error) {
    console.error("Review profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
