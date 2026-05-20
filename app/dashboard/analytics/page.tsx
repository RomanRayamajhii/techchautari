import { dashboardTable } from "@/app/action/dashboard-table";
import AnalyticsClient from "@/app/components/dashboard/AnalyticsClient";

export default async function AnalyticsPage() {
  const articles = await dashboardTable();

  const totalLikes = articles.reduce((sum, a) => sum + a._count.likes, 0);

  const totalComments = articles.reduce((sum, a) => sum + a._count.comments, 0);

  return (
    <div>
      <AnalyticsClient
        articles={articles}
        totalLikes={totalLikes}
        totalComments={totalComments}
      />
    </div>
  );
}
