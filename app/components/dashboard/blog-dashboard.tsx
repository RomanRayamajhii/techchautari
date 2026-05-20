import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Heart, MessageCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import RecentArticles from "./recent-articles";
import { dashboardTable } from "@/app/action/dashboard-table";


const BlogDashboard = async() => {
   
  const articles = await dashboardTable();
  const totalComments = articles.reduce(
    (total, article) => total + article.comments.length,
    0
  );


  return (
    <main className="flex-1 ">
      <div className="flex justify-between  item-center mb-8">
        <div>
          <h1 className="font-bold text-2xl">Blog Dashboard</h1>
          <p>Manage your blogs and profile</p>
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer h-10 px-2">
          <Link
            href="/dashboard/articles/create-articles"
            className="flex items-center gap-2"
          >
            <PlusCircle /> Add Blog
          </Link>
        </Button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2">
            <CardTitle>Total Articles</CardTitle>
            <FileText />
          </CardHeader>
          <CardContent className="text-2xl font-bold">{articles.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2 ">
            <CardTitle>Total Comments</CardTitle>
            <MessageCircle />
          </CardHeader>
          <CardContent className="text-2xl font-bold">{totalComments}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2">
            <CardTitle>Total Likes</CardTitle>
            <Heart />
          </CardHeader>
          <CardContent className="text-2xl font-bold">500+ Likes</CardContent>
        </Card>
      </div>

      <RecentArticles articles={articles}/>
    </main>
  );
};

export default BlogDashboard;
