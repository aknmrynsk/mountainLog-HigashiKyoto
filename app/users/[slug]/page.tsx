import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllUserSlugs, getUser } from "@/lib/users";
import { getRecordsByMember, getGenreCounts } from "@/lib/records";

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
      <h1 className="text-3xl font-semibold">{meta.name}</h1>

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
            <Link href={`/records/${record.slug}`}>
              <p className="text-sm text-zinc-500">
                {record.date} ・ {record.genre}
              </p>
              <p className="text-lg font-medium">{record.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
