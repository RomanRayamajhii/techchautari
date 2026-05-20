"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(articleId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_articleId: {
        userId: user.id,
        articleId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId: user.id,
        articleId,
      },
    });
  }

  const likeCount = await prisma.like.count({
    where: {
      articleId,
    },
  });

  revalidatePath(`/articles/${articleId}`);

  return {
    liked: !existingLike,
    likeCount,
  };
}

export async function isLiked(articleId: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) {
      return false;
    }

    const like = await prisma.like.findUnique({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId,
        },
      },
    });

    return !!like;
  } catch {
    return false;
  }
}