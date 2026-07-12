import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { getAllSlugs, getRecord } from "@/lib/records";
import { getAllUsers, validateRecordMembers } from "@/lib/users";
import { Avatar } from "@/components/Avatar";
import { Thumbnail } from "@/components/Thumbnail";
import { Breadcrumb } from "@/components/Breadcrumb";

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
      <Breadcrumb
        items={[
          { label: "Top", href: "/" },
          { label: "山行記録", href: "/records" },
          { label: meta.title },
        ]}
      />
      <header className="not-prose mb-8">
        <Thumbnail
          src={meta.thumbnail}
          alt={meta.title}
          aspect="16/9"
          className="mb-6"
        />
        <span className="inline-block w-fit rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
          {meta.genre}
        </span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{meta.title}</h1>
        <p className="mt-1 text-sm text-zinc-500">
          {meta.date} ・ {meta.area}
        </p>
        <ul className="mt-4 flex flex-col gap-3">
          {meta.members.map((member) => (
            <li key={member}>
              <Link
                href={`/users/${member}`}
                className="flex items-center gap-3 rounded-lg border border-black/10 p-3 text-lg font-medium transition-shadow hover:shadow-md dark:border-white/10"
              >
                <Avatar
                  src={userMap.get(member)?.icon}
                  name={userMap.get(member)?.name ?? member}
                  size={40}
                />
                {userMap.get(member)?.name ?? member}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <MDXRemote source={content} />
    </article>
  );
}
