"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SIDE_BAR_MENU_PROPS } from "@/constants/menu";
import { useSidebar } from "@/components/ui/sidebar";

interface Props extends SIDE_BAR_MENU_PROPS {
  onClick?: () => void;
}

export default function MenuItem({ label, path, icon, onClick }: Props) {
  const { open } = useSidebar();
  const pathname = usePathname();
  const Icon = icon;

  const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <a
      href={path}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 rounded-lg transition-all",
        "hover:bg-white dark:hover:bg-black",
        open ? "px-2 py-1.5 justify-start" : "h-9 w-9 mx-auto justify-center",
        isActive && "bg-white dark:bg-black  text-amber-500 dark:text-amber-400"
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          "flex items-center justify-center rounded-md",
          open ? "h-7 w-7 bg-muted" : "h-8 w-8 bg-transparent",
          isActive && !open && "bg-white text-amber-500"
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>

      {/* Label */}
      {open && <span className="truncate text-sm font-medium">{label}</span>}
    </a>
  );
}
