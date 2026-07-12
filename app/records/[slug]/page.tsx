import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllSlugs, getRecord } from "@/lib/records";
import { getAllUsers, validateRecordMembers } from "@/lib/users";
import { Avatar } from "@/components/Avatar";
import { Thumbnail } from "@/components/Thumbnail";

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
  const userMap = new Map(users.map((user) => [user.slug, user]));

  return (
    <article className="prose mx-auto max-w-2xl px-6 py-16 dark:prose-invert">
      <header className="not-prose mb-8">
        <Thumbnail src={meta.thumbnail} alt={meta.title} className="mb-6" />
        <p className="text-sm text-zinc-500">
          {meta.date} ・ {meta.area} ・ {meta.genre}
        </p>
        <h1 className="text-3xl font-semibold">{meta.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {meta.members.map((member) => (
            <Link
              key={member}
              href={`/users/${member}`}
              className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <Avatar
                src={userMap.get(member)?.icon}
                name={userMap.get(member)?.name ?? member}
                size={24}
              />
              {userMap.get(member)?.name ?? member}
            </Link>
          ))}
        </div>
      </header>
      <MDXRemote source={content} />
    </article>
  );
}
