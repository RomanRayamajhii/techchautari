import { Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <section id="contact" className="border-t border-zinc-200 bg-white px-6 py-24 dark:border-zinc-800 dark:bg-zinc-900/40">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold text-zinc-950 dark:text-white">
            Bring your questions, notes, and article ideas.
          </h2>
          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            TechChautari is built for practical collaboration. Reach out for
            feedback, topic suggestions, or community writing ideas.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="mailto:techchautari@gmail.com" className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-950">
            <Mail className="h-5 w-5 text-blue-600" />
            <h3 className="mt-4 font-semibold">Email</h3>
            <p className="mt-2 wrap-break-word text-sm text-zinc-600 dark:text-zinc-400">
              techchautari@gmail.com
            </p>
          </Link>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="mt-4 font-semibold">Community</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Nepal and global developers
            </p>
          </div>
          <Link href="/dashboard/create-post" className="rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-950">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <h3 className="mt-4 font-semibold">Contribute</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Publish a new article
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
