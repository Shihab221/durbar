import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user with profile data
    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      include: { certificate: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if profile is approved
    if (!user.isProfileApproved) {
      return NextResponse.json(
        { error: "Your profile must be approved before generating a certificate" },
        { status: 403 }
      );
    }

    // Check if certificate already exists
    if (user.certificate) {
      return NextResponse.json({
        message: "Certificate already exists",
        certificate: {
          id: user.certificate.id,
          certificateNumber: user.certificate.certificateNumber,
          issuedAt: user.certificate.issuedAt,
          validationHash: user.certificate.validationHash,
        },
      });
    }

    // Generate certificate number: TD-YEAR-USERID
    const year = new Date().getFullYear();
    const certificateNumber = `TD-${year}-${String(user.id).padStart(4, "0")}`;

    // Generate validation hash
    const validationData = `${user.id}-${user.email}-${certificateNumber}-${Date.now()}`;
    const validationHash = crypto
      .createHash("sha256")
      .update(validationData)
      .digest("hex")
      .substring(0, 16);

    // Create certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId: user.id,
        certificateNumber,
        validationHash,
        validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Valid for 1 year
      },
    });

    return NextResponse.json({
      message: "Certificate generated successfully",
      certificate: {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        issuedAt: certificate.issuedAt,
        validationHash: certificate.validationHash,
      },
    });
  } catch (error) {
    console.error("Certificate generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.userId },
      include: { certificate: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.certificate) {
      return NextResponse.json({ certificate: null });
    }

    return NextResponse.json({
      certificate: {
        id: user.certificate.id,
        certificateNumber: user.certificate.certificateNumber,
        issuedAt: user.certificate.issuedAt,
        validUntil: user.certificate.validUntil,
        validationHash: user.certificate.validationHash,
      },
      user: {
        name: user.name,
        batch: user.batch,
        roll: user.roll,
        subTeam: user.subTeam,
        designation: user.designation,
      },
    });
  } catch (error) {
    console.error("Certificate fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
      { status: 500 }
    );
  }
}
