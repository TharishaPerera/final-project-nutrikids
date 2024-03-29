import { PrismaClient } from "@prisma/client";
import { seedUsers } from "./dummy-data/dummy-data";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await seedUserRole();
  await seedDefaultUsers();

  // await seedUsers();
}
/**
 * Seed user role data to the UserRole table
 */
async function seedUserRole() {
  await prisma.userRole.createMany({
    data: [
      {
        id: 10001,
        level: 100,
        role: "USER",
      },
      {
        id: 10002,
        level: 500,
        role: "ASSISTANT",
      },
      {
        id: 10003,
        level: 1000,
        role: "CONSULTANT",
      },
      {
        id: 10004,
        level: 5000,
        role: "COMPANY_ADMIN",
      },
      {
        id: 10005,
        level: 10000,
        role: "SUPER_ADMIN",
      },
    ],
  });
}

/**
 * Seed default users data
 */
async function seedDefaultUsers() {
  await prisma.user.createMany({
    data: [
      {
        name: "Parent User",
        email: "parent@nutrikids.com",
        password: await bcrypt.hash("1qaz@WSX", 10),
        telephone: "+1234567890",
        emailVerified: "2023-05-12T08:30:00Z",
        role: 10001,
      },
      {
        name: "Assistant User",
        email: "assistant@nutrikids.com",
        password: await bcrypt.hash("1qaz@WSX", 10),
        telephone: "+1234567890",
        emailVerified: "2023-05-12T08:30:00Z",
        role: 10002,
      },
      {
        name: "Consultant User",
        email: "consultant@nutrikids.com",
        password: await bcrypt.hash("1qaz@WSX", 10),
        telephone: "+1234567890",
        emailVerified: "2023-05-12T08:30:00Z",
        role: 10003,
      },
      {
        name: "Company Admin",
        email: "company.admin@nutrikids.com",
        password: await bcrypt.hash("1qaz@WSX", 10),
        telephone: "+1234567890",
        emailVerified: "2023-05-12T08:30:00Z",
        role: 10004,
      },
      {
        name: "Super Admin",
        email: "super.admin@nutrikids.com",
        password: await bcrypt.hash("1qaz@WSX", 10),
        telephone: "+1234567890",
        emailVerified: "2023-05-12T08:30:00Z",
        role: 10005,
      },
    ],
  });
}

main()
  .catch((e) => console.error("USER ROLE SEED: ", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
