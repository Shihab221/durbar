import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string } }
) {
  try {
    const { hash } = params;

    if (!hash) {
      return NextResponse.json(
        { error: "Validation hash is required" },
        { status: 400 }
      );
    }

    // Find certificate by validation hash
    const certificate = await prisma.certificate.findUnique({
      where: { validationHash: hash },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            batch: true,
            roll: true,
            subTeam: true,
            designation: true,
            contribution: true,
            imageUrl: true,
            isProfileApproved: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { 
          valid: false, 
          error: "Certificate not found. This certificate may be invalid or revoked." 
        },
        { status: 404 }
      );
    }

    // Check if certificate is expired
    const isExpired = certificate.validUntil && new Date() > certificate.validUntil;

    // Check if user profile is still approved
    if (!certificate.user.isProfileApproved) {
      return NextResponse.json({
        valid: false,
        error: "This certificate is no longer valid as the member's profile has been revoked.",
        certificateNumber: certificate.certificateNumber,
      });
    }

    return NextResponse.json({
      valid: !isExpired,
      isExpired,
      certificate: {
        certificateNumber: certificate.certificateNumber,
        issuedAt: certificate.issuedAt,
        validUntil: certificate.validUntil,
      },
      member: {
        name: certificate.user.name,
        batch: certificate.user.batch,
        roll: certificate.user.roll,
        subTeam: certificate.user.subTeam,
        designation: certificate.user.designation,
        contribution: certificate.user.contribution,
        imageUrl: certificate.user.imageUrl,
      },
    });
  } catch (error) {
    console.error("Certificate validation error:", error);
    return NextResponse.json(
      { error: "Failed to validate certificate" },
      { status: 500 }
    );
  }
}
