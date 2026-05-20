import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Heart, MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import RecentArticles from "./recent-articles";
import { dashboardTable } from "@/app/action/dashboard-table";

const BlogDashboard = async () => {
  const articles = await dashboardTable();

  const totalComments = articles.reduce(
    (sum, a) => sum + a._count.comments,
    0
  );

  const totalLikes = articles.reduce(
    (sum, a) => sum + a._count.likes,
    0
  );

  return (
    <main className="flex-1">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-bold text-2xl">Blog Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your blogs and profile
          </p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-3">
          <Link
            href="/dashboard/articles/create-articles"
            className="flex items-center gap-2"
          >
            <PlusCircle /> Add Blog
          </Link>
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Articles</CardTitle>
            <FileText />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {articles.length}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Comments</CardTitle>
            <MessageCircle />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {totalComments}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Likes</CardTitle>
            <Heart />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {totalLikes} Like
          </CardContent>
        </Card>

      </div>

      {/* RECENT ARTICLES */}
      <RecentArticles articles={articles} />
    </main>
  );
};

export default BlogDashboard;