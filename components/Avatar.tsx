import Image from "next/image";

const COLORS = [
  "#f97316",
  "#0ea5e9",
  "#22c55e",
  "#a855f7",
  "#ef4444",
  "#14b8a6",
  "#eab308",
  "#ec4899",
];

function colorFor(seed: string) {
  let hash = 0;
  for (const char of seed) {
    hash = (hash * 31 + char.charCodeAt(0)) % COLORS.length;
  }
  return COLORS[hash];
}

export function Avatar({
  src,
  name,
  size = 32,
}: {
  src?: string;
  name: string;
  size?: number;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-medium text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: colorFor(name),
        fontSize: size * 0.45,
      }}
    >
      {name.slice(0, 1)}
    </span>
  );
}
