// "use client";

// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";

// const SearchInput = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const query = formData.get("search")?.toString().trim() || "";

//     router.push(
//       query
//         ? `/articles?search=${encodeURIComponent(query)}&page=1`
//         : `/articles`
//     );
//   };

//   return (
//     <form onSubmit={handleSearch}>
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

//         <Input
//           type="search"
//           name="search"
//           defaultValue={searchParams.get("search") || ""}
//           placeholder="Search here..."
//           className="pl-10"
//         />
//       </div>
//     </form>
//   );
// };

// export default SearchInput;
"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = value.trim();

    router.push(
      query
        ? `/articles?search=${encodeURIComponent(query)}&page=1`
        : `/articles`
    );
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <Input
          type="search"
          name="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search here..."
          className="pl-10"
        />
      </div>
    </form>
  );
};

export default SearchInput;