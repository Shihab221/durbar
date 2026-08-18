import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Get all research articles (admin) - including unpublished
export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);

    if (!authUser || !isAdmin(authUser)) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const articles = await prisma.researchArticle.findMany({
      orderBy: { createdAt: "desc" },
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

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Get research articles error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new research article (admin only)
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
      abstract,
      content,
      authors,
      journal,
      doi,
      publishDate,
      category,
      imageUrl,
      externalLink,
      published,
    } = body;

    // Validate required fields
    if (!title || !abstract || !content || !authors) {
      return NextResponse.json(
        { error: "Title, abstract, content, and authors are required" },
        { status: 400 }
      );
    }

    if (title.length > 300) {
      return NextResponse.json(
        { error: "Title must be less than 300 characters" },
        { status: 400 }
      );
    }

    const article = await prisma.researchArticle.create({
      data: {
        title: title.trim(),
        abstract,
        content,
        authors: authors.trim(),
        journal: journal || null,
        doi: doi || null,
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        category: category || null,
        imageUrl: imageUrl || null,
        externalLink: externalLink || null,
        published: published ?? true,
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
        message: "Research article created successfully",
        article,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create research article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}