"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, User, Calendar, Award, Users } from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CertificateInfo {
  certificateNumber: string;
  issuedAt: string;
  validUntil: string | null;
}

interface MemberInfo {
  name: string | null;
  batch: string | null;
  roll: string | null;
  subTeam: string | null;
  designation: string | null;
  contribution: string | null;
  imageUrl: string | null;
}

interface ValidationResult {
  valid: boolean;
  isExpired?: boolean;
  error?: string;
  certificate?: CertificateInfo;
  member?: MemberInfo;
}

export default function VerifyCertificatePage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = use(params);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    if (hash) {
      validateCertificate();
    }
  }, [hash]);

  const validateCertificate = async () => {
    try {
      const res = await fetch(`/api/certificate/validate/${hash}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        valid: false,
        error: "Failed to validate certificate. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Validating certificate...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="py-20 md:py-28">
        <div className="section-container">
          <ScrollAnimation>
            <div className="max-w-2xl mx-auto">
              {result?.valid ? (
                // Valid Certificate
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="card p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  </motion.div>

                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Certificate Verified
                  </h1>
                  <p className="text-green-600 font-medium mb-8">
                    This is a valid Team Durbar membership certificate
                  </p>

                  {/* Member Info */}
                  <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl p-6 mb-6">
                    <div className="flex flex-col items-center mb-6">
                      {result.member?.imageUrl ? (
                        <img
                          src={result.member.imageUrl}
                          alt={result.member.name || "Member"}
                          className="w-24 h-24 rounded-full object-cover border-4 border-orange-500 mb-4"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center mb-4">
                          <User className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {result.member?.name || "Team Member"}
                      </h2>
                      {result.member?.designation && (
                        <p className="text-orange-500 font-medium">{result.member.designation}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left">
                      {result.member?.batch && (
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Batch</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{result.member.batch}</p>
                          </div>
                        </div>
                      )}
                      {result.member?.roll && (
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Roll</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{result.member.roll}</p>
                          </div>
                        </div>
                      )}
                      {result.member?.subTeam && (
                        <div className="flex items-center gap-3 col-span-2">
                          <Users className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Sub Team</p>
                            <p className="font-semibold text-gray-900 dark:text-white capitalize">{result.member.subTeam}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {result.member?.contribution && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700">
                        <p className="text-xs text-gray-500 uppercase mb-2">Contribution</p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{result.member.contribution}</p>
                      </div>
                    )}
                  </div>

                  {/* Certificate Details */}
                  <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <span className="font-medium">Certificate:</span>{" "}
                      <span className="font-mono">{result.certificate?.certificateNumber}</span>
                    </div>
                    <div>
                      <span className="font-medium">Issued:</span>{" "}
                      {result.certificate?.issuedAt &&
                        new Date(result.certificate.issuedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                    </div>
                  </div>
                </motion.div>
              ) : result?.isExpired ? (
                // Expired Certificate
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="card p-8 text-center"
                >
                  <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Certificate Expired
                  </h1>
                  <p className="text-yellow-600 mb-6">
                    This certificate has expired and is no longer valid.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Certificate Number: <span className="font-mono">{result.certificate?.certificateNumber}</span>
                  </p>
                  <Link href="/">
                    <Button variant="outline">Return to Home</Button>
                  </Link>
                </motion.div>
              ) : (
                // Invalid Certificate
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="card p-8 text-center"
                >
                  <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Invalid Certificate
                  </h1>
                  <p className="text-red-500 mb-6">
                    {result?.error || "This certificate could not be verified."}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    The certificate may be fake, revoked, or the link is incorrect.
                  </p>
                  <Link href="/">
                    <Button variant="outline">Return to Home</Button>
                  </Link>
                </motion.div>
              )}

              {/* Team Durbar Footer */}
              <div className="text-center mt-8">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
                  <img src="/logo.jpg" alt="Team Durbar" className="w-8 h-8 rounded-lg" />
                  <span className="font-medium">Team Durbar</span>
                </Link>
                <p className="text-sm text-gray-400 mt-2">KUET Mars Rover Team</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </PageTransition>
  );
}
