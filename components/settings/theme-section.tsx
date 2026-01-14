"use client";

import { SectionLabel } from "@/components/section-label";
import { Palette } from "lucide-react";
import { ThemeCard } from "@/components/settings/theme-card";
import { useTheme } from "next-themes";

export function ThemeSection() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <SectionLabel
        icon={Palette}
        label="Interface Theme"
        description="Select or customize your UI theme."
      />

      <div className="grid md:grid-cols-3   p-4 sm:grid-cols-2 gap-4">
        <ThemeCard
          value="light"
          label="Light"
          preview="light"
          selected={theme === "light"}
          onSelect={setTheme}
        />

        <ThemeCard
          value="dark"
          label="Dark"
          preview="dark"
          selected={theme === "dark"}
          onSelect={setTheme}
        />

        <ThemeCard
          value="system"
          label="System"
          preview="system"
          selected={theme === "system"}
          onSelect={setTheme}
        />
      </div>
    </div>
  );
}
