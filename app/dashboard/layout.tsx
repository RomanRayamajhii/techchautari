import LeftSidebar from "@/app/components/dashboard/left-sidebar";
import type { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <LeftSidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
