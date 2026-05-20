"use client"
import { Button } from "@/components/ui/button";
import {useFormStatus} from "react-dom"
export const Submit=()=>{
    const {pending}=useFormStatus();
    return <Button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2" disabled={pending} >{pending ? "Publishing..." : "Publish"}</Button>
    


}

export const Cancel=()=>{
    return <Button type="button" className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2" >Cancel</Button>
}