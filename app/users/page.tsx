import Link from "next/link";
import { getAllUsers } from "@/lib/users";
import { Avatar } from "@/components/Avatar";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">メンバー</h1>
      <ul className="mt-8 flex flex-col gap-4">
        {users.map((user) => (
          <li key={user.slug} className="border-b border-black/10 pb-4 dark:border-white/10">
            <Link href={`/users/${user.slug}`} className="flex items-center gap-3 text-lg font-medium">
              <Avatar src={user.icon} name={user.name} size={40} />
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
