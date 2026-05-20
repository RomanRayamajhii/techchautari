import { AllArticlePageSkeleton } from "../components/articles/all-article-skeleton";
import Navbar from "../components/articles/navbar";

const Loading = () => {
  return (
    <main>
      <Navbar />
      <AllArticlePageSkeleton />
    </main>
  );
};

export default Loading;