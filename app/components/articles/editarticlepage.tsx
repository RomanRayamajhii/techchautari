"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Tiptap from "./tiptap";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { EditArticleFormState, EditArticle } from "@/app/action/edit-article";
import { Article } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";


const EditArticlesPage = ({article}: {article: Article}) => {
    
  const initialstate: EditArticleFormState = {
    errors: {},
  };

  const [state, formAction,isPending] = useActionState(EditArticle, initialstate);

  return (
    <div className="space-y-4 max-w-5xl mx-auto p-6  w-full ">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Article</CardTitle>
          <p>Write and publish blog posts to your audience</p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="id" value={article.id} />
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input placeholder="Title" name="title" type="text" 
              defaultValue={article.title}
              
              />
              {state.errors?.title && (
                <p className="text-red-500">{state.errors?.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <select
                name="category"
                className="w-full h-10 rounded-md border border-gray-300 py-2 px-3"
                defaultValue={article.category}
             
           
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Devops">Devops</option>
                <option value="AI & Machine Learning"> AI & Machine Learning</option>
                <option value="Startups">Startups</option>
                <option value="Programming Tips">Programming Tips</option>
                <option value="Tech News">Tech News</option>
                <option value="Others">Others</option>
              </select>
              {state.errors?.category && (
                <p className="text-red-500">{state.errors?.category}</p>
              )}
            </div>

            <div className="space-y-2">
          {article.image && (
  <Image
    src={article.image}
    alt="Article image"
    width={160}
    height={96}
    className="rounded-md object-cover"
  />
)}
              <Label htmlFor="image">Image</Label>
              <Input
                placeholder="Image"
                name="image"
                type="file"
                accept="image/*"
              />
              {/* {state.errors?.image && (
    <p className="text-red-500">{state.errors?.image}</p>
)}
               */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Tiptap defaultValue={article.content} />
              {state.errors?.content && (
                <p className="text-red-500 ">{state.errors?.content[0]}</p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" >
                 <Link href="/dashboard">Cancel
                </Link>
              </Button>

            <Button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2" disabled={isPending} >
                {isPending ? "Updating..." : "Update"}
                </Button>
    

              
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlesPage;
