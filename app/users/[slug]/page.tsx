import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllUserSlugs, getUser } from "@/lib/users";
import { getRecordsByMember, getGenreCounts } from "@/lib/records";
import { Avatar } from "@/components/Avatar";
import { Thumbnail } from "@/components/Thumbnail";
import { Breadcrumb } from "@/components/Breadcrumb";

export async function generateStaticParams() {
  const slugs = await getAllUserSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getUser(slug);

  if (!user) {
    notFound();
  }

  const { meta } = user;
  const records = await getRecordsByMember(slug);
  const genreCounts = getGenreCounts(records);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumb
        items={[
          { label: "Top", href: "/" },
          { label: "メンバー", href: "/users" },
          { label: meta.name },
        ]}
      />
      <div className="flex items-center gap-4">
        <Avatar src={meta.icon} name={meta.name} size={64} />
        <h1 className="text-3xl font-bold tracking-tight">{meta.name}</h1>
      </div>

      <h2 className="mt-10 text-sm font-semibold tracking-wide text-zinc-500 uppercase">
        ジャンル別参加回数
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {Object.entries(genreCounts).map(([genre, count]) => (
          <li
            key={genre}
            className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-400"
          >
            {genre} <span className="font-semibold text-accent">{count}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-sm font-semibold tracking-wide text-zinc-500 uppercase">
        参加した山行記録
      </h2>
      <ul className="mt-3 flex flex-col gap-3">
        {records.map((record) => (
          <li key={record.slug}>
            <Link
              href={`/records/${record.slug}`}
              className="flex gap-4 rounded-lg border border-black/10 p-3 transition-shadow hover:shadow-md dark:border-white/10"
            >
              <div className="w-20 shrink-0">
                <Thumbnail src={record.thumbnail} alt={record.title} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm text-zinc-500">
                  {record.date} ・ {record.genre}
                </p>
                <p className="text-lg font-semibold">{record.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
