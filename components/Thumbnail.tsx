import Image from "next/image";

export function Thumbnail({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-4xl">
          🏔️
        </div>
      )}
    </div>
  );
}
