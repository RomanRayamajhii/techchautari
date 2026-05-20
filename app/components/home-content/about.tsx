import { Lightbulb, MessageSquare, Rocket } from "lucide-react";

const highlights = [
  {
    title: "Share Ideas",
    description:
      "Publish tech ideas, lessons, and project notes for the community.",
    icon: Lightbulb,
  },
  {
    title: "Discuss Problems",
    description:
      "Turn real development challenges into clear, searchable knowledge.",
    icon: MessageSquare,
  },
  {
    title: "Learn and Grow",
    description:
      "Explore practical articles across web, AI, security, startups, and DevOps.",
    icon: Rocket,
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="border-y border-zinc-200 bg-white px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              About the platform
            </p>
            <h2 className="mt-3 text-4xl font-bold text-zinc-950 dark:text-white">
              A focused place for useful technology writing.
            </h2>
          </div>

          <div className="space-y-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            <p>
              TechChautari is a modern tech community platform where developers,
              students, creators, and tech enthusiasts come together to share
              ideas, discuss real-world problems, and explore innovations in
              technology.
            </p>

            <p>
              Our goal is to create a collaborative space where people can
              learn, publish articles, solve challenges, and grow together.
            </p>

            <p>
              Whether you&apos;re passionate about web development, AI,
              startups, cybersecurity, or emerging technologies, TechChautari
              provides a place to connect and contribute.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <Icon className="h-6 w-6 text-blue-600" />
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
