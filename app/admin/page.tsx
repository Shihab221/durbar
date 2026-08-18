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
  Plus,
  Trash2,
  BookOpen,
  Rocket,
  Pencil,
} from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

interface ResearchArticle {
  id: number;
  title: string;
  abstract: string;
  content: string;
  authors: string;
  journal: string | null;
  doi: string | null;
  publishDate: string | null;
  category: string | null;
  imageUrl: string | null;
  externalLink: string | null;
  published: boolean;
  createdAt: string;
}

interface ResearchArticleForm {
  title: string;
  abstract: string;
  content: string;
  authors: string;
  journal: string;
  doi: string;
  publishDate: string;
  category: string;
  imageUrl: string;
  externalLink: string;
  published: boolean;
}

const EMPTY_FORM: ResearchArticleForm = {
  title: "",
  abstract: "",
  content: "",
  authors: "",
  journal: "",
  doi: "",
  publishDate: "",
  category: "",
  imageUrl: "",
  externalLink: "",
  published: true,
};

interface AdminProject {
  id: number;
  name: string;
  category: string;
  year: string | null;
  status: string | null;
  description: string;
  imageUrl: string | null;
  specs: any;
  features: string[];
  progress: number | null;
  highlight: boolean;
  createdAt: string;
}

interface ProjectForm {
  name: string;
  category: "rover" | "ongoing";
  year: string;
  status: string;
  description: string;
  imageUrl: string;
  weight: string;
  armReach: string;
  speed: string;
  battery: string;
  features: string;
  progress: number;
  highlight: boolean;
}

const EMPTY_PROJECT_FORM: ProjectForm = {
  name: "",
  category: "rover",
  year: "",
  status: "",
  description: "",
  imageUrl: "",
  weight: "",
  armReach: "",
  speed: "",
  battery: "",
  features: "",
  progress: 0,
  highlight: false,
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pendingProfiles, setPendingProfiles] = useState<PendingProfile[]>([]);
  const [pendingBlogs, setPendingBlogs] = useState<PendingBlog[]>([]);
  const [researchArticles, setResearchArticles] = useState<ResearchArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProfile, setExpandedProfile] = useState<number | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ResearchArticleForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Projects state
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState<ProjectForm>(EMPTY_PROJECT_FORM);
  const [projectSubmitting, setProjectSubmitting] = useState(false);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [projectSuccess, setProjectSuccess] = useState<string | null>(null);

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

      const [statsRes, profilesRes, blogsRes, articlesRes, projectsRes] = await Promise.all([
        fetch("/api/admin/stats", { headers }),
        fetch("/api/admin/pending/profiles", { headers }),
        fetch("/api/admin/pending/blogs", { headers }),
        fetch("/api/admin/research-articles", { headers }),
        fetch("/api/admin/projects", { headers }),
      ]);

      // If the user truly isn't authenticated/admin, the stats endpoint will
      // return 401/403 — show the login prompt.
      if (statsRes.status === 401 || statsRes.status === 403) {
        setError("Please login as admin to access this page");
        setLoading(false);
        return;
      }

      // For the other endpoints, tolerate individual failures so a single
      // broken endpoint doesn't block the entire dashboard.
      const safeJson = async (res: Response, fallback: any = null) => {
        if (res.ok) {
          try {
            return await res.json();
          } catch {
            return fallback;
          }
        }
        return fallback;
      };

      const [statsData, profilesData, blogsData, articlesData, projectsData] =
        await Promise.all([
          safeJson(statsRes, { stats: null }),
          safeJson(profilesRes, { pendingProfiles: [] }),
          safeJson(blogsRes, { pendingBlogs: [] }),
          safeJson(articlesRes, { articles: [] }),
          safeJson(projectsRes, { projects: [] }),
        ]);

      // If even stats failed (server error), fall back to a generic message.
      if (!statsData.stats) {
        setError(
          "Failed to load admin stats. Make sure you're logged in as admin."
        );
        setLoading(false);
        return;
      }

      setStats(statsData.stats);
      setPendingProfiles(profilesData.pendingProfiles || []);
      setPendingBlogs(blogsData.pendingBlogs || []);
      setResearchArticles(articlesData.articles || []);
      setProjects(projectsData.projects || []);
    } catch (err) {
      console.error("Admin fetch error:", err);
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

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setSubmitting(true);

    const token = getToken();
    try {
      const res = await fetch("/api/admin/research-articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Failed to create article");
        return;
      }

      setFormSuccess("Research article created successfully!");
      setForm(EMPTY_FORM);
      fetchData();

      setTimeout(() => {
        setDialogOpen(false);
        setFormSuccess(null);
      }, 1500);
    } catch (err) {
      setFormError("Failed to create article. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (!confirm("Are you sure you want to delete this research article?")) {
      return;
    }

    const token = getToken();
    try {
      const res = await fetch(`/api/admin/research-articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setResearchArticles((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // ===== Project handlers =====
  const openProjectDialog = (project: AdminProject | null = null) => {
    if (project) {
      const specs: any[] = Array.isArray(project.specs) ? project.specs : [];
      const findSpec = (label: string) =>
        specs.find((s) => s.label?.toLowerCase() === label.toLowerCase())
          ?.value || "";
      setEditingProjectId(project.id);
      setProjectForm({
        name: project.name,
        category: project.category as "rover" | "ongoing",
        year: project.year || "",
        status: project.status || "",
        description: project.description,
        imageUrl: project.imageUrl || "",
        weight: findSpec("weight"),
        armReach: findSpec("arm reach"),
        speed: findSpec("speed"),
        battery: findSpec("battery"),
        features: (project.features || []).join("\n"),
        progress: project.progress ?? 0,
        highlight: project.highlight,
      });
    } else {
      setEditingProjectId(null);
      setProjectForm(EMPTY_PROJECT_FORM);
    }
    setProjectError(null);
    setProjectSuccess(null);
    setProjectDialogOpen(true);
  };

  const closeProjectDialog = () => {
    setProjectDialogOpen(false);
    setEditingProjectId(null);
    setProjectForm(EMPTY_PROJECT_FORM);
    setProjectError(null);
    setProjectSuccess(null);
  };

  const buildProjectPayload = () => {
    const payload: any = {
      name: projectForm.name,
      category: projectForm.category,
      description: projectForm.description,
      imageUrl: projectForm.imageUrl || undefined,
      year: projectForm.year || undefined,
      status: projectForm.status || undefined,
      highlight: projectForm.highlight,
    };

    if (projectForm.category === "rover") {
      const specs: { label: string; value: string }[] = [];
      if (projectForm.weight)
        specs.push({ label: "Weight", value: projectForm.weight });
      if (projectForm.armReach)
        specs.push({ label: "Arm Reach", value: projectForm.armReach });
      if (projectForm.speed)
        specs.push({ label: "Speed", value: projectForm.speed });
      if (projectForm.battery)
        specs.push({ label: "Battery", value: projectForm.battery });
      payload.specs = specs;
      payload.features = projectForm.features
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);
      payload.progress = undefined;
    } else {
      payload.specs = undefined;
      payload.features = [];
      payload.progress = projectForm.progress;
    }

    return payload;
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjectError(null);
    setProjectSuccess(null);
    setProjectSubmitting(true);

    const token = getToken();
    const payload = buildProjectPayload();
    const isEdit = editingProjectId !== null;
    const url = isEdit
      ? `/api/admin/projects/${editingProjectId}`
      : "/api/admin/projects";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setProjectError(data.error || "Failed to save project");
        return;
      }

      setProjectSuccess(
        isEdit
          ? "Project updated successfully!"
          : "Project created successfully!"
      );
      fetchData();

      setTimeout(() => {
        closeProjectDialog();
      }, 1200);
    } catch (err) {
      setProjectError("Failed to save project. Please try again.");
    } finally {
      setProjectSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      return;
    }

    const token = getToken();
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
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

          {/* Research Articles */}
          <ScrollAnimation delay={0.4}>
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  Research Articles ({researchArticles.length})
                </h2>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      New Article
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create Research Article</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleCreateArticle} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Title *
                        </label>
                        <Input
                          required
                          value={form.title}
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                          placeholder="Article title"
                          maxLength={300}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Authors *
                        </label>
                        <Input
                          required
                          value={form.authors}
                          onChange={(e) =>
                            setForm({ ...form, authors: e.target.value })
                          }
                          placeholder="e.g., John Doe, Jane Smith"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Category
                          </label>
                          <Input
                            value={form.category}
                            onChange={(e) =>
                              setForm({ ...form, category: e.target.value })
                            }
                            placeholder="e.g., Robotics, AI"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Journal
                          </label>
                          <Input
                            value={form.journal}
                            onChange={(e) =>
                              setForm({ ...form, journal: e.target.value })
                            }
                            placeholder="Journal/Conference name"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            DOI
                          </label>
                          <Input
                            value={form.doi}
                            onChange={(e) =>
                              setForm({ ...form, doi: e.target.value })
                            }
                            placeholder="10.1234/example"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Publish Date
                          </label>
                          <Input
                            type="date"
                            value={form.publishDate}
                            onChange={(e) =>
                              setForm({ ...form, publishDate: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Abstract *
                        </label>
                        <Textarea
                          required
                          value={form.abstract}
                          onChange={(e) =>
                            setForm({ ...form, abstract: e.target.value })
                          }
                          placeholder="Brief summary of the research"
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Content *
                        </label>
                        <Textarea
                          required
                          value={form.content}
                          onChange={(e) =>
                            setForm({ ...form, content: e.target.value })
                          }
                          placeholder="Full article content"
                          rows={8}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Image URL
                          </label>
                          <Input
                            value={form.imageUrl}
                            onChange={(e) =>
                              setForm({ ...form, imageUrl: e.target.value })
                            }
                            placeholder="https://..."
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            External Link
                          </label>
                          <Input
                            value={form.externalLink}
                            onChange={(e) =>
                              setForm({ ...form, externalLink: e.target.value })
                            }
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          id="published"
                          type="checkbox"
                          checked={form.published}
                          onChange={(e) =>
                            setForm({ ...form, published: e.target.checked })
                          }
                          className="w-4 h-4 rounded border-gray-300 text-mars focus:ring-mars"
                        />
                        <label
                          htmlFor="published"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Publish immediately (visible to public)
                        </label>
                      </div>

                      {formError && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
                          {formError}
                        </div>
                      )}

                      {formSuccess && (
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm">
                          {formSuccess}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        <Button type="submit" disabled={submitting}>
                          {submitting ? "Creating..." : "Create Article"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setDialogOpen(false);
                            setForm(EMPTY_FORM);
                            setFormError(null);
                            setFormSuccess(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {researchArticles.length === 0 ? (
                <div className="card p-8 text-center text-gray-500">
                  No research articles yet. Click "New Article" to create one.
                </div>
              ) : (
                <div className="space-y-3">
                  {researchArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      layout
                      className="card p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {article.title}
                            </p>
                            {article.published ? (
                              <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                                Published
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs font-medium">
                                Draft
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {article.authors}
                            {article.journal && ` • ${article.journal}`}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                            {article.abstract}
                          </p>
                        </div>

                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* Projects */}
          <ScrollAnimation delay={0.45}>
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-orange-500" />
                  Projects ({projects.length})
                </h2>

                <Dialog
                  open={projectDialogOpen}
                  onOpenChange={(open) => {
                    if (!open) closeProjectDialog();
                    else setProjectDialogOpen(true);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="gap-2"
                      onClick={() => openProjectDialog(null)}
                    >
                      <Plus className="w-4 h-4" />
                      New Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingProjectId
                          ? "Edit Project"
                          : "Create New Project"}
                      </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSaveProject} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Name *
                          </label>
                          <Input
                            required
                            value={projectForm.name}
                            onChange={(e) =>
                              setProjectForm({
                                ...projectForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="Project name"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Category *
                          </label>
                          <select
                            required
                            value={projectForm.category}
                            onChange={(e) =>
                              setProjectForm({
                                ...projectForm,
                                category: e.target.value as
                                  | "rover"
                                  | "ongoing",
                              })
                            }
                            className="flex h-12 w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-space-gunmetal px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-mars"
                          >
                            <option value="rover">Rover</option>
                            <option value="ongoing">Ongoing Project</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Year
                          </label>
                          <Input
                            value={projectForm.year}
                            onChange={(e) =>
                              setProjectForm({
                                ...projectForm,
                                year: e.target.value,
                              })
                            }
                            placeholder="2024"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Status / Tag
                          </label>
                          <Input
                            value={projectForm.status}
                            onChange={(e) =>
                              setProjectForm({
                                ...projectForm,
                                status: e.target.value,
                              })
                            }
                            placeholder="e.g., Current, ARC 2022"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Description *
                        </label>
                        <Textarea
                          required
                          value={projectForm.description}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe the project"
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                          Image URL
                        </label>
                        <Input
                          value={projectForm.imageUrl}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              imageUrl: e.target.value,
                            })
                          }
                          placeholder="/images/project.jpg"
                        />
                      </div>

                      {projectForm.category === "rover" ? (
                        <>
                          <div className="border-t border-gray-100 dark:border-zinc-800 pt-4">
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                              Specifications
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs text-gray-500 mb-1 block">
                                  Weight
                                </label>
                                <Input
                                  value={projectForm.weight}
                                  onChange={(e) =>
                                    setProjectForm({
                                      ...projectForm,
                                      weight: e.target.value,
                                    })
                                  }
                                  placeholder="50 kg"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500 mb-1 block">
                                  Arm Reach
                                </label>
                                <Input
                                  value={projectForm.armReach}
                                  onChange={(e) =>
                                    setProjectForm({
                                      ...projectForm,
                                      armReach: e.target.value,
                                    })
                                  }
                                  placeholder="1.2 m"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500 mb-1 block">
                                  Speed
                                </label>
                                <Input
                                  value={projectForm.speed}
                                  onChange={(e) =>
                                    setProjectForm({
                                      ...projectForm,
                                      speed: e.target.value,
                                    })
                                  }
                                  placeholder="0.5 m/s"
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-500 mb-1 block">
                                  Battery
                                </label>
                                <Input
                                  value={projectForm.battery}
                                  onChange={(e) =>
                                    setProjectForm({
                                      ...projectForm,
                                      battery: e.target.value,
                                    })
                                  }
                                  placeholder="10 hrs"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                              Features (one per line)
                            </label>
                            <Textarea
                              value={projectForm.features}
                              onChange={(e) =>
                                setProjectForm({
                                  ...projectForm,
                                  features: e.target.value,
                                })
                              }
                              placeholder="6-wheel rocker-bogie suspension&#10;5-DOF robotic arm"
                              rows={4}
                            />
                          </div>
                        </>
                      ) : (
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Progress: {projectForm.progress}%
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={projectForm.progress}
                            onChange={(e) =>
                              setProjectForm({
                                ...projectForm,
                                progress: parseInt(e.target.value),
                              })
                            }
                            className="w-full accent-mars"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <input
                          id="project-highlight"
                          type="checkbox"
                          checked={projectForm.highlight}
                          onChange={(e) =>
                            setProjectForm({
                              ...projectForm,
                              highlight: e.target.checked,
                            })
                          }
                          className="w-4 h-4 rounded border-gray-300 text-mars focus:ring-mars"
                        />
                        <label
                          htmlFor="project-highlight"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Highlight as featured project
                        </label>
                      </div>

                      {projectError && (
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
                          {projectError}
                        </div>
                      )}

                      {projectSuccess && (
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm">
                          {projectSuccess}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        <Button type="submit" disabled={projectSubmitting}>
                          {projectSubmitting
                            ? "Saving..."
                            : editingProjectId
                            ? "Update Project"
                            : "Create Project"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={closeProjectDialog}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {projects.length === 0 ? (
                <div className="card p-8 text-center text-gray-500">
                  No projects yet. Click "New Project" to create one.
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      className="card p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {project.name}
                            </p>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                                project.category === "rover"
                                  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              }`}
                            >
                              {project.category === "rover"
                                ? "Rover"
                                : "Ongoing"}
                            </span>
                            {project.highlight && (
                              <span className="inline-block px-2 py-0.5 rounded-full bg-mars/10 text-mars text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {project.year && `${project.year} • `}
                            {project.status && `${project.status} • `}
                            {project.category === "ongoing" &&
                              `Progress: ${project.progress ?? 0}%`}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => openProjectDialog(project)}
                            className="p-2 rounded-lg text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                            title="Edit project"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
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
