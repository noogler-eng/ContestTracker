export default function Button({
  variant = "primary",
  text,
  onClick,
}: {
  variant: "primary" | "secondary";
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`
    ${
      variant == "primary"
        ? "text-white bg-red-500 px-2 py-3 text-sm rounded-sm font-semibold min-w-40"
        : "text-white bg-zinc-800 px-2 py-3 text-sm rounded-sm font-semibold min-w-40 border"
    }
    
    `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
