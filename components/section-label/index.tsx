import * as React from "react";
import { cn } from "@/lib/utils";
import { Lock, LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  description?: string;
};

export function SectionLabel({ icon, label, description }: Props) {
  const Icon = icon;
  return (
    <div className={cn("space-y-1")}>
      <h3 className="text-base font-semibold text-foreground flex flex-col gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>

        {label}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xl">{description}</p>
      )}
    </div>
  );
}
