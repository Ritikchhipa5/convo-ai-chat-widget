"use client";

import { IMAGES } from "@/assets";

import MenuItem from "@/components/sidebar/menu-item";
import {
  Sidebar,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SIDE_BAR_MENU } from "@/constants/menu";
import useAppSidebar from "@/hooks/sidebar/use-app-sidebar";
import { LogOut } from "lucide-react";
import Image from "next/image";

type Props = {
  domains:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | null
    | undefined;
};

export default function AppSidebar() {
  const { onSignOut } = useAppSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      {/* HEADER */}
      <SidebarHeader>
        <div
          className="
            flex items-center gap-2 px-2
            group-data-[collapsible=icon]:justify-center
            group-data-[collapsible=icon]:px-0
          "
        >
          <Image
            className="rounded-md"
            width={32}
            height={32}
            alt="logo"
            src={IMAGES.LOGO.src}
          />

          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
            Conovo AI
          </span>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        {/* // Menu */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {SIDE_BAR_MENU.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarMenu>
            <MenuItem
              icon={LogOut}
              label="Log out"
              path="/"
              onClick={onSignOut}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
