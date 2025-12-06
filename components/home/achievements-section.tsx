"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, Calendar } from "lucide-react";
import { ScrollAnimation } from "@/components/page-transition";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    icon: Trophy,
    title: "Finalist – Anatolian Rover Challenge (ARC) 2022",
    location: "Turkey (Onsite)",
    description:
      "Team Durbar's unprecedented success in ARC 2022 onsite round highlights their determination to excel in the field of Mars Rover development. Competing against teams from around the world, Team Durbar showcased their innovative rover designs and technical prowess.",
    year: "2022",
    highlight: true,
  },
  {
    icon: Award,
    title: "9th Place – IPAS 2021",
    location: "Virtual",
    description:
      "Secured 9th position globally in the prestigious International Planetary Aerial Systems challenge, demonstrating our team's capabilities in aerial planetary exploration.",
    year: "2021",
    highlight: false,
  },
  {
    icon: Medal,
    title: "10th Place & 1st in Bangladesh – IRDC 2020",
    location: "Virtual",
    description:
      "Achieved 10th place overall and proudly became the first team from Bangladesh to participate and excel in the Indian Rover Design Challenge.",
    year: "2020",
    highlight: false,
  },
];

export function AchievementsSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-space-gunmetal/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      <div className="section-container relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium font-display tracking-wider uppercase mb-4">
              Our Achievements
            </span>
            <h2 className="section-heading mb-4">
              Top <span className="text-gradient-mars">Achievements</span>
            </h2>
            <p className="section-subheading mx-auto">
              Milestones that mark our journey in space robotics excellence
            </p>
          </div>
        </ScrollAnimation>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline vertical line with gradient */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full w-full bg-gradient-to-b from-orange-500/50 via-red-500 to-orange-500/50" />
          </div>

          {achievements.map((achievement, index) => (
            <ScrollAnimation key={index} delay={index * 0.15}>
              <div
                className={`relative flex items-start gap-6 md:gap-8 mb-8 md:mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                      achievement.highlight
                        ? "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 ring-4 ring-orange-500/30 shadow-lg shadow-orange-500/50"
                        : "bg-gradient-to-br from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700"
                    }`}
                  >
                    {achievement.highlight && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-orange-500"
                      />
                    )}
                  </motion.div>
                </div>

                {/* Content Card */}
                <div
                  className={`flex-1 ml-16 md:ml-0 ${
                    index % 2 === 0
                      ? "md:pr-12 lg:pr-16"
                      : "md:pl-12 lg:pl-16"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`card p-5 md:p-6 backdrop-blur-sm ${
                      achievement.highlight
                        ? "ring-2 ring-orange-500/40 shadow-lg shadow-orange-500/10 border-glow"
                        : "hover:ring-1 hover:ring-orange-500/20"
                    }`}
                  >
                    {/* Header badges */}
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-4 ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-gray-700 dark:text-gray-300 text-xs font-semibold font-display tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {achievement.year}
                      </span>
                      {achievement.highlight && (
                        <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white text-xs font-semibold font-display tracking-wider shadow-md shadow-orange-500/30">
                          ★ TOP ACHIEVEMENT
                        </span>
                      )}
                    </div>

                    {/* Main content */}
                    <div
                      className={`flex items-start gap-4 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          achievement.highlight
                            ? "bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white shadow-lg shadow-orange-500/40"
                            : "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-700 dark:to-zinc-800 text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        <achievement.icon className="w-6 h-6 md:w-7 md:h-7" />
                      </div>

                      {/* Text content */}
                      <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        <h3 className="text-base md:text-lg font-bold font-display tracking-wide text-gray-900 dark:text-white mb-1.5 uppercase">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-mars font-semibold mb-2">
                          📍 {achievement.location}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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

        <ScrollAnimation delay={0.4}>
          <div className="text-center mt-12 md:mt-16">
            <Link href="/achievements">
              <Button variant="glow" size="lg" className="gap-2">
                View Full Timeline
                <span className="text-lg">→</span>
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

