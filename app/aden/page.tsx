import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, getPosts } from "../../lib/content";

const SLUG = "aden";
const DESCRIPTION =
  "ADEN is a capstone course at Los Altos High School taken after AP Computer Science. This course is heavily project based and has allowed me to get hands-on with real programming projects. I have learned about more advanced data structures and algorithms like trees and HashMaps, implementing them in Java. In addition, this course has introduced me to embedded systems with TI-RSLK hardware, learning the basics of hardware IO, bitmasking and interrupts, dealing with real-world sensors and motors.";

export const metadata: Metadata = {
  title: "ADEN",
  description: DESCRIPTION,
};

export default function AdenSection() {
  const posts = getPosts(SLUG);

  return (
    <section>
      <h1 className="text-6xl font-semibold tracking-tight mb-6">ADEN</h1>
      <p className="text-base text-slate-300 max-w-prose mb-10">
        {DESCRIPTION}
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
