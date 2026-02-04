"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Check,
  X,
  Clock,
  Shield,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";

interface PendingProfile {
  id: number;
  userId: number;
  name: string | null;
  imageUrl: string | null;
  batch: string | null;
  roll: string | null;
  subTeam: string | null;
  designation: string | null;
  contribution: string | null;
  createdAt: string;
  user: {
    id: number;
    username: string;
    email: string;
    name: string | null;
  };
}

interface PendingBlog {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  createdAt: string;
  author: {
    id: number;
    username: string;
    name: string | null;
  };
}

interface Stats {
  totalUsers: number;
  approvedProfiles: number;
  pendingProfiles: number;
  totalBlogs: number;
  approvedBlogs: number;
  pendingBlogs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingProfiles, setPendingProfiles] = useState<PendingProfile[]>([]);
  const [pendingBlogs, setPendingBlogs] = useState<PendingBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<number | null>(null);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const fetchData = async () => {
    const token = getToken();
    if (!token) {
      setError("Please login as admin to access this page");
      setLoading(false);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, profilesRes, blogsRes] = await Promise.all([
        fetch("/api/admin/stats", { headers }),
        fetch("/api/admin/pending/profiles", { headers }),
        fetch("/api/admin/pending/blogs", { headers }),
      ]);

      if (!statsRes.ok || !profilesRes.ok || !blogsRes.ok) {
        throw new Error("Unauthorized or server error");
      }

      const [statsData, profilesData, blogsData] = await Promise.all([
        statsRes.json(),
        profilesRes.json(),
        blogsRes.json(),
      ]);

      setStats(statsData.stats);
      setPendingProfiles(profilesData.pendingProfiles);
      setPendingBlogs(blogsData.pendingBlogs);
    } catch (err) {
      setError("Failed to load admin data. Make sure you're logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProfileAction = async (id: number, action: "approve" | "reject") => {
    const token = getToken();
    try {
      const res = await fetch(`/api/admin/profile/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        setPendingProfiles((prev) => prev.filter((p) => p.id !== id));
        fetchData();
      }
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  const handleBlogAction = async (id: number, action: "approve" | "reject") => {
    const token = getToken();
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        setPendingBlogs((prev) => prev.filter((b) => b.id !== id));
        fetchData();
      }
    } catch (err) {
      console.error("Action failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-500">{error}</p>
          <a href="/login" className="text-orange-500 hover:underline mt-4 inline-block">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <section className="py-20 md:py-28">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold font-display tracking-wider uppercase mb-4">
                <Shield className="w-4 h-4 inline mr-2" />
                Admin Dashboard
              </span>
              <h1 className="section-heading mb-4">
                Manage <span className="text-gradient-mars">Team Durbar</span>
              </h1>
            </div>
          </ScrollAnimation>

          {/* Stats Grid */}
          {stats && (
            <ScrollAnimation delay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
                {[
                  { label: "Total Users", value: stats.totalUsers, icon: Users },
                  { label: "Approved Profiles", value: stats.approvedProfiles, icon: Check },
                  { label: "Pending Profiles", value: stats.pendingProfiles, icon: Clock },
                  { label: "Total Blogs", value: stats.totalBlogs, icon: FileText },
                  { label: "Approved Blogs", value: stats.approvedBlogs, icon: Check },
                  { label: "Pending Blogs", value: stats.pendingBlogs, icon: Clock },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    className="card p-4 text-center"
                  >
                    <stat.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollAnimation>
          )}

          {/* Pending Profiles */}
          <ScrollAnimation delay={0.2}>
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Pending Profile Updates ({pendingProfiles.length})
              </h2>

              {pendingProfiles.length === 0 ? (
                <div className="card p-8 text-center text-gray-500">
                  No pending profile updates
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingProfiles.map((profile) => (
                    <motion.div
                      key={profile.id}
                      className="card p-4"
                      layout
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          setExpandedProfile(
                            expandedProfile === profile.id ? null : profile.id
                          )
                        }
                      >
                        <div className="flex items-center gap-4">
                          {profile.imageUrl ? (
                            <img
                              src={profile.imageUrl}
                              alt={profile.name || "Profile"}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                              <Users className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {profile.name || profile.user.username}
                            </p>
                            <p className="text-sm text-gray-500">
                              @{profile.user.username} • {profile.user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {expandedProfile === profile.id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {expandedProfile === profile.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700"
                        >
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-gray-500">Batch</p>
                              <p className="font-medium">{profile.batch || "-"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Roll</p>
                              <p className="font-medium">{profile.roll || "-"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Sub Team</p>
                              <p className="font-medium capitalize">{profile.subTeam || "-"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Designation</p>
                              <p className="font-medium">{profile.designation || "-"}</p>
                            </div>
                          </div>
                          {profile.contribution && (
                            <div className="mb-4">
                              <p className="text-xs text-gray-500 mb-1">Contribution</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                {profile.contribution}
                              </p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleProfileAction(profile.id, "approve")}
                              className="gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleProfileAction(profile.id, "reject")}
                              className="gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* Pending Blogs */}
          <ScrollAnimation delay={0.3}>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Pending Blog Posts ({pendingBlogs.length})
              </h2>

              {pendingBlogs.length === 0 ? (
                <div className="card p-8 text-center text-gray-500">
                  No pending blog posts
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingBlogs.map((blog) => (
                    <motion.div
                      key={blog.id}
                      className="card p-4"
                      layout
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          setExpandedBlog(
                            expandedBlog === blog.id ? null : blog.id
                          )
                        }
                      >
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {blog.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            By {blog.author.name || blog.author.username} •{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {expandedBlog === blog.id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </div>

                      {expandedBlog === blog.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-zinc-700"
                        >
                          <div className="prose dark:prose-invert max-w-none mb-4">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {blog.excerpt || blog.content.substring(0, 500)}...
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleBlogAction(blog.id, "approve")}
                              className="gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleBlogAction(blog.id, "reject")}
                              className="gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </PageTransition>
  );
}
