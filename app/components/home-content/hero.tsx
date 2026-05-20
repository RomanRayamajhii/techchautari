import { ArrowRight, PenLine, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TechVisual from "@/public/tech1.png";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-12">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
            <Users className="h-4 w-4" />
            Built for learners, builders, and tech writers
          </div>

          <h1 className="mt-6 max-w-4xl font-bold leading-tight text-zinc-950 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            TechChautari
            <span className="block text-blue-600">Share ideas. Build skills.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg  leading-8 text-zinc-600 dark:text-zinc-400">
            A practical community website where developers publish articles,
            explore categories, and turn everyday technical problems into useful
            learning for everyone.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row   ">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Blogs <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard/articles/create-articles"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 font-semibold transition hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              <PenLine className="h-4 w-4" />
              Start Writing
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm">
            {["Articles", "Categories", "Dashboard"].map((item) => (
              <div key={item} className="rounded-lg border border-zinc-200 bg-white p-4 text-center font-semibold dark:border-zinc-800 dark:bg-zinc-900">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={TechVisual}
              alt="TechChautari technology community"
              className="mx-auto h-auto  dark:invert"
              priority
              loading="eager"
    
            />
            <div className="mt-8 space-y-4">
              {[
                "Publish long-form development notes",
                "Browse posts from the community",
                "Manage content from a simple dashboard",
              ].map((item) => (
                <div key={item} className="rounded-lg bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
