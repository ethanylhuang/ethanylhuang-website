import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MdxContent } from "../../../components/mdx";
import {
  formatDate,
  getBlogs,
  getPost,
  getPosts,
} from "../../../../lib/content";
import { BlogImage, BlogVideo } from "../../../components/blog-image";

type Params = {
  blog: string;
  slug: string;
};

export function generateStaticParams() {
  return getBlogs().flatMap((blog) =>
    getPosts(blog.slug).map((post) => ({
      blog: blog.slug,
      slug: post.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { blog, slug } = await params;
  const post = getPost(blog, slug);

  if (!post) {
    return {
      title: "Entry not found",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  const { blog, slug } = await params;
  const post = getPost(blog, slug);

  if (!post) {
    notFound();
  }

  const entry = post;
  const mdxComponents = { BlogImage, BlogVideo };

  return (
    <article className="prose">
      <header>
        <h1 className="title font-semibold text-6xl tracking-tight">
          {entry.metadata.title}
        </h1>
        {entry.metadata.publishedAt && (
          <p className="text-lg text-neutral-600">
            {formatDate(entry.metadata.publishedAt)}
          </p>
        )}
      </header>
      <MdxContent source={entry.content} components={mdxComponents} />
    </article>
  );
}
