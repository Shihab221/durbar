"use client";

import { motion } from "framer-motion";
import { Target, Eye, Rocket } from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";

const stats = [
  { value: "40+", label: "Team Members" },
  { value: "5", label: "Departments" },
  { value: "5+", label: "Years Active" },
  { value: "10+", label: "Competitions" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-space-gunmetal/50 dark:to-space-black">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                About Us
              </span>
              <h1 className="section-heading mb-4">
                Meet <span className="text-gradient-mars">Team Durbar</span>
              </h1>
              <p className="section-subheading mx-auto">
                A passionate group of engineers and scientists from KUET,
                dedicated to advancing Mars exploration technology from
                Bangladesh.
              </p>
            </div>
          </ScrollAnimation>

          {/* Stats */}
          <ScrollAnimation delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-mars mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollAnimation>
              <motion.div
                whileHover={{ y: -4 }}
                className="card p-8 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-mars/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-mars" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To design, build, and operate advanced Mars rover systems that
                  push the boundaries of space exploration technology. We aim to
                  represent Bangladesh on the global stage of planetary robotics
                  while inspiring the next generation of engineers and
                  scientists.
                </p>
              </motion.div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card p-8 h-full"
              >
                <div className="w-14 h-14 rounded-xl bg-mars/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-mars" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To become a leading force in planetary exploration research
                  and development in South Asia. We envision a future where
                  Bangladeshi innovation contributes meaningfully to humanity&apos;s
                  quest to explore and understand Mars and beyond.
                </p>
              </motion.div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-space-gunmetal/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-mars flex items-center justify-center mx-auto mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Story
                </h2>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.1}>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
                <p className="text-lg leading-relaxed mb-4">
                  Team Durbar was founded in 2019 by a group of passionate
                  engineering students at Khulna University of Engineering &
                  Technology (KUET) with a shared dream: to put Bangladesh on
                  the map of international space robotics competitions.
                </p>
                <p className="leading-relaxed mb-4">
                  Starting with limited resources but unlimited enthusiasm, we
                  built our first rover in a small workshop using whatever
                  materials we could find. That determination paid off when we
                  secured 1st place among Bangladeshi teams at IRDC 2020.
                </p>
                <p className="leading-relaxed">
                  Today, we are a 40+ member team spanning four departments,
                  equipped with advanced tools and backed by industry sponsors.
                  Our journey to ARC 2022 finals proved that Bangladeshi
                  innovation can compete at the highest levels of planetary
                  robotics.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}