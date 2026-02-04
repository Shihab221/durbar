import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { validateSubTeam, validateContribution, sanitizeString } from "@/lib/validation";
import { SubTeam } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);
    
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, imageUrl, batch, roll, subTeam, designation, contribution } = body;

    // Validate subTeam if provided
    if (subTeam && !validateSubTeam(subTeam)) {
      return NextResponse.json(
        { error: "Invalid sub team. Must be one of: mechanical, control, autonomous, science, management" },
        { status: 400 }
      );
    }

    // Validate contribution length
    if (contribution) {
      const contributionValidation = validateContribution(contribution);
      if (!contributionValidation.valid) {
        return NextResponse.json(
          { error: contributionValidation.error },
          { status: 400 }
        );
      }
    }

    // Create profile update request
    const profileUpdate = await prisma.profileUpdate.create({
      data: {
        userId: authUser.userId,
        name: name ? sanitizeString(name) : null,
        imageUrl: imageUrl || null,
        batch: batch ? sanitizeString(batch) : null,
        roll: roll ? sanitizeString(roll) : null,
        subTeam: subTeam ? (subTeam.toLowerCase() as SubTeam) : null,
        designation: designation ? sanitizeString(designation) : null,
        contribution: contribution ? sanitizeString(contribution) : null,
        status: "pending",
      },
    });

    return NextResponse.json({
      message: "Profile update submitted for approval",
      profileUpdate,
    }, { status: 201 });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get user's profile update history
export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);
    
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const profileUpdates = await prisma.profileUpdate.findMany({
      where: { userId: authUser.userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ profileUpdates });
  } catch (error) {
    console.error("Get profile updates error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
