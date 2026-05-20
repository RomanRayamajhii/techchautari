import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AllArticlePageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className="overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800"
        >
          {/* Image skeleton */}
          <div className="p-2">
            <Skeleton className="w-full h-56 rounded-md" />
          </div>

          <div className="flex flex-col flex-1">
            <CardHeader>
              {/* Title skeleton */}
              <Skeleton className="h-7 w-3/4 mb-1" />
              <Skeleton className="h-7 w-1/2" />
            </CardHeader>
            <CardContent className="flex flex-col flex-1 gap-4">
              {/* Meta skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>

              {/* Content text skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Action buttons skeleton */}
              <div className="mt-auto space-y-4 pt-4">
                <Skeleton className="h-10 w-full" />
                <div className="flex gap-6">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};