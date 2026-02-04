import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { sanitizeString } from "@/lib/validation";

// Create a new blog post
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
    const { title, content, excerpt, imageUrls } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Validate title length
    if (title.length > 200) {
      return NextResponse.json(
        { error: "Title must be less than 200 characters" },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.length > 50000) {
      return NextResponse.json(
        { error: "Content is too long" },
        { status: 400 }
      );
    }

    // Create blog post
    const blog = await prisma.blog.create({
      data: {
        title: sanitizeString(title),
        content: content, // Allow HTML/markdown
        excerpt: excerpt ? sanitizeString(excerpt).substring(0, 500) : sanitizeString(content).substring(0, 200),
        imageUrls: imageUrls || [],
        authorId: authUser.userId,
        status: "pending",
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Blog post submitted for approval",
      blog,
    }, { status: 201 });
  } catch (error) {
    console.error("Create blog error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get user's own blog posts
export async function GET(request: NextRequest) {
  try {
    const authUser = getUserFromRequest(request);
    
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const blogs = await prisma.blog.findMany({
      where: { authorId: authUser.userId },
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Get user blogs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
