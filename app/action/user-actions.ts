"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const loginedUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (!loginedUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: user.fullName || "User",
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl as string,
      },
    });
  }

  return user;
}
