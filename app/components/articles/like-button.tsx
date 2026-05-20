"use client";

import { toggleLike } from "@/app/action/like";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useState } from "react";

type LikeButtonProps = {
  articleId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
};

const LikeButton = ({
  articleId,
  initialLikeCount,
  initialIsLiked,
}: LikeButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const [liked, setLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const handleLike = async () => {
    if (isPending) return;

    // Optimistically update the UI
    setIsPending(true);
    const previousLikedState = liked;
    setLiked(!previousLikedState);
    setLikeCount((prev) => (previousLikedState ? Math.max(0, prev - 1) : prev + 1));

    try {
      const updatedLikeState = await toggleLike(articleId);
      // Sync with the actual server response
      setLiked(updatedLikeState.liked);
      setLikeCount(updatedLikeState.likeCount);
    } catch (error) {
      console.error("Failed to toggle like", error);
      // Revert to previous state if the request failed
      setLiked(previousLikedState);
      setLikeCount((prev) => (previousLikedState ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleLike}
      disabled={isPending}
      aria-pressed={liked}
      className="flex items-center gap-2 text-muted-foreground hover:text-red-600"
    >
      <Heart
        className={cn(
          "size-5 transition-colors",
          liked && "fill-red-600 text-red-600"
        )}
      />
       <span className="text-sm">{likeCount}</span>
     
    </Button>
  );
};

export default LikeButton;
