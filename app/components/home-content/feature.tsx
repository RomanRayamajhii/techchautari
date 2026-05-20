import { BarChart3, Database, FileText, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Database-backed posts",
    description: "Create posts through the dashboard and store them with Prisma.",
    icon: Database,
  },
  {
    title: "Readable blog pages",
    description: "Clean cards, article detail pages, and a focused reading layout.",
    icon: FileText,
  },
  {
    title: "Simple dashboard",
    description: "Quick stats and recent articles make content management easier.",
    icon: BarChart3,
  },
  {
    title: "Helpful fallbacks",
    description: "Sample posts keep the website usable while the database is offline.",
    icon: ShieldCheck,
  },
];

export default function Feature() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Website features
        </p>
        <h2 className="mt-3 text-3xl font-bold text-zinc-950 dark:text-white">
          Everything needed for a complete community blog.
        </h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <Icon className="h-6 w-6 text-blue-600" />
              <h3 className="mt-5 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
