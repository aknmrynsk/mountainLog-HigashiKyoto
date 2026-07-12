import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import matter from "gray-matter";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "contents", `${slug}.mdx`);

  let source: string;
  try {
    const fileSource = await fs.readFile(filePath, "utf-8");
    const { data, content } = matter(fileSource);
    source = content;
  } catch {
    notFound();
  }

  return (
    <article className="prose">
      <MDXRemote
        source={source}
        // options={{
        //   parseFrontmatter: true,
        // }}
      />
    </article>
  );
}
