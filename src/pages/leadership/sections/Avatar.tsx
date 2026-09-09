export default function Avatar({ initials, gradient, size = "lg" }: { initials: string; gradient: string; size?: "lg" | "md" | "sm" }) {
  const sizes = {
    lg: "w-28 h-28 text-3xl",
    md: "w-20 h-20 text-xl",
    sm: "w-16 h-16 text-lg",
  };
  return (
    <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 font-display font-bold text-white shadow-lg`}>
      {initials}
    </div>
  );
}
