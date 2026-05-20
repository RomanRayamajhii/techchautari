"use client";

import Image from "next/image";
import Link from "next/link";
import TechChautari from "@/public/tech1.png";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../toggle-mode";
import SearchInput from "../search-input";
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Categories", href: "#categories" },
  { name: "Contact", href: "#contact" },
  { name: "Articles", href: "/articles" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <Image
              src={TechChautari}
              alt="TechChautari Logo"
              width={138}
              height={42}
              priority
              className="dark:invert"
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          <nav className="hidden lg:flex  items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-700 transition hover:text-blue-600 dark:text-zinc-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 justify-end ml-4">
            <SearchInput />
            <ModeToggle />

            <Show when="signed-in">
              <UserButton />
              <SignOutButton>
                <Button
                  variant="ghost"
                  className="
                  border border-zinc-300 dark:border-zinc-700
                  bg-white dark:bg-zinc-900
                  text-zinc-700 dark:text-zinc-200
                  hover:bg-zinc-100 dark:hover:bg-zinc-800
                  hover:text-zinc-900 dark:hover:text-white
                "
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </Show>
            <Show when="signed-out">
              <SignInButton>
                <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white dark:text-zinc-200  dark:hover:bg-blue-700 dark:cursor-pointer px-3">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant={"ghost"}
                  className="border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer px-3"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>
          </div>

          <div className="lg:hidden flex items-center justify-between w-full  gap-3">
            <div className="flex-2">
              <SearchInput />
            </div>

            <div className="flex items-center gap-2">
              <ModeToggle />

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className=" text-zinc-800 dark:text-white"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <Show when="signed-in">
              <div className=" gap-5 flex items-center">
                <UserButton />

                <SignOutButton>
                  <Button
                    variant={"outline"}
                    className="dark:bg-zinc-100 text-black dark:hover:bg-white dark:border-zinc-700 dark:text-zinc-900 dark:hover:text-zinc-700"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </div>
            </Show>
            <Show when="signed-out">
              <SignInButton>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:cursor-pointer dark:hover:bg-blue-700 h-10">
                  Sign In
                </Button>
              </SignInButton>

              <SignUpButton>
                <Button
                  variant={"ghost"}
                  className="w-full  border border-zinc-300 dark:border-zinc-700 h-10 text-zinc-600 dark:text-zinc-300 hover:bg-gray-200 hover:text-black "
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
