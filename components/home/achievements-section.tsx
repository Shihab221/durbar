"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";
import { ScrollAnimation } from "@/components/page-transition";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    icon: Trophy,
    title: "Finalist – Anatolian Rover Challenge (ARC) 2022",
    description:
      "Team Durbar's unprecedented success in ARC 2022 onsite round highlights their determination to excel in the field of Mars Rover development. Competing against teams from around the world, Team Durbar showcased their innovative rover designs and technical prowess, earning a spot among the top finalists.",
    year: "2022",
    highlight: true,
  },
  {
    icon: Award,
    title: "9th Place – International Planetary Aerial Systems Challenge (IPAS) 2021",
    description:
      "Secured 9th position globally in the prestigious IPAS challenge, demonstrating our team's capabilities in designing aerial systems for planetary exploration missions.",
    year: "2021",
  },
  {
    icon: Medal,
    title: "10th Place & 1st in Bangladesh – Indian Rover Design Challenge (IRDC) 2020",
    description:
      "Achieved 10th place overall and proudly became the first team from Bangladesh to participate and excel in IRDC, setting a benchmark for Bangladeshi teams in international rover competitions.",
    year: "2020",
  },
];

export function AchievementsSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-space-gunmetal/50">
      <div className="section-container">
        <ScrollAnimation>
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
              Our Achievements
            </span>
            <h2 className="section-heading mb-4">
              Top <span className="text-mars">Achievements</span>
            </h2>
            <p className="section-subheading mx-auto">
              Milestones that mark our journey in space robotics excellence
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <ScrollAnimation key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`card card-hover p-6 md:p-8 h-full flex flex-col ${
                  achievement.highlight
                    ? "ring-2 ring-mars/30 dark:ring-mars/20"
                    : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    achievement.highlight
                      ? "bg-mars text-white"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <achievement.icon className="w-7 h-7" />
                </div>

                {/* Year badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs font-medium mb-4 w-fit">
                  {achievement.year}
                </span>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {achievement.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                  {achievement.description}
                </p>

                {/* Highlight badge */}
                {achievement.highlight && (
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <span className="text-xs font-medium text-mars">
                      ★ Highest Achievement
                    </span>
                  </div>
                )}
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/achievements">
              <Button variant="outline" size="lg">
                View All Achievements
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

