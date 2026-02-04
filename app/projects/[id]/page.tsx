"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  imageUrls: string[];
  createdAt: string;
  approvedAt: string | null;
  author: {
    id: number;
    username: string;
    name: string | null;
    imageUrl: string | null;
  };
}

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${params.id}`);
        if (!res.ok) {
          throw new Error("Blog post not found");
        }
        const data = await res.json();
        setBlog(data.blog);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-gray-500 mb-6">{error || "The requested blog post does not exist."}</p>
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <article className="py-20 md:py-28">
        <div className="section-container">
          <ScrollAnimation>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>

            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white mb-6">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  {blog.author.imageUrl ? (
                    <img
                      src={blog.author.imageUrl}
                      alt={blog.author.name || blog.author.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {blog.author.name || blog.author.username}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(blog.approvedAt || blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{Math.ceil(blog.content.length / 1000)} min read</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {blog.imageUrls && blog.imageUrls.length > 0 && (
              <div className="mb-12 rounded-2xl overflow-hidden">
                <img
                  src={blog.imageUrls[0]}
                  alt={blog.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-display prose-a:text-orange-500">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="whitespace-pre-wrap"
              />
            </div>

            {/* Additional Images */}
            {blog.imageUrls && blog.imageUrls.length > 1 && (
              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {blog.imageUrls.slice(1).map((url, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-xl overflow-hidden"
                  >
                    <img src={url} alt={`Image ${index + 2}`} className="w-full h-auto" />
                  </motion.div>
                ))}
              </div>
            )}
          </ScrollAnimation>
        </div>
      </article>
    </PageTransition>
  );
}
