import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Hash the superadmin password
  const hashedPassword = await bcrypt.hash("password@123", 12);

  // Check if superadmin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("⚠️ Superadmin already exists, skipping creation");
  } else {
    // Create superadmin user
    const superadmin = await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@teamdurbar.kuet.ac.bd",
        password: hashedPassword,
        role: "superadmin",
        name: "Super Admin",
        isProfileApproved: true,
      },
    });

    console.log("✅ Superadmin created:", superadmin.username);
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
