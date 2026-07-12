import Link from "next/link";
import { getAllUsers } from "@/lib/users";
import { Avatar } from "@/components/Avatar";
import { Breadcrumb } from "@/components/Breadcrumb";

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumb items={[{ label: "Top", href: "/" }, { label: "メンバー" }]} />
      <h1 className="text-3xl font-bold tracking-tight">メンバー</h1>
      <ul className="mt-8 flex flex-col gap-3">
        {users.map((user) => (
          <li key={user.slug}>
            <Link
              href={`/users/${user.slug}`}
              className="flex items-center gap-3 rounded-lg border border-black/10 p-3 text-lg font-medium transition-shadow hover:shadow-md dark:border-white/10"
            >
              <Avatar src={user.icon} name={user.name} size={40} />
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
