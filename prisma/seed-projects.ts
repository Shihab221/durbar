import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DUMMY_ROVERS = [
  {
    name: "Durbar Rover MK-IV",
    year: "2023-2024",
    status: "Current",
    category: "rover",
    description:
      "Our latest and most advanced Mars rover featuring improved mobility, enhanced science payload, and autonomous navigation capabilities.",
    imageUrl: "/images/rover-mk4.jpg",
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
    highlight: true,
  },
  {
    name: "Durbar Rover MK-III",
    year: "2022",
    status: "ARC 2022",
    category: "rover",
    description:
      "The rover that made us finalists at Anatolian Rover Challenge 2022. Featured robust design and reliable performance in challenging terrains.",
    imageUrl: "/images/rover-mk3.jpg",
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
    highlight: false,
  },
  {
    name: "Durbar Rover MK-II",
    year: "2021",
    status: "IPAS 2021",
    category: "rover",
    description:
      "Second generation rover with improved scientific instruments and communication systems. Competed in IPAS 2021.",
    imageUrl: "/images/rover-mk2.jpg",
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
    highlight: false,
  },
  {
    name: "Durbar Rover MK-I",
    year: "2020",
    status: "IRDC 2020",
    category: "rover",
    description:
      "Our first Mars rover that made Bangladesh proud at Indian Rover Design Challenge 2020, securing 1st position among Bangladeshi teams.",
    imageUrl: "/images/rover-mk1.jpg",
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
    highlight: false,
  },
];

const DUMMY_ONGOING = [
  {
    name: "Autonomous Navigation System",
    category: "ongoing",
    description:
      "Developing an AI-powered navigation system for fully autonomous rover operation in unknown terrains.",
    progress: 75,
    highlight: false,
  },
  {
    name: "Advanced Robotic Arm",
    category: "ongoing",
    description:
      "Designing a 7-DOF robotic arm with precision control for complex manipulation tasks.",
    progress: 60,
    highlight: false,
  },
  {
    name: "Solar Power System",
    category: "ongoing",
    description:
      "Implementing an efficient solar power system for extended mission durations.",
    progress: 85,
    highlight: false,
  },
];

async function main() {
  console.log("🌱 Seeding projects...");

  // Ensure an admin user exists to satisfy createdById
  const admin = await prisma.user.findFirst({
    where: { role: "superadmin" },
  });

  if (!admin) {
    console.error(
      "❌ No admin user found. Run the main seed first: npm run db:seed"
    );
    process.exit(1);
  }

  // Seed rovers
  for (const rover of DUMMY_ROVERS) {
    const existing = await prisma.project.findFirst({
      where: { name: rover.name, category: "rover" },
    });
    if (existing) {
      console.log(`⏭️  Skipping (exists): ${rover.name}`);
      continue;
    }
    await prisma.project.create({
      data: {
        ...rover,
        specs: rover.specs,
        createdById: admin.id,
      },
    });
    console.log(`✅ Seeded rover: ${rover.name}`);
  }

  // Seed ongoing projects
  for (const ongoing of DUMMY_ONGOING) {
    const existing = await prisma.project.findFirst({
      where: { name: ongoing.name, category: "ongoing" },
    });
    if (existing) {
      console.log(`⏪ Skipping (exists): ${ongoing.name}`);
      continue;
    }
    await prisma.project.create({
      data: {
        ...ongoing,
        features: [],
        createdById: admin.id,
      },
    });
    console.log(`✅ Seeded ongoing: ${ongoing.name}`);
  }

  console.log("🌱 Project seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });