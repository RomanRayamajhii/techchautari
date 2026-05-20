import Link from "next/link";

const categoriesItem = [
  {
    name: "Web Development",
    description: "Next.js, React, APIs, and UI engineering",
  },
  { 
    name:"UI/UX Design",
    description:"UI/UX Design principles, tools, and best practices"

  },
  {
    name: "AI / ML",
    description: "AI tools, model workflows, and learning notes",
  },
  {
    name: "Cybersecurity",
    description: "Security basics, habits, and application safety",
  },
  {
    name: "Startups",
    description: "MVPs, product thinking, and launch lessons",
  },
  {
    name: "Mobile Apps",
    description: "Native and cross-platform app development",
  },
  { name: "DevOps", description: "Deployment, infrastructure, and automation" },
  {
    name: "Programming Tips",
    description: "Cleaner code, debugging, and career growth",
  },
  {
    name: "Tech News",
    description: "Important updates explained for builders",
  },
];

const Categories = () => {
  return (
    <section id="categories" className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Browse topics
          </p>
          <h2 className="mt-3 text-3xl font-bold text-zinc-950 dark:text-white">
            Explore Categories
          </h2>
        </div>
        <Link
          href="/blog"
          className="font-semibold text-blue-600 hover:underline"
        >
          View all articles
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categoriesItem.map((item) => (
          <Link
            key={item.name}
            href={`/blog?category=${encodeURIComponent(item.name)}`}
            className="rounded-lg border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h3 className="font-semibold text-zinc-950 dark:text-white">
              {item.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
