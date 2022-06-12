import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@email.com",
      Posts: {
        create: {
          title: "My first post",
          content: "This is my first post",
        },
      },
    },
  });

  await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@email.com",
      Posts: {
        create: {
          title: "Prisma Intro",
          content: "This is a post about the Prisma",
        },
      },
    },
  });

  const post = await prisma.post.create({
    data: {
      title: "I love Prisma",
      content: "Introduction to Prisma",
      Author: {
        connect: {
          email: "john.doe@email.com",
          // id: "cl4bkcwui00000isiv9hf87o6"
        },
      },
    },
  });

  const user = await prisma.user.update({
    where: {
      email: "jane.doe@email.com",
    },
    data: {
      name: "Jane East",
    },
  });

  console.dir([post, user], { depth: null });

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
