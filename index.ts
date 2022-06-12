import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const groupBy = await prisma.post.groupBy({
    by: ["authorId"],
    _count: true,
  });

  console.dir(groupBy, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
