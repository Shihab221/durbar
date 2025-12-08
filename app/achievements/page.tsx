"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Medal,
  Star,
  FileText,
  Download,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    year: "2022",
    title: "Finalist – Anatolian Rover Challenge (ARC) 2022",
    location: "Turkey (Onsite)",
    icon: Trophy,
    highlight: true,
    description:
      "Team Durbar's unprecedented success in ARC 2022 onsite round highlights their determination to excel in the field of Mars Rover development. Competing against teams from around the world, Team Durbar showcased their innovative rover designs and technical prowess, earning a spot among the top finalists. This achievement marks a significant milestone for Bangladesh in international rover competitions.",
  },
  {
    year: "2021",
    title: "9th Place – International Planetary Aerial Systems Challenge (IPAS) 2021",
    location: "Virtual",
    icon: Award,
    description:
      "Secured 9th position globally in the prestigious IPAS challenge, demonstrating our team's expanding capabilities beyond ground rovers into aerial planetary exploration systems.",
  },
  {
    year: "2020",
    title: "10th Place & 1st in Bangladesh – Indian Rover Design Challenge (IRDC) 2020",
    location: "Virtual",
    icon: Medal,
    description:
      "Achieved 10th place overall and proudly became the first team from Bangladesh to participate and excel in IRDC, setting a benchmark for Bangladeshi teams in international rover competitions.",
  },
  {
    year: "2020",
    title: "Best Newcomer Award – KUET Robotics Club",
    location: "KUET",
    icon: Star,
    description:
      "Recognized for exceptional debut performance and rapid advancement in the field of robotics within the university.",
  },
  {
    year: "2021",
    title: "Innovation Award – National Science & Technology Fair",
    location: "Dhaka",
    icon: Award,
    description:
      "Received the Innovation Award for our novel approach to rover suspension design at the national level science fair.",
  },
];

const publications = [
  {
    title:
      "Design and Development of a Mars Rover for Anatolian Rover Challenge 2022",
    authors: "Rahman, M., Akter, F., Hassan, K., et al.",
    journal: "KUET Journal of Engineering",
    year: "2023",
    type: "Journal Paper",
    doi: "10.xxxx/xxxxx",
  },
  {
    title:
      "Autonomous Navigation System for Planetary Rovers Using Computer Vision",
    authors: "Islam, N., Khan, A., Roy, S.",
    journal: "IEEE Conference on Robotics",
    year: "2022",
    type: "Conference Paper",
    doi: "10.xxxx/xxxxx",
  },
  {
    title: "Low-Cost Soil Analysis System for Mars Rover Applications",
    authors: "Das, M., Ahmed, T., Rahman, M.",
    journal: "International Journal of Space Science",
    year: "2022",
    type: "Journal Paper",
    doi: "10.xxxx/xxxxx",
  },
  {
    title:
      "Rocker-Bogie Suspension Optimization for Rough Terrain Navigation",
    authors: "Akter, F., Hassan, K.",
    journal: "Mechanical Engineering Research",
    year: "2021",
    type: "Journal Paper",
    doi: "10.xxxx/xxxxx",
  },
];

export default function AchievementsPage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-space-gunmetal/50 dark:to-space-black">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                Our Journey
              </span>
              <h1 className="section-heading mb-4">
                Achievements & <span className="text-gradient-mars">Publications</span>
              </h1>
              <p className="section-subheading mx-auto">
                Milestones that mark our journey and research that drives
                innovation in planetary exploration.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Achievement Timeline
            </h2>
          </ScrollAnimation>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-zinc-800 -translate-x-1/2" />

            {achievements.map((achievement, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <div
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-4 h-4 rounded-full ${
                        achievement.highlight
                          ? "bg-mars ring-4 ring-mars/20"
                          : "bg-gray-300 dark:bg-zinc-600"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ml-16 md:ml-0 ${
                      index % 2 === 0
                        ? "md:pr-12 md:text-right"
                        : "md:pl-12 md:text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`card p-6 ${
                        achievement.highlight ? "ring-2 ring-mars/30" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 mb-4 ${
                          index % 2 === 0
                            ? "md:justify-end"
                            : "md:justify-start"
                        }`}
                      >
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {achievement.year}
                        </span>
                        {achievement.highlight && (
                          <span className="px-3 py-1 rounded-full bg-mars text-white text-xs font-medium">
                            Top Achievement
                          </span>
                        )}
                      </div>

                      <div
                        className={`flex items-start gap-4 ${
                          index % 2 === 0
                            ? "md:flex-row-reverse"
                            : "md:flex-row"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            achievement.highlight
                              ? "bg-mars text-white"
                              : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          <achievement.icon className="w-6 h-6" />
                        </div>
                        <div className={index % 2 === 0 ? "md:text-right" : ""}>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-mars mb-3">
                            {achievement.location}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section
        id="publications"
        className="py-16 md:py-20 bg-gray-50 dark:bg-space-gunmetal/50"
      >
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                Research
              </span>
              <h2 className="section-heading mb-4">
                Publications
              </h2>
              <p className="section-subheading mx-auto">
                Our research contributions to the field of planetary robotics
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {publications.map((pub, index) => (
              <ScrollAnimation key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card p-6 h-full flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-mars/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-mars" />
                    </div>
                    <div>
                      <span className="px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs">
                        {pub.type}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {pub.year}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex-1">
                    {pub.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {pub.authors}
                  </p>

                  <p className="text-sm text-mars mb-4">{pub.journal}</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      PDF
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      DOI
                    </Button>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

