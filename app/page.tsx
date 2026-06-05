import Link from "next/link";
import { formatDate, getBlogs, getPosts } from "../lib/content";

export default function HomePage() {
  const blogs = getBlogs();
  const entries = blogs.flatMap((blog) =>
    getPosts(blog.slug).map((post) => ({
      blog,
      post,
    })),
  );

  const recentEntries = entries.sort((a, b) => {
    const dateA = a.post.metadata.publishedAt
      ? new Date(a.post.metadata.publishedAt).getTime()
      : 0;
    const dateB = b.post.metadata.publishedAt
      ? new Date(b.post.metadata.publishedAt).getTime()
      : 0;
    return dateB - dateA;
  });

  return (
    <section>
      <h1 className="mb-8 text-5xl font-semibold tracking-tight">
        Ethan Huang
      </h1>
      <p className="text-xl text-slate-200">
        I'm Ethan, a high school student from the Bay Area. I like solving
        useful problems and engrossing myself in many engineering disciplines in
        the process. Thanks for visiting my site, check out some of my projects!
      </p>
      <div className="my-8 space-y-3">
        <h2 className="font-bold">Recent</h2>
        <ul className="space-y-3">
          {recentEntries.length === 0 ? (
            <li className="text-slate-300 text-lg">
              No entries yet. Add an MDX file inside{" "}
              <code>content/&lt;section&gt;</code>
              to get started.
            </li>
          ) : (
            recentEntries.map(({ blog, post }) => (
              <li key={`${blog.slug}-${post.slug}`} className="flex flex-col">
                <Link
                  href={`/${blog.slug}/${post.slug}`}
                  className="text-xl font-medium transition-all hover:text-white"
                >
                  {post.metadata.title}
                </Link>
                <div className="text-base text-slate-300">
                  <span>{blog.title}</span>
                  {post.metadata.publishedAt && <span className="mx-2">·</span>}
                  {post.metadata.publishedAt && (
                    <span>{formatDate(post.metadata.publishedAt)}</span>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
