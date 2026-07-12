import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllUserSlugs, getUser } from "@/lib/users";
import { getRecordsByMember, getGenreCounts } from "@/lib/records";
import { Avatar } from "@/components/Avatar";
import { Thumbnail } from "@/components/Thumbnail";

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
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center gap-4">
        <Avatar src={meta.icon} name={meta.name} size={64} />
        <h1 className="text-3xl font-semibold">{meta.name}</h1>
      </div>

      <h2 className="mt-8 text-lg font-medium">ジャンル別参加回数</h2>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        {Object.entries(genreCounts).map(([genre, count]) => (
          <li key={genre} className="text-sm text-zinc-600 dark:text-zinc-400">
            {genre}: {count}件
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-medium">参加した山行記録</h2>
      <ul className="mt-4 flex flex-col gap-4">
        {records.map((record) => (
          <li
            key={record.slug}
            className="border-b border-black/10 pb-4 dark:border-white/10"
          >
            <Link href={`/records/${record.slug}`} className="flex gap-4">
              <div className="w-20 shrink-0">
                <Thumbnail src={record.thumbnail} alt={record.title} />
              </div>
              <div>
                <p className="text-sm text-zinc-500">
                  {record.date} ・ {record.genre}
                </p>
                <p className="text-lg font-medium">{record.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
