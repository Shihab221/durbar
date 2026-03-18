"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Award, Download, QrCode, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

interface CertificateData {
  id: string;
  certificateNumber: string;
  issuedAt: string;
  validUntil: string | null;
  validationHash: string;
}

interface UserData {
  name: string | null;
  batch: string | null;
  roll: string | null;
  subTeam: string | null;
  designation: string | null;
}

export default function CertificatePage() {
  const router = useRouter();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      // First check if user profile is approved
      const userRes = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      const userData = await userRes.json();
      setIsApproved(userData.user.isProfileApproved);

      if (!userData.user.isProfileApproved) {
        setLoading(false);
        return;
      }

      // Fetch certificate
      const res = await fetch("/api/certificate/generate", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.certificate) {
          setCertificate(data.certificate);
          setUser(data.user || {
            name: userData.user.name,
            batch: userData.user.batch,
            roll: userData.user.roll,
            subTeam: userData.user.subTeam,
            designation: userData.user.designation,
          });
          await generateQRCode(data.certificate.validationHash);
        }
      }
    } catch (err) {
      console.error("Error fetching certificate:", err);
      setError("Failed to fetch certificate data");
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = async (hash: string) => {
    try {
      const validationUrl = `${window.location.origin}/certificate/verify/${hash}`;
      const qrDataUrl = await QRCode.toDataURL(validationUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });
      setQrCodeUrl(qrDataUrl);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
  };

  const handleGenerateCertificate = async () => {
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/certificate/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setCertificate(data.certificate);
      await generateQRCode(data.certificate.validationHash);
      
      // Fetch user data
      const userRes = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        setUser({
          name: userData.user.name,
          batch: userData.user.batch,
          roll: userData.user.roll,
          subTeam: userData.user.subTeam,
          designation: userData.user.designation,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate certificate");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      
      const link = document.createElement("a");
      link.download = `Team_Durbar_Certificate_${certificate?.certificateNumber}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Error downloading certificate:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="py-20 md:py-28">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white mb-4">
                Member Certificate
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Generate and download your official Team Durbar membership certificate with QR code verification.
              </p>
            </div>
          </ScrollAnimation>

          {!isApproved ? (
            <ScrollAnimation>
              <div className="max-w-lg mx-auto">
                <div className="card p-8 text-center">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Profile Not Approved
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your profile needs to be approved by an admin before you can generate a certificate.
                    Please complete your profile and wait for approval.
                  </p>
                  <Button onClick={() => router.push("/profile")}>
                    Go to Profile
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          ) : !certificate ? (
            <ScrollAnimation>
              <div className="max-w-lg mx-auto">
                <div className="card p-8 text-center">
                  <Award className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Generate Your Certificate
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Your profile has been approved! Click below to generate your official membership certificate.
                  </p>
                  {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  <Button onClick={handleGenerateCertificate} disabled={generating} className="gap-2">
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4" />
                        Generate Certificate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation>
              <div className="max-w-4xl mx-auto">
                {/* Certificate Preview */}
                <div
                  ref={certificateRef}
                  className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-4 border-orange-500 relative overflow-hidden"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <img src="/logo.jpg" alt="Team Durbar" className="w-16 h-16 rounded-xl shadow-lg" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">
                        TEAM DURBAR
                      </h2>
                      <p className="text-orange-500 font-medium mt-1">KUET Mars Rover Team</p>
                    </div>

                    {/* Certificate Title */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl md:text-3xl font-serif text-gray-800 border-b-2 border-orange-500 inline-block pb-2">
                        Certificate of Membership
                      </h3>
                    </div>

                    {/* Body */}
                    <div className="text-center mb-8">
                      <p className="text-lg text-gray-600 mb-4">This is to certify that</p>
                      <p className="text-3xl font-bold text-gray-900 mb-4">{user?.name || "Member"}</p>
                      <p className="text-lg text-gray-600 mb-6">
                        is a verified member of Team Durbar, KUET Mars Rover Team
                      </p>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-left">
                        {user?.batch && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Batch</p>
                            <p className="font-semibold text-gray-900">{user.batch}</p>
                          </div>
                        )}
                        {user?.roll && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Roll</p>
                            <p className="font-semibold text-gray-900">{user.roll}</p>
                          </div>
                        )}
                        {user?.subTeam && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Sub Team</p>
                            <p className="font-semibold text-gray-900 capitalize">{user.subTeam}</p>
                          </div>
                        )}
                        {user?.designation && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase">Designation</p>
                            <p className="font-semibold text-gray-900">{user.designation}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer with QR and Certificate Number */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200">
                      <div className="text-center md:text-left">
                        <p className="text-sm text-gray-500">Certificate Number</p>
                        <p className="font-mono font-bold text-gray-900">{certificate.certificateNumber}</p>
                        <p className="text-sm text-gray-500 mt-2">Issued On</p>
                        <p className="font-medium text-gray-900">
                          {new Date(certificate.issuedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {/* QR Code */}
                      <div className="text-center">
                        {qrCodeUrl && (
                          <div className="bg-white p-2 rounded-lg shadow-md inline-block">
                            <img src={qrCodeUrl} alt="Verification QR Code" className="w-32 h-32" />
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">Scan to verify</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/certificate/verify/${certificate.validationHash}`)}
                    className="gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Preview Verification Page
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Share this certificate or let anyone scan the QR code to verify your membership.
                </p>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
