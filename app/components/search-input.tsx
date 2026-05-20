"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString() || "";

    if (query) {
      router.push(`/articles?search=${encodeURIComponent(query)}`);
    } else {
      router.push(`/articles`)
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />
        <Input
          type="search"
          name="query"
          defaultValue={searchParams.get("search") || ""}
          placeholder="Search here..."
          className="w-full md:w-56 rounded-lg bg-zinc-100 border-zinc-200 focus:border-blue-500 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 pl-10 border-none focus-visible:ring-1"
        />
      </div>
    </form>
  );
};

export default SearchInput;