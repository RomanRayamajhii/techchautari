import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import React from 'react'
import Image from 'next/image';

import { AvatarFallback, AvatarImage ,Avatar} from '@/components/ui/avatar';
import { CommentsList } from '@/app/components/comments/comments-list';


const ArticlePage = async({params}:{params:Promise<{id:string}>}) => {
       const article = await prisma.article.findUnique({
        where: {
            id: (await params).id,
        },
        include:{
          author:{
            select:{
              name:true,
              imageUrl:true,
            }
          },
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  imageUrl: true,
                },
              },
            },
          },
        }
    });
      if(!article){
        return(
            <div>
                <p>Article not found</p>
            </div>
        )
    }
  return (

    <div className="max-w-5xl mx-auto p-6 w-full">
  
    <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>{article.title}</CardTitle>
                   <p className="text-sm mt-4 font-bold border-l-4 border-red-600 pl-3">{article.category}</p>

        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
             {article.image && (
             <Image src={article.image} alt={article.title} width={100} height={100} className='w-full h-64 object-cover mb-5 rounded-md' 
             loading="eager"/>
          )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className='items-center gap-2'>
<div className='flex items-center gap-3'>
     <Avatar>
  
    <AvatarFallback>XY</AvatarFallback>
    <AvatarImage src={article.author.imageUrl || ""} />
  </Avatar>
   <p className="text-sm ">
   {article.author.name}</p>
</div>
 
            </div>
  
            <p className="text-sm">{article.createdAt.toDateString()}</p>
          </div>
         
        <div className="article-content max-w-none text-zinc-600 dark:text-zinc-400 mt-5"
        dangerouslySetInnerHTML={{ __html: article.content }}
        />
        </CardContent>
    </Card>
     <CommentsList comments={article.comments}/>
   
     </div>
  )
}


export default ArticlePage
