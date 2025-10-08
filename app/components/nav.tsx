import Link from "next/link";
import { getBlogs } from "../../lib/content";

export function Navbar() {
  const blogs = getBlogs();

  const navItems = [
    {
      href: "/",
      label: "home",
    },
    ...blogs.map((blog) => ({
      href: `/${blog.slug}`,
      label: blog.title,
    })),
  ];

  return (
    <nav className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative">
      <div className="flex flex-row space-x-0 pr-10">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-slate-100 transition-all hover:text-white flex align-middle relative py-2 px-3 mr-1 text-lg capitalize font-semibold first:pl-0 first:ml-0"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
