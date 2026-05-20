"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export const dashboardTable = async () => {
  const user = await currentUser();

  if (!user) return [];

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!loggedInUser) return [];

  return prisma.article.findMany({
    where: {
      authorId: loggedInUser.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });
};