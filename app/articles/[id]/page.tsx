import LikeButton from '@/app/components/articles/like-button'
import CommentInput from '@/app/components/comments/comment-input'
import { CommentsList } from '@/app/components/comments/comments-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { isLiked } from '@/app/action/like'

const ArticlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
        },
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
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!article) {
    notFound()
  }

  const liked = await isLiked(article.id);

  return (
    <main className='mx-auto max-w-4xl p-6'>
      {/* <Suspense fallback={<AllArticlePageSkeleton />}/> */}
      <Card>
        {article.image && (
          <Image
            src={article.image}
            alt={article.title}
            width={1000}
            height={560}
            className='h-80 w-full rounded-t-xl object-cover'
            priority
          />
        )}

        <CardHeader>
          <p className='text-sm text-muted-foreground'>
            {article.category} · {new Date(article.createdAt).toDateString()} ·{' '}
            {article.author.name}
          </p>
          <CardTitle className='text-3xl'>{article.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <div
            className='article-content max-w-none'
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>
      <div className='flex items-center gap-6 mt-4 px-2'>
        <LikeButton
          articleId={article.id}
          initialLikeCount={article._count.likes}
          initialIsLiked={liked}
        />
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageCircle size={20}  />
          <p>{article.comments.length}</p>
        </div>
      </div>
    


      <div className="sticky mb-25"> 

         <CommentsList comments ={article.comments}/>
      <CommentInput articleId={article.id}/>
      </div>

       
    </main>
  )
}

export default ArticlePage
