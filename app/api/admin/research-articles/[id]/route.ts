import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest, isAdmin } from "@/lib/auth";

// Update a research article
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
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const article = await prisma.researchArticle.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.abstract !== undefined && { abstract: body.abstract }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.authors !== undefined && { authors: body.authors.trim() }),
        ...(body.journal !== undefined && { journal: body.journal }),
        ...(body.doi !== undefined && { doi: body.doi }),
        ...(body.publishDate !== undefined && {
          publishDate: body.publishDate ? new Date(body.publishDate) : null,
        }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.externalLink !== undefined && {
          externalLink: body.externalLink,
        }),
        ...(body.published !== undefined && { published: body.published }),
      },
    });

    return NextResponse.json({
      message: "Research article updated successfully",
      article,
    });
  } catch (error) {
    console.error("Update research article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a research article
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
        { error: "Invalid article ID" },
        { status: 400 }
      );
    }

    await prisma.researchArticle.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Research article deleted successfully",
    });
  } catch (error) {
    console.error("Delete research article error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}