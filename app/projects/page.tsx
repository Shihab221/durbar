"use client";

import { motion } from "framer-motion";
import { Calendar, Cpu, Cog, Battery, ArrowRight } from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Button } from "@/components/ui/button";

const rovers = [
  {
    name: "Durbar Rover MK-IV",
    year: "2023-2024",
    status: "Current",
    description:
      "Our latest and most advanced Mars rover featuring improved mobility, enhanced science payload, and autonomous navigation capabilities.",
    specs: [
      { label: "Weight", value: "50 kg" },
      { label: "Arm Reach", value: "1.2 m" },
      { label: "Speed", value: "0.5 m/s" },
      { label: "Battery", value: "10 hrs" },
    ],
    features: [
      "6-wheel rocker-bogie suspension",
      "5-DOF robotic arm",
      "HD stereo vision system",
      "Autonomous navigation",
    ],
    image: "/images/rover-mk4.jpg",
    highlight: true,
  },
  {
    name: "Durbar Rover MK-III",
    year: "2022",
    status: "ARC 2022",
    description:
      "The rover that made us finalists at Anatolian Rover Challenge 2022. Featured robust design and reliable performance in challenging terrains.",
    specs: [
      { label: "Weight", value: "48 kg" },
      { label: "Arm Reach", value: "1.0 m" },
      { label: "Speed", value: "0.4 m/s" },
      { label: "Battery", value: "8 hrs" },
    ],
    features: [
      "Custom suspension system",
      "4-DOF robotic arm",
      "GPS navigation",
      "Soil analysis kit",
    ],
    image: "/images/rover-mk3.jpg",
  },
  {
    name: "Durbar Rover MK-II",
    year: "2021",
    status: "IPAS 2021",
    description:
      "Second generation rover with improved scientific instruments and communication systems. Competed in IPAS 2021.",
    specs: [
      { label: "Weight", value: "42 kg" },
      { label: "Arm Reach", value: "0.8 m" },
      { label: "Speed", value: "0.3 m/s" },
      { label: "Battery", value: "6 hrs" },
    ],
    features: [
      "Modular design",
      "Basic robotic arm",
      "Camera system",
      "Radio communication",
    ],
    image: "/images/rover-mk2.jpg",
  },
  {
    name: "Durbar Rover MK-I",
    year: "2020",
    status: "IRDC 2020",
    description:
      "Our first Mars rover that made Bangladesh proud at Indian Rover Design Challenge 2020, securing 1st position among Bangladeshi teams.",
    specs: [
      { label: "Weight", value: "38 kg" },
      { label: "Arm Reach", value: "0.6 m" },
      { label: "Speed", value: "0.2 m/s" },
      { label: "Battery", value: "4 hrs" },
    ],
    features: [
      "4-wheel drive",
      "Simple gripper",
      "Basic sensors",
      "Manual control",
    ],
    image: "/images/rover-mk1.jpg",
  },
];

const ongoingProjects = [
  {
    title: "Autonomous Navigation System",
    description:
      "Developing an AI-powered navigation system for fully autonomous rover operation in unknown terrains.",
    progress: 75,
    icon: Cpu,
  },
  {
    title: "Advanced Robotic Arm",
    description:
      "Designing a 7-DOF robotic arm with precision control for complex manipulation tasks.",
    progress: 60,
    icon: Cog,
  },
  {
    title: "Solar Power System",
    description:
      "Implementing an efficient solar power system for extended mission durations.",
    progress: 85,
    icon: Battery,
  },
];

export default function ProjectsPage() {
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
                <span className="text-mars">Mars Exploration</span>
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

          <div className="space-y-8">
            {rovers.map((rover, index) => (
              <ScrollAnimation key={rover.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`card p-6 md:p-8 ${
                    rover.highlight ? "ring-2 ring-mars/30" : ""
                  }`}
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Image placeholder */}
                    <div className="lg:col-span-1">
                      <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                        <span className="text-6xl">🤖</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                          {rover.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            rover.highlight
                              ? "bg-mars text-white"
                              : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {rover.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500 mb-4">
                        <Calendar className="w-4 h-4" />
                        {rover.year}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {rover.description}
                      </p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {rover.specs.map((spec) => (
                          <div
                            key={spec.label}
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

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {rover.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>
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

          <div className="grid md:grid-cols-3 gap-6">
            {ongoingProjects.map((project, index) => (
              <ScrollAnimation key={project.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card card-hover p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-mars/10 flex items-center justify-center mb-4">
                    <project.icon className="w-6 h-6 text-mars" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-mars font-medium">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-mars rounded-full"
                      />
                    </div>
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

