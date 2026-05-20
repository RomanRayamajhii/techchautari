"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Article = {
  id: string;
  title: string;
  createdAt: string | Date;
  _count: {
    likes: number;
    comments: number;
  };
};

type Props = {
  articles: Article[];
  totalLikes: number;
  totalComments: number;
};

export default function AnalyticsClient({
  articles,
  totalLikes,
  totalComments,
}: Props) {
  const data = articles.map((a) => ({
    name: a.title.slice(0, 12),
    likes: a._count.likes,
    comments: a._count.comments,
  }));

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your article performance
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-6 md:grid-cols-3">

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Articles</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {articles.length}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Likes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-pink-500">
            {totalLikes}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Total Comments</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-600">
            {totalComments}
          </CardContent>
        </Card>
      </div>

      {/* CHART */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Engagement Per Article</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="likes" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="comments" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}