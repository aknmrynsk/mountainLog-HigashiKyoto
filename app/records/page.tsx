import Link from "next/link";
import { getAllRecords } from "@/lib/records";
import { Thumbnail } from "@/components/Thumbnail";
import { Breadcrumb } from "@/components/Breadcrumb";

export default async function RecordsPage() {
  const records = await getAllRecords();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumb items={[{ label: "Top", href: "/" }, { label: "山行記録" }]} />
      <h1 className="text-3xl font-bold tracking-tight">山行記録</h1>
      <ul className="mt-8 flex flex-col gap-4">
        {records.map((record) => (
          <li key={record.slug}>
            <Link
              href={`/records/${record.slug}`}
              className="flex gap-4 rounded-lg border border-black/10 p-3 transition-shadow hover:shadow-md dark:border-white/10"
            >
              <div className="w-28 shrink-0 sm:w-36">
                <Thumbnail src={record.thumbnail} alt={record.title} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="inline-block w-fit rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  {record.genre}
                </span>
                <h2 className="mt-1 text-lg font-semibold">{record.title}</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  {record.date} ・ {record.area}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
