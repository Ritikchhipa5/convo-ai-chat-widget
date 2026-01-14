"use client";

import { cn } from "@/lib/utils";

type Theme = "light" | "system" | "dark";

type ThemeCardProps = {
  value: Theme;
  label: string;
  preview: Theme;
  selected: boolean;
  onSelect: (value: Theme) => void;
};

export function ThemeCard({
  value,
  label,
  preview,
  selected,
  onSelect,
}: ThemeCardProps) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={cn(
        "group relative h-32 rounded-xl border transition-all overflow-hidden",
        "hover:border-amber-400",
        selected ? "border-amber-400 ring-2 ring-amber-400" : "border-border"
      )}
    >
      {/* Preview */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg p-3",
          preview === "light" && "bg-white",
          preview === "dark" && "bg-neutral-900",
          preview === "system" &&
            "bg-linear-to-r from-white via-transparent to-neutral-900"
        )}
      >
        {/* Window dots */}
        <div className="mb-2 flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>

        {/* Fake content */}
        <div className="space-y-2">
          <div
            className={cn(
              "h-2 w-2/3 rounded",
              preview === "dark" ? "bg-white/20" : "bg-black/10"
            )}
          />
          <div
            className={cn(
              "h-2 w-1/2 rounded",
              preview === "dark" ? "bg-white/20" : "bg-black/10"
            )}
          />
          <div
            className={cn(
              "h-2 w-full rounded",
              preview === "dark" ? "bg-white/20" : "bg-black/10"
            )}
          />
        </div>
      </div>

      {/* Label */}
      <div className="relative z-10 flex h-full items-end justify-center pb-3">
        <span
          className={cn(
            "text-sm font-medium",
            preview === "dark" ? "text-white" : "text-foreground"
          )}
        >
          {label}
        </span>
      </div>

      {/* Active glow */}
      {selected && (
        <div className="absolute inset-0 rounded-xl bg-amber-400/10 blur-xl" />
      )}
    </button>
  );
}
