import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { getAllRecords } from "./records";

const USERS_DIR = path.join(process.cwd(), "contents", "users");

export type UserFrontmatter = {
  name: string;
  icon?: string;
};

export type UserMeta = UserFrontmatter & { slug: string };

async function readUserFile(slug: string) {
  const filePath = path.join(USERS_DIR, `${slug}.mdx`);
  const fileSource = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(fileSource);
  const meta: UserMeta = { ...(data as UserFrontmatter), slug };
  return { meta, content };
}

export async function getAllUserSlugs(): Promise<string[]> {
  const files = await fs.readdir(USERS_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllUsers(): Promise<UserMeta[]> {
  const slugs = await getAllUserSlugs();
  const users = await Promise.all(
    slugs.map(async (slug) => (await readUserFile(slug)).meta)
  );
  return users.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getUser(slug: string) {
  try {
    return await readUserFile(slug);
  } catch {
    return null;
  }
}

export async function validateRecordMembers(): Promise<void> {
  const [records, userSlugs] = await Promise.all([
    getAllRecords(),
    getAllUserSlugs(),
  ]);
  const userSlugSet = new Set(userSlugs);
  for (const record of records) {
    for (const member of record.members) {
      if (!userSlugSet.has(member)) {
        throw new Error(
          `記録 "${record.slug}" が存在しないユーザー "${member}" を参照しています`
        );
      }
    }
  }
}
