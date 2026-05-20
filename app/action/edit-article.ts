"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const EditArticlesSchema = z.object({
  title: z.string().min(3, "Title is too short").max(100, "Title is too long"),
  category: z.string().min(1, "Please select a category"),
  content: z
    .string({ error: "Content is required" })
    .min(10, "Content should be at least 10 characters long"),
});
export type EditArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    content?: string[];
    image?: string[];
    formErrors?: string[];
  };
};

export const EditArticle = async (
  prevState: EditArticleFormState,
  formData: FormData,
): Promise<EditArticleFormState> => {
  const validateData = EditArticlesSchema.safeParse({
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
        formErrors: ["You must be logged in to Edit an article"],
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
        formErrors: ["You must be logged in to Edit an article"],
      },
    };
  }
  let imageUrl: string | undefined;

  const imageFile = formData.get("image") as File | null;

  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "articles",
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result!);
          },
        );

        uploadStream.end(buffer);
      },
    );

    imageUrl = uploadResponse.secure_url;
  }

  try {
    // insert gardaii garako

    await prisma.article.update({
      where: {
        id: formData.get("id") as string,
      },
      data: {
        title: validateData.data.title,
        category: validateData.data.category,
        content: validateData.data.content,
        image: imageUrl,
        // authorId: existingUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      errors: {
        formErrors: ["Failed to Edit article"],
      },
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/");

  redirect("/dashboard");
};
