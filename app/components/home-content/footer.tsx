import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-bold">TechChautari</h2>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            A community website for developers to publish, learn, and solve real-world technology problems together.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm text-zinc-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link href="/dashboard/create-post" className="hover:text-white">Write</Link>
        </nav>
      </div>

      <div className="mx-auto mt-8 max-w-6xl border-t border-zinc-800 pt-6 text-sm text-zinc-500">
        © 2026 TechChautari. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
