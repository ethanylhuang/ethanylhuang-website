import fs from "fs";
import path from "path";

export type Blog = {
  slug: string;
  title: string;
  description?: string;
};

export type BlogPostMetadata = {
  title: string;
  summary?: string;
  publishedAt?: string;
};

export type BlogPost = {
  slug: string;
  metadata: BlogPostMetadata;
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function titleCase(slug: string) {
  return slug
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {}, content: fileContent.trim() };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const metadata: Record<string, string> = {};
  const frontMatterLines = frontMatterBlock.trim().split("\n");

  frontMatterLines.forEach((line) => {
    const [rawKey, ...rest] = line.split(":");
    if (!rawKey) return;
    const key = rawKey.trim();
    const value = rest
      .join(":")
      .trim()
      .replace(/^['"]|['"]$/g, "");
    metadata[key] = value;
  });

  return { metadata, content };
}

function getDirectories(root: string) {
  if (!fs.existsSync(root)) {
    return [];
  }

  return fs.readdirSync(root).filter((entry) => {
    const fullPath = path.join(root, entry);
    return fs.statSync(fullPath).isDirectory();
  });
}

function readSectionMeta(blogSlug: string) {
  const metaPath = path.join(CONTENT_ROOT, blogSlug, "section.json");

  if (!fs.existsSync(metaPath)) {
    return {} as { description?: string };
  }

  try {
    const raw = fs.readFileSync(metaPath, "utf-8");
    return JSON.parse(raw) as { description?: string };
  } catch (error) {
    console.warn(`Failed to parse metadata for section "${blogSlug}":`, error);
    return {} as { description?: string };
  }
}

export function getBlogs(): Blog[] {
  return getDirectories(CONTENT_ROOT)
    .map((slug) => {
      const meta = readSectionMeta(slug);

      return {
        slug,
        title: titleCase(slug) || slug,
        description: meta.description,
      } satisfies Blog;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

function getPostFiles(blogSlug: string) {
  const blogDir = path.join(CONTENT_ROOT, blogSlug);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  return fs
    .readdirSync(blogDir)
    .filter((file) => [".md", ".mdx"].includes(path.extname(file)));
}

export function getPosts(blogSlug: string | undefined): BlogPost[] {
  if (!blogSlug) {
    return [];
  }

  return getPostFiles(blogSlug)
    .map((file) => {
      const fullPath = path.join(CONTENT_ROOT, blogSlug, file);
      const rawContent = fs.readFileSync(fullPath, "utf-8");
      const { metadata, content } = parseFrontmatter(rawContent);
      const slug = path.basename(file, path.extname(file));

      return {
        slug,
        metadata: {
          title: metadata.title || titleCase(slug) || slug,
          summary: metadata.summary,
          publishedAt: metadata.publishedAt,
        },
        content,
      } satisfies BlogPost;
    })
    .sort((a, b) => {
      const dateA = a.metadata.publishedAt;
      const dateB = b.metadata.publishedAt;

      if (dateA && dateB) {
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      }

      if (dateA) return -1;
      if (dateB) return 1;

      return a.metadata.title.localeCompare(b.metadata.title);
    });
}

export function getPost(
  blogSlug: string | undefined,
  slug: string
): BlogPost | null {
  if (!blogSlug) {
    return null;
  }

  return getPosts(blogSlug).find((post) => post.slug === slug) || null;
}

export function formatDate(date?: string) {
  if (!date) return "";
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;

  const parsed = new Date(year, month - 1, day);
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
