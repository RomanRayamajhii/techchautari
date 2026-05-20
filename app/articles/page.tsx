
// export const dynamic = "force-dynamic";
// import { prisma } from "@/lib/prisma";
// import type { Prisma } from "@prisma/client";
// import Image from "next/image";
// import Link from "next/link";
// import { auth } from "@clerk/nextjs/server";
// import Navbar from "../components/articles/navbar";
// import LikeButton from "../components/articles/like-button";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";
// import { ArrowRight, MessageCircle } from "lucide-react";

// type Props = {
//   searchParams?: {
//     search?: string;
//     page?: string;
//   };
// };

// export default async function ArticlesPage({ searchParams }: Props) {
//   const search = searchParams?.search;
//   const page = searchParams?.page;

//   const { userId } = await auth();

//   const ITEMS_PER_PAGE = 2;
//   const currentPage = Number(page || 1);
//   const skip = (currentPage - 1) * ITEMS_PER_PAGE;

//   const whereClause: Prisma.ArticleWhereInput | undefined = search
//     ? {
//         OR: [
//           { title: { contains: search, mode: "insensitive" } },
//           { category: { contains: search, mode: "insensitive" } },
//         ],
//       }
//     : undefined;

//   const [articles, totalArticles] = await Promise.all([
//     prisma.article.findMany({
//       where: whereClause,
//       take: ITEMS_PER_PAGE,
//       skip,
//       orderBy: { createdAt: "desc" },
//       include: {
//         author: { select: { name: true } },
//         comments: { include: { user: { select: { name: true } } } },
//         likes: { include: { user: { select: { clerkUserId: true } } } },
//         _count: { select: { comments: true, likes: true } },
//       },
//     }),
//     prisma.article.count({ where: whereClause }),
//   ]);

//   const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);

//   return (
//     <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
//       <Navbar />

//       {/* EMPTY STATE */}
//       {articles.length === 0 ? (
//         <div className="flex flex-col items-center justify-center p-20 text-center">
//           <h2 className="text-2xl font-bold">No articles found</h2>
//           <p className="text-muted-foreground mt-2 mb-6">
//             {search
//               ? `No results for "${search}"`
//               : "No articles available."}
//           </p>

//           {search && (
//             <Button asChild>
//               <Link href="/articles">Clear Search</Link>
//             </Button>
//           )}
//         </div>
//       ) : (
//         /* GRID */
//         <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
//           {articles.map((article) => (
//             <Card
//               key={article.id}
//               className="flex flex-col overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
//             >
//               {/* IMAGE */}
//               {article.image && (
//                 <div className="relative h-52 w-full">
//                   <Image
//                     src={article.image}
//                     alt={article.title}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               )}

//               {/* CONTENT */}
//               <CardHeader>
//                 <CardTitle className="line-clamp-2 text-lg font-semibold">
//                   {article.title}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="flex flex-col flex-1 gap-3">
//                 <div className="text-xs text-muted-foreground space-y-1">
//                   <p>{article.category}</p>
//                   <p>{new Date(article.createdAt).toDateString()}</p>
//                   <p>{article.author.name}</p>
//                 </div>

//                 <div
//                   className="line-clamp-3 text-sm text-muted-foreground"
//                   dangerouslySetInnerHTML={{ __html: article.content }}
//                 />

//                 <div className="mt-auto space-y-3">
//                   <Button asChild className="w-full">
//                     <Link
//                       href={`/articles/${article.id}`}
//                       className="flex items-center justify-center gap-2"
//                     >
//                       Read More <ArrowRight size={16} />
//                     </Link>
//                   </Button>

//                   {/* STATS */}
//                   <div className="flex items-center justify-between text-sm text-muted-foreground">
//                     <LikeButton
//                       articleId={article.id}
//                       initialLikeCount={article._count.likes}
//                       initialIsLiked={
//                         userId
//                           ? article.likes.some(
//                               (l) => l.user.clerkUserId === userId
//                             )
//                           : false
//                       }
//                     />

//                     <Link
//                       href={`/articles/${article.id}`}
//                       className="flex items-center gap-1"
//                     >
//                       <MessageCircle size={16} />
//                       {article._count.comments}
//                     </Link>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* PAGINATION */}
//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-4 py-8">
//           <Button
//             variant="outline"
//             disabled={currentPage <= 1}
//             asChild={currentPage > 1}
//           >
//             {currentPage > 1 ? (
//               <Link
//                 href={`/articles?search=${search ?? ""}&page=${
//                   currentPage - 1
//                 }`}
//               >
//                 Previous
//               </Link>
//             ) : (
//               "Previous"
//             )}
//           </Button>

//           <p className="text-sm text-muted-foreground">
//             Page {currentPage} of {totalPages}
//           </p>

//           <Button
//             variant="outline"
//             disabled={currentPage >= totalPages}
//             asChild={currentPage < totalPages}
//           >
//             {currentPage < totalPages ? (
//               <Link
//                 href={`/articles?search=${search ?? ""}&page=${
//                   currentPage + 1
//                 }`}
//               >
//                 Next
//               </Link>
//             ) : (
//               "Next"
//             )}
//           </Button>
//         </div>
//       )}
//     </main>
//   );

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import type{ Prisma } from "@prisma/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "../components/articles/navbar";
import LikeButton from "../components/articles/like-button";
import { auth } from "@clerk/nextjs/server";

// const ArticlesPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ search?: string; page?: string }>;
// }) => {
//   const { search, page } = await searchParams;
//   const { userId } = await auth();
const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string };
}) => {
  const { search, page } = await searchParams;

  const { userId } = await auth();
  const ITEMS_PER_PAGE = 6;
  const currentPage = parseInt(page || "1", 10) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const whereClause: Prisma.ArticleWhereInput | undefined = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { category: { contains: search, mode: "insensitive" } },
        ],
      }
    : undefined;

  const [articles, totalArticles] = await Promise.all([
    prisma.article.findMany({
      where: whereClause,
      take: ITEMS_PER_PAGE,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        likes: {
          include: {
            user: {
              select: {
                name: true,
                clerkUserId: true,
              },
            },
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    }),
    prisma.article.count({ where: whereClause }),
  ]);

  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);

  return (
    <main>
      <Navbar />
      {articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <h2 className="text-2xl font-bold mb-2">No articles found</h2>
          <p className="text-muted-foreground mb-6">
            {search
              ? `We couldn't find any articles matching "${search}".`
              : "No articles are available at the moment."}
          </p>
          {search && (
            <Button asChild>
              <Link href="/articles">Clear Search</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800 "
            >
              {/* Image */}
              <div className="p-2">
                <div className="relative w-full h-56 overflow-hidden">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      loading="eager"
                    />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-xl font-bold">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 gap-4">
                  {/* Meta */}
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{article.category}</p>
                    <p>{new Date(article.createdAt).toDateString()}</p>
                    <p>{article.author.name}</p>
                  </div>

                  {/* Content Preview */}
                  <div
                    className="prose dark:prose-invert line-clamp-3 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: article.content,
                    }}
                  />

                  {/* Push bottom content */}
                  <div className="mt-auto space-y-4">
                    <Button asChild variant="outline" className="w-full">
                      <Link
                        href={`/articles/${article.id}`}
                        className="flex items-center justify-center gap-2"
                      >
                        Read More <ArrowRight size={18} />
                      </Link>
                    </Button>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <LikeButton
                          articleId={article.id}
                          initialLikeCount={article._count.likes}
                          initialIsLiked={
                            userId
                              ? article.likes.some(
                                  (like) => like.user.clerkUserId === userId,
                                )
                              : false
                          }
                        />
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Link
                          href={`/articles/${article.id}`}
                          className="flex gap-2"
                        >
                          <MessageCircle size={18} />
                          <p>{article._count.comments}</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center gap-4 mt-8 pb-8">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            asChild={currentPage > 1}
          >
            {currentPage > 1 ? (
              <Link
                href={`/articles?${new URLSearchParams({
                  ...(search && { search }),
                  page: (currentPage - 1).toString(),
                }).toString()}`}
              >
                Previous
              </Link>
            ) : (
              <span>Previous</span>
            )}
          </Button>

          <span className="flex items-center text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            asChild={currentPage < totalPages}
          >
            {currentPage < totalPages ? (
              <Link
                href={`/articles?${new URLSearchParams({
                  ...(search && { search }),
                  page: (currentPage + 1).toString(),
                }).toString()}`}
              >
                Next
              </Link>
            ) : (
              <span>Next</span>
            )}
          </Button>
        </div>
      )}
    </main>
  );
};

export default ArticlesPage;