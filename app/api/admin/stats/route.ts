import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Get admin dashboard stats
export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);
    
    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const [
      totalUsers,
      approvedProfiles,
      pendingProfiles,
      totalBlogs,
      approvedBlogs,
      pendingBlogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isProfileApproved: true } }),
      prisma.profileUpdate.count({ where: { status: "pending" } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { status: "approved" } }),
      prisma.blog.count({ where: { status: "pending" } }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        approvedProfiles,
        pendingProfiles,
        totalBlogs,
        approvedBlogs,
        pendingBlogs,
      },
    });
  } catch (error) {
    console.error("Get admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
