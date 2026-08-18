"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  Hash,
  FileText,
  Search,
  User,
} from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";

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
  createdBy: {
    id: number;
    username: string;
    name: string | null;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const CATEGORIES = ["all", "Robotics", "AI", "Materials", "Control Systems", "Science"];

export default function ResearchArticlesPage() {
  const [articles, setArticles] = useState<ResearchArticle[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
        category,
      });
      const res = await fetch(`/api/research-articles?${params}`);
      const data = await res.json();
      setArticles(data.articles || []);
      setPagination(data.pagination || null);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, page]);

  const filteredArticles = articles.filter((article) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.abstract.toLowerCase().includes(q) ||
      article.authors.toLowerCase().includes(q) ||
      (article.category?.toLowerCase().includes(q) ?? false)
    );
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Date not specified";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-space-gunmetal/50 dark:to-space-black">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                Research & Innovation
              </span>
              <h1 className="section-heading mb-4">
                Research <span className="text-gradient-mars">Articles</span>
              </h1>
              <p className="section-subheading mx-auto">
                Explore peer-reviewed publications and research papers from Team
                Durbar, advancing the frontiers of Mars rover technology,
                robotics, and space exploration.
              </p>
            </div>
          </ScrollAnimation>

          {/* Search Bar */}
          <ScrollAnimation delay={0.1}>
            <div className="max-w-2xl mx-auto mt-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by title, author, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-space-gunmetal text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-mars focus:ring-offset-2 transition-colors"
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="section-container">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat
                    ? "bg-mars text-white"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="section-container">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-300 dark:text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Try a different search term"
                  : "Check back later for new research publications"}
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <ScrollAnimation key={article.id} delay={index * 0.05}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      className="card p-6 h-full flex flex-col"
                    >
                      {/* Category Badge */}
                      {article.category && (
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 rounded-full bg-mars/10 text-mars text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {article.title}
                      </h3>

                      {/* Authors */}
                      <div className="flex items-start gap-2 mb-3">
                        <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {article.authors}
                        </p>
                      </div>

                      {/* Abstract */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-4 flex-grow">
                        {article.abstract}
                      </p>

                      {/* Meta */}
                      <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
                        {article.publishDate && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(article.publishDate)}</span>
                          </div>
                        )}
                        {article.journal && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span className="line-clamp-1">
                              {article.journal}
                            </span>
                          </div>
                        )}
                        {article.doi && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Hash className="w-3.5 h-3.5" />
                            <span className="line-clamp-1">{article.doi}</span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() =>
                            setExpandedId(
                              expandedId === article.id ? null : article.id
                            )
                          }
                          className="flex-1 px-3 py-2 text-xs font-medium rounded-lg bg-mars/10 text-mars hover:bg-mars/20 transition-colors"
                        >
                          {expandedId === article.id ? "Hide Details" : "Read More"}
                        </button>
                        {article.externalLink && (
                          <a
                            href={article.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      {/* Expanded Content */}
                      {expandedId === article.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800"
                        >
                          <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300">
                            <p className="whitespace-pre-wrap">
                              {article.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </motion.article>
                  </ScrollAnimation>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-zinc-700"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
                    disabled={page === pagination.totalPages}
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-zinc-700"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageTransition>
  );
}