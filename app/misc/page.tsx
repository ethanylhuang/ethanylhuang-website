import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, getPosts } from "../../lib/content";

const SLUG = "misc";

export const metadata: Metadata = {
  title: "Misc",
  description: "Ongoing builds, experiments, and write-ups from the lab.",
};

export default function ProjectsSection() {
  const posts = getPosts(SLUG);

  return (
    <section>
      <h1 className="text-6xl font-semibold tracking-tight mb-6">Misc</h1>
      <p className="text-xl text-neutral-800 max-w-prose mb-10">
        miscellaneous (adj.) - (of items or people gathered or considered
        together) of various types or from different sources.
      </p>
      <p className="text-xl text-neutral-800 max-w-prose mb-10">
        Basically, random (cool) stuff!
      </p>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col">
            <Link
              href={`/${SLUG}/${post.slug}`}
              className="text-2xl font-semibold transition-colors hover:text-black"
            >
              {post.metadata.title}
            </Link>
            <div className="text-base text-neutral-600">
              {post.metadata.publishedAt && (
                <span>{formatDate(post.metadata.publishedAt)}</span>
              )}
              {post.metadata.summary && (
                <span className="ml-3">{post.metadata.summary}</span>
              )}
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-lg text-neutral-600">
            No entries yet. Add an MDX file inside <code>content/{SLUG}</code>{" "}
            to get started.
          </p>
        )}
      </div>
    </section>
  );
}
