"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Cpu, Cog, Battery, FileText } from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";

interface Spec {
  label: string;
  value: string;
}

interface Project {
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

const ONGOING_ICONS = [Cpu, Cog, Battery];

export default function ProjectsPage() {
  const [rovers, setRovers] = useState<Project[]>([]);
  const [ongoing, setOngoing] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        const all: Project[] = data.projects || [];
        setRovers(all.filter((p) => p.category === "rover"));
        setOngoing(all.filter((p) => p.category === "ongoing"));
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-space-gunmetal/50 dark:to-space-black">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                Our Projects
              </span>
              <h1 className="section-heading mb-4">
                Building the Future of{" "}
                <span className="text-gradient-mars">Mars Exploration</span>
              </h1>
              <p className="section-subheading mx-auto">
                From our first rover to cutting-edge prototypes, explore the
                evolution of Team Durbar&apos;s engineering excellence.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Rovers Section */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Our Rovers
            </h2>
          </ScrollAnimation>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full" />
            </div>
          ) : rovers.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">
              No rovers added yet.
            </div>
          ) : (
            <div className="space-y-8">
              {rovers.map((rover, index) => {
                const specs: Spec[] = Array.isArray(rover.specs)
                  ? rover.specs
                  : [];
                return (
                  <ScrollAnimation key={rover.id} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`card p-6 md:p-8 ${
                        rover.highlight ? "ring-2 ring-mars/30" : ""
                      }`}
                    >
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Image placeholder */}
                        <div className="lg:col-span-1">
                          {rover.imageUrl ? (
                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 dark:bg-zinc-800">
                              <img
                                src={rover.imageUrl}
                                alt={rover.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                              <span className="text-6xl">🤖</span>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="lg:col-span-2">
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                              {rover.name}
                            </h3>
                            {rover.status && (
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  rover.highlight
                                    ? "bg-mars text-white"
                                    : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                                }`}
                              >
                                {rover.status}
                              </span>
                            )}
                          </div>

                          {rover.year && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-4">
                              <Calendar className="w-4 h-4" />
                              {rover.year}
                            </div>
                          )}

                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {rover.description}
                          </p>

                          {/* Specs */}
                          {specs.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                              {specs.map((spec, i) => (
                                <div
                                  key={`${spec.label}-${i}`}
                                  className="bg-gray-50 dark:bg-zinc-800/50 rounded-lg p-3"
                                >
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                                    {spec.label}
                                  </p>
                                  <p className="font-semibold text-gray-900 dark:text-white">
                                    {spec.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Features */}
                          {rover.features.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {rover.features.map((feature, i) => (
                                <span
                                  key={`${feature}-${i}`}
                                  className="px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </ScrollAnimation>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-space-gunmetal/50">
        <div className="section-container">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Ongoing Projects
            </h2>
          </ScrollAnimation>

          {ongoing.length === 0 ? (
            <div className="card p-8 text-center text-gray-500">
              No ongoing projects added yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {ongoing.map((project, index) => {
                const Icon = ONGOING_ICONS[index % ONGOING_ICONS.length];
                const progress = project.progress ?? 0;
                return (
                  <ScrollAnimation
                    key={project.id}
                    delay={index * 0.1}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="card card-hover p-6"
                    >
                      <div className="w-12 h-12 rounded-xl bg-mars/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-mars" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {project.description}
                      </p>
                      {/* Progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-mars font-medium">
                            {progress}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="h-full bg-mars rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </ScrollAnimation>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}