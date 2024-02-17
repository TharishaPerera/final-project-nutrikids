import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await seedUserRole()
}
/**
 * Seed user role data to the UserRole table
 */
async function seedUserRole () {
  await prisma.userRole.createMany({
    data: [
      {
        id: 10001,
        role: "USER",
      },
      {
        id: 10002,
        role: "ASSISTANT",
      },
      {
        id: 10003,
        role: "CONSULTANT",
      },
      {
        id: 10004,
        role: "COMPANY_ADMIN",
      },
      {
        id: 10005,
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
