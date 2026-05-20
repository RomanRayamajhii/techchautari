"use client";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Prisma } from '@prisma/client'
import { ArrowRight, Delete, Pencil } from 'lucide-react'
import Link from 'next/link'
import React, { startTransition, useOptimistic } from 'react'
import Form from "next/form";
import { deleteArticle } from '@/app/action/delete-article'



type RecentArticleProps={
    articles:Prisma.ArticleGetPayload<{
        include:{
            comments:true,
            author:{
                select:{
                    name:true,
                    email:true,
                    imageUrl:true,
                    
                }
            }
        }
    }>[];
}
   
    


const RecentArticles = ({articles}:RecentArticleProps) => {
    const [optimisticArticle,setOptimisticArticle]= useOptimistic(articles,(prev,id:string)=>{
        return prev.filter((article)=>article.id !== id);

    })

    const handleDelete= async(id:string)=>{
        startTransition(() => {
            setOptimisticArticle(id);
        });
        await deleteArticle(id);
    }


  return (
    <div>
        <Card>
            <CardHeader className='flex justify-between items-center'>
              
                    <CardTitle className='text-2xl font-bold'>
                        Recent Articles

                    </CardTitle>
                    <Button asChild className=' cursor-pointer border border-gray-300 dark:border-gray-600  dark:text-gray-400 dark:hover:text-white' variant={'ghost'}>
                        <Link href="/dashboard/articles">
                            View All <ArrowRight />
                        </Link>
                    </Button>
            
            </CardHeader>

            {
                optimisticArticle.length === 0 && 
                <CardContent>
                    <p className='text-center text-gray-500'>No articles found</p>
                </CardContent>
            }

            {
                optimisticArticle.length > 0 && 

            <CardContent>
                <Table>
                    <TableHeader   >
                        <TableRow className='border-b border-gray-300 dark:border-gray-600' >
                            <TableHead className='text-zinc-600 dark:text-white'  > 
                                Title
                            </TableHead>
                            <TableHead className='text-zinc-600 dark:text-white'>
                                Comments
                                </TableHead>
                                
                            <TableHead className='text-zinc-600 dark:text-white'>
                                Status
                            </TableHead>
                            <TableHead className='text-zinc-600 dark:text-white'>
                                Publish Date
                            </TableHead>
                            <TableHead className='text-zinc-600 dark:text-white'>
                                Actions
                            </TableHead>
                            
                        </TableRow>

                        
                    </TableHeader>
                    <TableBody >
                        {optimisticArticle.map((article)=>(
                            
                        <TableRow key={article.id} className='border-b border-gray-200 dark:border-gray-600' >
                            <TableCell>
                                <span className='font-semibold text-zinc-600 dark:text-white'>
                                    {article.title}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className='font-semibold text-zinc-600 dark:text-white'>
                                    {article.comments.length}
                                </span>
                            </TableCell>
                            <TableCell>
                                <Badge className='bg-green-200 text-green-700 dark:text-black border border-green-500' variant="outline">
                                    Published
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <span>
                                    {new Date(article.createdAt).toLocaleDateString()}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className='flex items-center gap-3'>
                                  <Button asChild className="bg-blue-600 text-white">
                                        <Link href={`/dashboard/articles/${article.id}/edit-article`}>
                                        <Pencil /> Edit
                                        </Link>
                                        </Button>

                                    <Form action={handleDelete.bind(null,article.id)}>
                                         <Button type="submit" variant="ghost" className='bg-red-600 text-white hover:bg-red-700 hover:text-white'>
                                        <Delete /> Delete
                                    </Button>
                                    </Form>
                                   
                                </div>

                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                
                    
                    
                </Table>
                
            </CardContent>

}
        </Card>






    </div>
  )
}

export default RecentArticles
