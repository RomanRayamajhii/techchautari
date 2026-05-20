"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import TechChautari from "@/public/tech1.png";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilePlus, LayoutDashboard, LayoutDashboardIcon } from "lucide-react";
import {
  FileText,
  MessageCircle,
  Users,
  BarChart,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserButton } from "@clerk/nextjs";

export default function LeftSidebar() {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="lg"
            aria-label="Open dashboard menu"
            className="flex  md:hidden  mt-3 mx-2"
          >
            <LayoutDashboardIcon className=" hover:text-blue-600 dark:text-blue-500 " />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>Dashboard Menu</SheetTitle>

              <SheetDescription>
                Sidebar navigation links for dashboard pages.
              </SheetDescription>
            </SheetHeader>
          </VisuallyHidden>
          <LayoutSideBar />
        </SheetContent>
      </Sheet>

      <div className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-zinc-200 md:flex">
        <LayoutSideBar />
      </div>
    </div>
  );
}

const navLinks = [
  {
    href: "/dashboard",
    label: "OverView",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/articles",
    label: "My Articles",
    icon: FileText,
  },
  {
    href: "/dashboard/articles/create-articles",
    label: "Create Article",
    icon: FilePlus,
  },
  // {
  //   href: "/comments",
  //   label: "Comments",
  //   icon: MessageCircle,
  // },

  // {
  //   href: "/users",
  //   label: "Users",
  //   icon: Users,
  // },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart,
  },
  // {
  //   href: "/settings",
  //   label: "Settings",
  //   icon: Settings,
  // },
];

const LayoutSideBar = () => {
  return (
    <nav className="space-y-5 py-4 px-4 ">
      <h1 className="  py-2 px-2">
        <Link
          href="/"
          className=" hover:opacity-80 transition-opacity duration-200  dark:invert-0 "
        >
          <Image
            src={TechChautari}
            alt="Logo"
            width={150}
            height={100}
            className="w-auto h-auto"
          />
        </Link>
      </h1>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="ghost"
          className=" w-full hover:bg-blue-50 dark:hover:bg-blue-950  hover:text-blue-700 font-semibold"
        >
          <Link href={link.href} className="justify-start gap-2">
            {" "}
            <link.icon /> {link.label}
          </Link>
        </Button>
      ))}
       <div className="space-y-5">
          <Button
          asChild
          variant="ghost"
          className=" w-full hover:bg-blue-50 dark:hover:bg-blue-950  hover:text-blue-700 font-semibold"
        >
          <Link href="/user-profile" className="flex items-center gap-2 justify-start">
            <Users className="w-5 h-5"/>User
          </Link>
        </Button>
             <Button
          asChild
          variant="ghost"
          className=" w-full hover:bg-blue-50 dark:hover:bg-blue-950  hover:text-blue-700 font-semibold"
        >
          <Link href="/user-profile" className="flex items-center gap-2 justify-start">
            <Settings className="w-5 h-5"/>Settings
          </Link>
        </Button>
  
</div>
    </nav>
  );
};
