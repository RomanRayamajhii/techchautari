import { AllArticlePageSkeleton } from "../components/articles/all-article-skeleton";

    
const Loading = () => {
  return (
    <main className="mx-auto max-w-7xl p-4 md:p-6">
      <AllArticlePageSkeleton />
    </main>
  );
};

export default Loading;