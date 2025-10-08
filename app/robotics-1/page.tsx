import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, getPosts } from "../../lib/content";

const SLUG = "robotics-1";

export const metadata: Metadata = {
  title: "Robotics 1",
  description:
    "Class journal from Robotics 1 – weekly labs, debugging sessions, and takeaways.",
};

export default function RoboticsSection() {
  const posts = getPosts(SLUG);

  return (
    <section>
      <h1 className="text-6xl font-semibold tracking-tight mb-6">Robotics 1</h1>
      <p className="text-xl text-slate-200 max-w-prose mb-10">
        Intro Robotics class offered by my high school. Class projects, plus FRC
        team activites.
      </p>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col">
            <Link
              href={`/${SLUG}/${post.slug}`}
              className="text-2xl font-semibold transition-colors hover:text-white"
            >
              {post.metadata.title}
            </Link>
            <div className="text-base text-slate-300">
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
          <p className="text-lg text-slate-300">
            No entries yet. Add an MDX file inside <code>content/{SLUG}</code>{" "}
            to get started.
          </p>
        )}
      </div>
    </section>
  );
}
