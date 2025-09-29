import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Ethan Huang
      </h1>
      <p className="mb-4">{`I'm Ethan, a high school student in the Bay Area into robotics. Hear are some of my projects`}</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
