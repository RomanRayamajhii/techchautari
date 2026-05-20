"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import React, { useActionState } from 'react'
import { CreateComment, CreateCommentFormState } from '@/app/action/comment'
const CommentInput = ({articleId}: {articleId: string}) => {
    const initialState: CreateCommentFormState = {
        error:{
            content:[],
            formErrors:[],
        }
    }
    const [formstate,action,isPending] = useActionState(CreateComment.bind(null,articleId),initialState);

  return (
    <div className='mt-6  sticky'>

      
        <h2 className='font-semibold text-md'>Add Comment</h2>

        <div className='flex gap-4 mt-5'>
              <Avatar className="h-10 w-10 border-zinc-600 ">
            <AvatarFallback className=" font-semibold text-sm">XY</AvatarFallback>
            <AvatarImage />
            </Avatar>
       
       
        <form action={action} className=' w-full '>
            <Textarea  placeholder='Type your comment here...' name='content' className='w-full h-full'/>
              {formstate.error?.content &&
                  formstate.error?.content.map((error, index) => (
                    <p key={index} className='text-red-500 text-sm'>
                      {error}
                    </p>
                  ))}
            <Button type='submit' className='px-2 mt-2 w-fit' disabled={isPending}>

                {isPending ? 'Submitting...' : 'Submit'}                
            </Button>
        </form>
        </div>
        
        
    </div>
  )
}

export default CommentInput