import fs from "fs";
import path from "path";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getBlogs, getPosts } from "../../../lib/content";

function hasCustomSection(slug: string) {
  const customPagePath = path.join(process.cwd(), "app", slug, "page.tsx");
  return fs.existsSync(customPagePath);
}

type Params = {
  blog: string;
};

export function generateStaticParams() {
  return getBlogs()
    .filter((blog) => !hasCustomSection(blog.slug))
    .map((blog) => ({ blog: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { blog } = await params;
  const data = getBlogs().find((item) => item.slug === blog);

  if (!data) {
    return {
      title: "Section not found",
    };
  }

  return {
    title: data.title,
    description: data.description || `Entries for ${data.title}`,
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<Params>;
}) {
  const { blog } = await params;
  const data = getBlogs().find((item) => item.slug === blog);

  if (!data) {
    notFound();
  }

  const section = data;
  const posts = getPosts(section.slug);

  return (
    <section>
      <h1 className="font-semibold text-5xl mb-8 tracking-tight">
        {section.title}
      </h1>
      {section.description && (
        <p className="mb-6 text-xl text-neutral-800">
          {section.description}
        </p>
      )}
      {posts.length === 0 ? (
        <p className="text-lg text-neutral-600">
          Drop an MDX file into the matching folder to start this section.
        </p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="flex flex-col space-y-1">
              <Link
                href={`/${section.slug}/${post.slug}`}
                className="text-2xl font-semibold transition-all hover:text-black"
              >
                {post.metadata.title}
              </Link>
              <div className="flex items-center space-x-3 text-base text-neutral-600">
                {post.metadata.publishedAt && (
                  <span>{formatDate(post.metadata.publishedAt)}</span>
                )}
                {post.metadata.summary && (
                  <span className="text-neutral-500">
                    {post.metadata.summary}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
