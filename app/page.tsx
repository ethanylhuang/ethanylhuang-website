import Link from "next/link";
import Image from "next/image";
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
    <section className="space-y-14">
      <section className="grid gap-8 md:grid-cols-[minmax(0,1fr)_380px] md:items-center">
        <div className="space-y-5">
          <h1 className="text-5xl font-semibold tracking-tight">
            Ethan Huang
          </h1>
          <p className="text-xl leading-relaxed text-neutral-800">
            I'm Ethan, a high school student from the Bay Area. I like solving
            useful problems and engrossing myself in many engineering
            disciplines in the process.
          </p>
        </div>
        <Image
          src="/falcon-9-cropped.jpg"
          alt="Falcon 9 rocket under a night sky"
          width={1772}
          height={2392}
          priority
          className="mx-auto max-h-[680px] w-full max-w-[380px] rounded-sm object-contain"
        />
      </section>

      <section className="space-y-10">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Rocketry</h2>
          <p className="text-base leading-relaxed text-neutral-600">
            I started our school's rocket club, where we design, build, and
            launch high-powered model rockets. Some of the projects we have
            been working on include an actively controlled rocket using thrust
            vector control and a rocket that can surpass the speed of sound.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_280px] md:items-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">Robotics</h2>
            <p className="text-base leading-relaxed text-neutral-600">
              I am also part of our school's robotics team, with my
              responsibilities including CAD design, programming, CNC machining,
              and mechanical assembly and maintenance. This year, we made it
              all the way to the district championship, falling just short of
              Worlds. We learned a lot and are confident we have a good shot at
              Worlds next year.
            </p>
          </div>
          <Image
            src="/frc-robot-114.jpeg"
            alt="FRC team 114 robot"
            width={2837}
            height={1927}
            className="w-full rounded-sm object-cover"
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">Interests</h2>
          <p className="text-base leading-relaxed text-neutral-600">
            To relax, I watch movies and sometimes publish reviews on
            Letterboxd. One of my favorite movies is Blade Runner, and its
            themes happen to coincide well with recent developments in
            artificial intelligence. I also play the violin for fun and read
            lots of science fiction, with Asimov being my favorite author.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">Recent</h2>
        <ul className="space-y-3">
          {recentEntries.length === 0 ? (
            <li className="text-neutral-600 text-lg">
              No entries yet. Add an MDX file inside{" "}
              <code>content/&lt;section&gt;</code>
              to get started.
            </li>
          ) : (
            recentEntries.map(({ blog, post }) => (
              <li key={`${blog.slug}-${post.slug}`} className="flex flex-col">
                <Link
                  href={`/${blog.slug}/${post.slug}`}
                  className="text-xl font-medium transition-all hover:text-black"
                >
                  {post.metadata.title}
                </Link>
                <div className="text-base text-neutral-600">
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
      </section>
    </section>
  );
}
