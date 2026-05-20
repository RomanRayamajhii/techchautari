"use server"
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import {z} from 'zod';

const CreateCommentSchema = z.object({
    content: z.string().min(1, "Comment cannot be empty"),
  

})
export type CreateCommentFormState = {
    error:{
        content?:string[],
        formErrors?:string[],

    }
}


export const CreateComment = async (articleId:string,preState : CreateCommentFormState, formData: FormData) : Promise<CreateCommentFormState> => {
    const result = CreateCommentSchema.safeParse({content:formData.get("content")});
    
    if (!result.success) {
        return {
            error:{
                ...preState.error,
                content:result.error.flatten().fieldErrors.content,
                formErrors:result.error.flatten().formErrors,
            }
        }
    }
        const {userId} = await auth() ;
        if (!userId) {
            return {
                error:{
                    formErrors:["You must be logged in to comment"],
                }
            }
        }
        const existingUser = await prisma.user.findUnique({
            where:{
                clerkUserId:userId!,
            }
        })
        if (!existingUser) {
            return {
                error:{
                    formErrors:["You must be logged in to comment"],
                }
            }
        }
        try
        {
         await prisma.comment.create({
            data:{
                content:result.data!.content,
                userId:existingUser!.id,
                articleId,
            }
        })
    }
    catch{

        return {
            error:{
                formErrors:["Something went wrong"],
            }
        }
       
    
    }


revalidatePath(`/articles/${articleId}`);
return {
    error:{
        formErrors:[],
    }
}

}

