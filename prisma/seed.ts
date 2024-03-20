import { PrismaClient } from '@prisma/client'
import { seedUsers } from './dummy-data/dummy-data';
const prisma = new PrismaClient()

async function main() {
  await seedUserRole()
  
  // await seedUsers()
}
/**
 * Seed user role data to the UserRole table
 */
async function seedUserRole () {
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

main()
  .catch((e) => console.error("USER ROLE SEED: ", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
