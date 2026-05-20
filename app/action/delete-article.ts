"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle= async(id:string)=>{
    try {
        const article =await prisma.article.delete({
            where:{
                id
            }
        })
        revalidatePath("/dashboard");
        return article;
    } catch (error) {
        console.log(error);
        
    }
}