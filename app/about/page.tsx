"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Users,
  Cpu,
  Wrench,
  Radio,
  FlaskConical,
  Rocket,
  Linkedin,
  Mail,
  Gamepad2,
} from "lucide-react";
import { PageTransition, ScrollAnimation } from "@/components/page-transition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const departments = [
  {
    id: "mechanical",
    name: "Mechanical",
    icon: Wrench,
    description:
      "Responsible for rover chassis, suspension, wheels, and all mechanical systems. Designs robust structures that can withstand Martian terrain.",
    members: 12,
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Cpu,
    description:
      "Designs and implements power systems, motor controllers, sensor integration, and all electronic circuits for the rover.",
    members: 10,
  },
  {
    id: "software",
    name: "Software",
    icon: Radio,
    description:
      "Develops navigation algorithms, control systems, computer vision, and communication protocols for autonomous operation.",
    members: 8,
  },
  {
    id: "science",
    name: "Science",
    icon: FlaskConical,
    description:
      "Focuses on scientific instruments, soil analysis systems, and life detection equipment for Martian exploration.",
    members: 6,
  },
  {
    id: "control",
    name: "Control",
    icon: Gamepad2,
    description:
      "Handles rover operation, telemetry monitoring, and real-time mission control. Ensures seamless communication between ground station and rover systems.",
    members: 8,
  },
];

const teamMembers = [
  {
    name: "Md. Rahman",
    role: "Team Lead",
    department: "Management",
    image: "/images/member-1.jpg",
  },
  {
    name: "Fatima Akter",
    role: "Mechanical Head",
    department: "Mechanical",
    image: "/images/member-2.jpg",
  },
  {
    name: "Karim Hassan",
    role: "Electronics Head",
    department: "Electronics",
    image: "/images/member-3.jpg",
  },
  {
    name: "Nadia Islam",
    role: "Software Head",
    department: "Software",
    image: "/images/member-4.jpg",
  },
  {
    name: "Arif Khan",
    role: "Science Head",
    department: "Science",
    image: "/images/member-5.jpg",
  },
  {
    name: "Suma Roy",
    role: "Operations Lead",
    department: "Management",
    image: "/images/member-6.jpg",
  },
  {
    name: "Tanvir Ahmed",
    role: "Design Engineer",
    department: "Mechanical",
    image: "/images/member-7.jpg",
  },
  {
    name: "Mita Das",
    role: "PCB Designer",
    department: "Electronics",
    image: "/images/member-8.jpg",
  },
];

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

      {/* Departments */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-space-gunmetal/50">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                Our Structure
              </span>
              <h2 className="section-heading mb-4">
                Departments
              </h2>
              <p className="section-subheading mx-auto">
                Five specialized teams working together to build world-class rovers
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1}>
            <Tabs defaultValue="mechanical" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full max-w-3xl mx-auto mb-8">
                {departments.map((dept) => (
                  <TabsTrigger key={dept.id} value={dept.id} className="gap-2">
                    <dept.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{dept.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {departments.map((dept) => (
                <TabsContent key={dept.id} value={dept.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-8 text-center max-w-2xl mx-auto"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-mars/10 flex items-center justify-center mx-auto mb-6">
                      <dept.icon className="w-8 h-8 text-mars" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {dept.name} Department
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {dept.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{dept.members} Members</span>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </ScrollAnimation>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-mars/10 text-mars text-sm font-medium mb-4">
                Our Team
              </span>
              <h2 className="section-heading mb-4">
                Meet the <span className="text-gradient-mars">Leaders</span>
              </h2>
              <p className="section-subheading mx-auto">
                The talented individuals driving Team Durbar forward
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <ScrollAnimation key={member.name} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card p-4 text-center"
                >
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {member.name}
                  </h3>
                  <p className="text-mars text-xs mb-1">{member.role}</p>
                  <p className="text-gray-500 text-xs">{member.department}</p>
                  {/* Social links */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500 hover:text-mars transition-colors"
                    >
                      <Linkedin className="w-3 h-3" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-gray-500 hover:text-mars transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                    </motion.a>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
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

