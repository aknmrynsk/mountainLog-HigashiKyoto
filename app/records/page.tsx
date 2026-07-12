import Link from "next/link";
import { getAllRecords } from "@/lib/records";
import { Thumbnail } from "@/components/Thumbnail";

export default async function RecordsPage() {
  const records = await getAllRecords();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">山行記録</h1>
      <ul className="mt-8 flex flex-col gap-6">
        {records.map((record) => (
          <li key={record.slug} className="border-b border-black/10 pb-6 dark:border-white/10">
            <Link href={`/records/${record.slug}`} className="flex gap-4">
              <div className="w-24 shrink-0">
                <Thumbnail src={record.thumbnail} alt={record.title} />
              </div>
              <div>
                <p className="text-sm text-zinc-500">
                  {record.date} ・ {record.area}
                </p>
                <h2 className="text-xl font-medium">{record.title}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
