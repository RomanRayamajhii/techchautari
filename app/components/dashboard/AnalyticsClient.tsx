"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
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
    name: a.title.length > 15 ? a.title.slice(0, 15) + "…" : a.title,
    likes: a._count.likes,
    comments: a._count.comments,
  }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen w-full">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Track article performance and engagement in real time
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="h-[130px] rounded-2xl border shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm text-muted-foreground">
              Total Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl sm:text-4xl font-bold">
            {articles.length}
          </CardContent>
        </Card>

        <Card className="h-[130px] rounded-2xl border shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm text-muted-foreground">
              Total Likes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl sm:text-4xl font-bold text-pink-500">
            {totalLikes}
          </CardContent>
        </Card>

        <Card className="h-[130px] rounded-2xl border shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm text-muted-foreground">
              Total Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="text-3xl sm:text-4xl font-bold text-green-600">
            {totalComments}
          </CardContent>
        </Card>
      </div>

      {/* CHART */}
      <Card className="rounded-2xl border shadow-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">
            Engagement Per Article
          </CardTitle>
        </CardHeader>

        <CardContent className="p-3 sm:p-6">
          {/* ✅ FIXED RESPONSIVE CHART CONTAINER */}
          <div className="w-full h-[300px] sm:h-[380px] lg:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

                <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} />

                <YAxis />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "none",
                  }}
                />

                <Legend />

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
