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

  if (existingAdmin) {
    console.log("⚠️ Admin already exists, updating role...");
    await prisma.user.update({
      where: { email: "ahemed2019029@stud.kuet.ac.bd" },
      data: { role: "superadmin", isProfileApproved: true },
    });
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

    console.log("✅ Admin created:", admin.email);
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
