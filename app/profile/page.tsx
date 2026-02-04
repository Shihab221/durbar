"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Camera,
  Save,
  FileText,
  PlusCircle,
  Clock,
  Check,
  X,
  LogOut,
} from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
  name: string | null;
  imageUrl: string | null;
  batch: string | null;
  roll: string | null;
  subTeam: string | null;
  designation: string | null;
  contribution: string | null;
  isProfileApproved: boolean;
}

interface ProfileUpdate {
  id: number;
  status: string;
  createdAt: string;
  name: string | null;
}

interface Blog {
  id: number;
  title: string;
  status: string;
  createdAt: string;
}

const SUB_TEAMS = ["mechanical", "control", "autonomous", "science", "management"];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "blog">("profile");
  
  // Profile form state
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [batch, setBatch] = useState("");
  const [roll, setRoll] = useState("");
  const [subTeam, setSubTeam] = useState("");
  const [designation, setDesignation] = useState("");
  const [contribution, setContribution] = useState("");
  const [profileUpdates, setProfileUpdates] = useState<ProfileUpdate[]>([]);
  const [submittingProfile, setSubmittingProfile] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Blog form state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [submittingBlog, setSubmittingBlog] = useState(false);
  
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = getToken();
    try {
      const [userRes, updatesRes, blogsRes] = await Promise.all([
        fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/profile/update", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/blogs", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (!userRes.ok) {
        router.push("/login");
        return;
      }

      const userData = await userRes.json();
      setUser(userData.user);
      
      // Pre-fill form with existing data
      if (userData.user) {
        setName(userData.user.name || "");
        setImageUrl(userData.user.imageUrl || "");
        setBatch(userData.user.batch || "");
        setRoll(userData.user.roll || "");
        setSubTeam(userData.user.subTeam || "");
        setDesignation(userData.user.designation || "");
        setContribution(userData.user.contribution || "");
      }

      if (updatesRes.ok) {
        const updatesData = await updatesRes.json();
        setProfileUpdates(updatesData.profileUpdates);
      }

      if (blogsRes.ok) {
        const blogsData = await blogsRes.json();
        setBlogs(blogsData.blogs);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/profile/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.url);
        setMessage({ type: "success", text: "Image uploaded successfully" });
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to upload image" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingProfile(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          name,
          imageUrl,
          batch,
          roll,
          subTeam,
          designation,
          contribution,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Profile update submitted for approval!" });
        fetchUserData();
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to submit" });
    } finally {
      setSubmittingProfile(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingBlog(true);
    setMessage(null);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title: blogTitle,
          content: blogContent,
          excerpt: blogExcerpt,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "Blog post submitted for approval!" });
        setBlogTitle("");
        setBlogContent("");
        setBlogExcerpt("");
        fetchUserData();
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to submit" });
    } finally {
      setSubmittingBlog(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">
                  My Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome back, <span className="text-orange-500">{user?.username}</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                {(user?.role === "admin" || user?.role === "superadmin") && (
                  <Button variant="outline" onClick={() => router.push("/admin")}>
                    Admin Dashboard
                  </Button>
                )}
                <Button variant="secondary" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </ScrollAnimation>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-500/10 border border-green-500/20 text-green-600"
                  : "bg-red-500/10 border border-red-500/20 text-red-500"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-zinc-700">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === "profile"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === "blog"
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Write Blog
            </button>
          </div>

          {activeTab === "profile" ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Profile Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleProfileSubmit} className="card p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Update Profile
                  </h2>

                  {/* Image Upload */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                          <User className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
                        <Camera className="w-4 h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Profile Photo</p>
                      <p className="text-sm text-gray-500">JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Batch
                      </label>
                      <Input
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        placeholder="e.g., 2020"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Roll
                      </label>
                      <Input
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                        placeholder="e.g., 1803001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sub Team
                      </label>
                      <select
                        value={subTeam}
                        onChange={(e) => setSubTeam(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Select sub team</option>
                        {SUB_TEAMS.map((team) => (
                          <option key={team} value={team}>
                            {team.charAt(0).toUpperCase() + team.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Designation
                      </label>
                      <Input
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g., Team Lead, Software Engineer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contribution
                    </label>
                    <Textarea
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                      placeholder="Describe your contributions to the team (max 1000 characters)"
                      rows={4}
                      maxLength={1000}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {contribution.length}/1000 characters
                    </p>
                  </div>

                  <Button type="submit" disabled={submittingProfile} className="gap-2">
                    {submittingProfile ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Submit for Approval
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-500">
                    * Your profile update will be reviewed by an admin before being visible on the About page.
                  </p>
                </form>
              </div>

              {/* Update History */}
              <div>
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Update History
                  </h2>
                  {profileUpdates.length === 0 ? (
                    <p className="text-gray-500 text-sm">No updates yet</p>
                  ) : (
                    <div className="space-y-3">
                      {profileUpdates.slice(0, 5).map((update) => (
                        <div
                          key={update.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-zinc-800"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {update.name || "Profile Update"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(update.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              update.status === "approved"
                                ? "bg-green-100 text-green-600"
                                : update.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {update.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleBlogSubmit} className="card p-6 space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Write a Blog Post
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <Input
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="Enter blog title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt
                    </label>
                    <Textarea
                      value={blogExcerpt}
                      onChange={(e) => setBlogExcerpt(e.target.value)}
                      placeholder="Brief summary (optional, max 500 chars)"
                      rows={2}
                      maxLength={500}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content *
                    </label>
                    <Textarea
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Write your blog content here... (Markdown supported)"
                      rows={12}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={submittingBlog} className="gap-2">
                    {submittingBlog ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="w-4 h-4" />
                        Submit Blog Post
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-gray-500">
                    * Your blog post will be reviewed by an admin before being published.
                  </p>
                </form>
              </div>

              {/* Blog History */}
              <div>
                <div className="card p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Your Posts
                  </h2>
                  {blogs.length === 0 ? (
                    <p className="text-gray-500 text-sm">No blog posts yet</p>
                  ) : (
                    <div className="space-y-3">
                      {blogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="p-3 rounded-lg bg-gray-50 dark:bg-zinc-800"
                        >
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {blog.title}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-500">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                blog.status === "approved"
                                  ? "bg-green-100 text-green-600"
                                  : blog.status === "rejected"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-yellow-100 text-yellow-600"
                              }`}
                            >
                              {blog.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
