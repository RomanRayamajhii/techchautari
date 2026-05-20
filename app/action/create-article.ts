"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CreateArticlesSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100, "Title is too long"),
  category: z.string().min(1, "Please select a category"),
  content: z
    .string({ error: "Content is required" })
    .min(10, "Content should be at least 10 characters long"),
});
export type CreateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    content?: string[];
    image?: string[];
    formErrors?: string[];
  };
};

export const CreateArticle = async (
  prevState: CreateArticleFormState,
  formData: FormData,
): Promise<CreateArticleFormState> => {
  const validateData = CreateArticlesSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });
  if (!validateData.success) {
    return {
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You must be logged in to create an article"],
      },
    };
  }

  // checking user Id is in prisma or not

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  if (!existingUser) {
    return {
      errors: {
        formErrors: ["You must be logged in to create an article"],
      },
    };
  }

  const imageFile = formData.get("image") as File | null;
  if (!imageFile || imageFile.name === "Undefined") {
    return {
      errors: {
        image: ["Image is required"],
      },
    };
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const maxSize = 5 * 1024 * 1024;
  if (buffer.length > maxSize) {
    return {
      errors: {
        image: ["Image size should be less than 5MB"],
      },
    };
  }
  const uploadResponse: UploadApiResponse | undefined = await new Promise(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "articles",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        },
      );
      uploadStream.end(buffer);
    },
  );
  const imageUrl = uploadResponse?.secure_url;
  if (!imageUrl) {
    return {
      errors: {
        image: ["Image upload failed"],
      },
    };
  }

  try {
    // insert gardaii garako

    await prisma.article.create({
      data: {
        title: validateData.data.title,
        category: validateData.data.category,
        content: validateData.data.content,
        image: imageUrl,
        authorId: existingUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {
        formErrors: ["Failed to create article"],
      },
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/");

  redirect("/dashboard");
};

export const getArticleWithComment = async () => {
  const [article, totalComments] = await Promise.all([
    prisma.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        comments: true,
        author: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.comment.count(),
  ]);
  return [article, totalComments] as const;
};
