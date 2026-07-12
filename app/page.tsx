import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm text-zinc-500">Higashi-Kyoto alpine</p>
      <h1 className="mt-2 text-3xl font-semibold">山行記録</h1>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        登山・山スキーなどの山行記録を残していくログです。
      </p>
      <div className="mt-8 flex gap-4 text-base font-medium">
        <Link
          href="/records"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          記録一覧を見る
        </Link>
        <Link
          href="/users"
          className="flex h-12 items-center justify-center rounded-full border border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          メンバー
        </Link>
        <Link
          href="/about"
          className="flex h-12 items-center justify-center rounded-full border border-black/[.08] px-6 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          About
        </Link>
      </div>
    </div>
  );
}
