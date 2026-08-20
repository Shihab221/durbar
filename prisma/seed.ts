import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Hash the admin password
  const hashedPassword = await bcrypt.hash("password123", 12);

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "ahemed2019029@stud.kuet.ac.bd" },
  });

  let adminId: number;
  if (existingAdmin) {
    console.log("⚠️ Admin already exists, updating role...");
    const updated = await prisma.user.update({
      where: { email: "ahemed2019029@stud.kuet.ac.bd" },
      data: { role: "superadmin", isProfileApproved: true },
    });
    adminId = updated.id;
    console.log("✅ Admin role updated");
  } else {
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        username: "ahemed2019029",
        email: "ahemed2019029@stud.kuet.ac.bd",
        password: hashedPassword,
        role: "superadmin",
        name: "Admin",
        isProfileApproved: true,
      },
    });
    adminId = admin.id;
    console.log("✅ Admin created:", admin.email);
  }

  // Seed default achievements (only if none exist)
  const existingAchievements = await prisma.achievement.count();
  if (existingAchievements === 0) {
    const seedAchievements = [
      {
        title: "Finalist – Anatolian Rover Challenge (ARC) 2022",
        location: "Turkey (Onsite)",
        year: "2022",
        icon: "trophy",
        imageUrl: "/achievement-arc-2022.jpg",
        imageAlt:
          "Team Durbar's KUET Mars Rover at Anatolian Rover Challenge 2022 in Turkey",
        highlight: true,
        order: 1,
        description:
          "Team Durbar's unprecedented success in ARC 2022 onsite round highlights their determination to excel in the field of Mars Rover development. Competing against teams from around the world, Team Durbar showcased their innovative rover designs and technical prowess, earning a spot among the top finalists. This achievement marks a significant milestone for Bangladesh in international rover competitions.",
      },
      {
        title: "9th Place – International Planetary Aerial Systems Challenge (IPAS) 2021",
        location: "Virtual",
        year: "2021",
        icon: "award",
        imageUrl: "/achievement-ipas-2021.jpg",
        imageAlt:
          "IPAS 2021 leaderboard showing KUET Durbar at 9th place with 510.91 points",
        highlight: false,
        order: 2,
        description:
          "Secured 9th position globally in the prestigious IPAS challenge, demonstrating our team's expanding capabilities beyond ground rovers into aerial planetary exploration systems.",
      },
      {
        title: "10th Place & 1st in Bangladesh – Indian Rover Design Challenge (IRDC) 2020",
        location: "Virtual",
        year: "2020",
        icon: "medal",
        imageUrl: "/achievement-irdc-2020.jpg",
        imageAlt:
          "IRDC 2020 rankings showing KUET Durbar at 10th place with 656 points",
        highlight: false,
        order: 3,
        description:
          "Achieved 10th place overall and proudly became the first team from Bangladesh to participate and excel in IRDC, setting a benchmark for Bangladeshi teams in international rover competitions.",
      },
      {
        title: "Best Newcomer Award – KUET Robotics Club",
        location: "KUET",
        year: "2020",
        icon: "star",
        highlight: false,
        order: 4,
        description:
          "Recognized for exceptional debut performance and rapid advancement in the field of robotics within the university.",
      },
      {
        title: "Innovation Award – National Science & Technology Fair",
        location: "Dhaka",
        year: "2021",
        icon: "award",
        highlight: false,
        order: 5,
        description:
          "Received the Innovation Award for our novel approach to rover suspension design at the national level science fair.",
      },
    ];

    for (const a of seedAchievements) {
      await prisma.achievement.create({
        data: {
          ...a,
          createdById: adminId,
        },
      });
    }
    console.log(`✅ Seeded ${seedAchievements.length} achievements`);
  } else {
    console.log(`⚠️ ${existingAchievements} achievements already exist, skipping seed`);
  }

  console.log("🌱 Database seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
