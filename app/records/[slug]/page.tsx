import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllSlugs, getRecord } from "@/lib/records";
import { getAllUsers, validateRecordMembers } from "@/lib/users";

export async function generateStaticParams() {
  await validateRecordMembers();
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = await getRecord(slug);

  if (!record) {
    notFound();
  }

  const { meta, content } = record;
  const users = await getAllUsers();
  const userNames = new Map(users.map((user) => [user.slug, user.name]));

  return (
    <article className="prose mx-auto max-w-2xl px-6 py-16 dark:prose-invert">
      <header className="not-prose mb-8">
        <p className="text-sm text-zinc-500">
          {meta.date} ・ {meta.area} ・ {meta.genre}
        </p>
        <h1 className="text-3xl font-semibold">{meta.title}</h1>
        <p className="mt-2 text-sm text-zinc-500">
          メンバー:{" "}
          {meta.members.map((member, index) => (
            <span key={member}>
              {index > 0 && ", "}
              <Link href={`/users/${member}`} className="underline">
                {userNames.get(member) ?? member}
              </Link>
            </span>
          ))}
        </p>
      </header>
      <MDXRemote source={content} />
    </article>
  );
}
