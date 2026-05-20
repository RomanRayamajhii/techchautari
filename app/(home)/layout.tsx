import { syncUser } from "@/app/action/user-actions";
import type { ReactNode } from "react";

const layout = async({children}: {children: ReactNode}) => {
    // This will sync the user if they are logged in, 
    // but we ignore the return value so it doesn't block rendering for logged-out users
    await syncUser();
    
  return (
    <div>{children}</div>
  )
}

export default layout