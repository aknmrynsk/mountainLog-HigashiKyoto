import Image from "next/image";

const ASPECT_CLASSES = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
} as const;

export function Thumbnail({
  src,
  alt,
  aspect = "4/3",
  className = "",
}: {
  src?: string;
  alt: string;
  aspect?: keyof typeof ASPECT_CLASSES;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 ${ASPECT_CLASSES[aspect]} ${className}`}
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
