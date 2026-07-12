import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const CONTENTS_DIR = path.join(process.cwd(), "contents");

export const GENRES = ["登山", "山スキー", "クライミング", "沢登り"] as const;
export type Genre = (typeof GENRES)[number];

export type RecordFrontmatter = {
  title: string;
  date: string;
  area: string;
  genre: Genre;
  members: string[];
  gpx?: string;
};

export type RecordMeta = RecordFrontmatter & { slug: string };

function toDateString(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

async function readRecordFile(slug: string) {
  const filePath = path.join(CONTENTS_DIR, `${slug}.mdx`);
  const fileSource = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileSource);
  const meta: RecordMeta = {
    ...(data as RecordFrontmatter),
    date: toDateString(data.date),
    slug,
  };
  return { meta, content };
}

export async function getAllSlugs(): Promise<string[]> {
  const files = await fs.readdir(CONTENTS_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllRecords(): Promise<RecordMeta[]> {
  const slugs = await getAllSlugs();
  const records = await Promise.all(
    slugs.map(async (slug) => (await readRecordFile(slug)).meta)
  );
  return records.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getRecord(slug: string) {
  try {
    return await readRecordFile(slug);
  } catch {
    return null;
  }
}

export async function getRecordsByMember(userSlug: string): Promise<RecordMeta[]> {
  const records = await getAllRecords();
  return records.filter((record) => record.members.includes(userSlug));
}

export function getGenreCounts(records: RecordMeta[]): Record<Genre, number> {
  const counts = Object.fromEntries(
    GENRES.map((genre) => [genre, 0])
  ) as Record<Genre, number>;
  for (const record of records) {
    counts[record.genre] += 1;
  }
  return counts;
}
