import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seed ok');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
