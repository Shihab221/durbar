import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all published research articles for public display
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const skip = (page - 1) * limit;

    const where: any = { published: true };
    if (category && category !== "all") {
      where.category = category;
    }

    const [articles, total] = await Promise.all([
      prisma.researchArticle.findMany({
        where,
        orderBy: { publishDate: "desc" },
        skip,
        take: limit,
        include: {
          createdBy: {
            select: {
              id: true,
              username: true,
              name: true,
            },
          },
        },
      }),
      prisma.researchArticle.count({ where }),
    ]);

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get research articles error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}