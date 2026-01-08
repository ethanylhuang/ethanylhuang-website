import { compile, run } from "@mdx-js/mdx";
import { cache, type JSX } from "react";
import * as runtime from "react/jsx-runtime";

type MdxModule = {
  default: (props: { components?: Record<string, unknown> }) => JSX.Element;
};

type Props = {
  source: string;
  components?: Record<string, unknown>;
};

const compileMdx = cache(async (source: string) => {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: false,
    useDynamicImport: true,
    baseUrl: "/Users/ethanhuang/ethanylhuang-website/app/components",
  });

  const { default: Content } = (await run(compiled, runtime)) as MdxModule;

  return Content;
});

export async function MdxContent({ source, components }: Props) {
  const Content = await compileMdx(source);
  return <Content components={components} />;
}
