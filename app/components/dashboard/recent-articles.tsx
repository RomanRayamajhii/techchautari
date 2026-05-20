"use client";

import {
  Badge
} from "@/components/ui/badge";

import {
  Button
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { Prisma } from "@prisma/client";
import { ArrowRight, Delete, Pencil } from "lucide-react";
import Link from "next/link";
import React, { startTransition, useOptimistic } from "react";
import { deleteArticle } from "@/app/action/delete-article";

type RecentArticleProps = {
  articles: {
    id: string;
    title: string;
    createdAt: Date;
    _count: {
      comments: number;
      likes: number;
    };
  }[];
};

const RecentArticles = ({ articles }: RecentArticleProps) => {
  const [optimisticArticles, removeArticle] = useOptimistic(
    articles,
    (state, id: string) => {
      return state.filter((article) => article.id !== id);
    }
  );

  const handleDelete = async (id: string) => {
    startTransition(() => {
      removeArticle(id);
    });

    await deleteArticle(id);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">
          Recent Articles
        </CardTitle>

        <Button asChild variant="ghost">
          <Link href="/dashboard/articles">
            View All <ArrowRight />
          </Link>
        </Button>
      </CardHeader>

      {optimisticArticles.length === 0 && (
        <CardContent>
          <p className="text-center text-gray-500">
            No articles found
          </p>
        </CardContent>
      )}

      {optimisticArticles.length > 0 && (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {optimisticArticles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-semibold">
                    {article.title}
                  </TableCell>

                  <TableCell>
                    {article._count.comments}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-700 px-2 h-6 border-green-600">
                      Published
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">
                      <Button  className="bg-blue-600 text-white h-8 px-2 hover:bg-blue-700 hover:text-white">
                        <Link
                          href={`/dashboard/articles/${article.id}/edit-article`}
                        className="flex items-center gap-2">
                          <Pencil /> Edit
                        </Link>
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(article.id)}
                      >
                        <Delete /> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;