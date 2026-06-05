"use client";

import { usePathname } from "next/navigation";

function buildDisplayPath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/ home";
  }

  const directories = segments.length > 1 ? segments.slice(0, -1) : segments;
  const fileLabel =
    segments.length === 1
      ? "README.md"
      : `${segments[segments.length - 1]}.mdx`;

  const parts = ["home", ...directories];

  if (fileLabel) {
    parts.push(fileLabel);
  }

  return `/ ${parts.join(" / ")}`;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const displayPath = buildDisplayPath(pathname ?? "/");

  return (
    <div className="flex flex-col space-y-1 text-sm font-mono text-neutral-400 dark:text-neutral-400">
      <span className="tracking-wide">{displayPath}</span>
    </div>
  );
}
