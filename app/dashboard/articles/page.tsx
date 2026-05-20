import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Delete, Pencil } from "lucide-react";


const MyArticle = async () => {
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
    return null;
  }
  const articles = await prisma.article.findMany({
    where: {
      authorId: loginedUser.id,
    },
  });
  if (!articles || articles.length === 0) {
    return <p className="text-center text-xl">No articles found</p>;
  }

  return (
    <main>
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
                      href={`/dashboard/articles/${article.id}`}
                      className="flex items-center justify-center gap-2"
                    >
                      Read More <ArrowRight size={18} />
                    </Link>
                  </Button>

                  {/* Stats */}
                  <div className="flex justify-between">
                    <div className="flex gap-2 mt-auto">
                      <Link
                        href={`/dashboard/articles/${article.id}/edit-article`}
                      >
                        <Button
                          variant="default"
                          className="px-4 cursor-pointer bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
                        >
                          <Pencil /> Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        className="px-4 cursor-pointer bg-red-600 text-white hover:bg-red-700 hover:text-white"
                      >
                        <Delete /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default MyArticle;
