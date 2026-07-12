import Link from "next/link";
import { getAllRecords } from "@/lib/records";

export default async function RecordsPage() {
  const records = await getAllRecords();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">山行記録</h1>
      <ul className="mt-8 flex flex-col gap-6">
        {records.map((record) => (
          <li key={record.slug} className="border-b border-black/10 pb-6 dark:border-white/10">
            <Link href={`/records/${record.slug}`} className="block">
              <p className="text-sm text-zinc-500">
                {record.date} ・ {record.area}
              </p>
              <h2 className="text-xl font-medium">{record.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
