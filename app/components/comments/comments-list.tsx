import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Prisma } from "@prisma/client";
type Props = {
  comments: Prisma.CommentGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};


export const CommentsList = async({comments}: Props)=> {
  
  return (
    <div className="space-y-8 mt-5">

   <div className="flex items-center justify-between">
         <h2 className="text-xl font-semibold border-b-2 border-red-600 w-fit pb-2">
         Comments

   </h2>
    <span className="text-gray-500 text-sm">Total Comments: {comments?.length}</span>
   </div>
{comments?.length === 0 && (
  <p className="text-gray-500 text-center">No comments yet.</p>
)}

{
  comments.map((comment)=>(

    <div key={comment.id} className="flex gap-4">
          <Avatar className="h-10 w-10 border-zinc-600">
            <AvatarFallback className="font-semibold text-sm">
              {comment.user?.name?.slice(0, 2).toUpperCase() ?? "XY"}
            </AvatarFallback>
            <AvatarImage src={comment.user?.imageUrl || ""} />
          </Avatar>

          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="font-semibold">
                {comment.user?.name}
              </h2>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toDateString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 text-justify">
              {comment.content}
            </p>

            <Button variant="ghost" className="text-xs hover:bg-transparent">
              Reply
            </Button>
          </div>
        </div>


  ))
}

    </div>
  )}
            
    
