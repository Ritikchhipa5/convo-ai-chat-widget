import {
  Building2,
  LayoutDashboard,
  LucideIcon,
  MessageCircleDashed,
  Settings,
} from "lucide-react";

export type SIDE_BAR_MENU_PROPS = {
  path: string;
  label: string;
  icon: LucideIcon;
};
export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Conversations",
    path: "/conversations",
    icon: MessageCircleDashed,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    label: "Domains",
    path: "/domains",
    icon: Building2,
  },
];

type TABS_MENU_PROPS = {
  label: string;
  icon?: LucideIcon;
};

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "unread",
    icon: LayoutDashboard,
  },
  {
    label: "all",
    icon: LayoutDashboard,
  },
  {
    label: "expired",
    icon: LayoutDashboard,
  },
  {
    label: "starred",
    icon: LayoutDashboard,
  },
];

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "help desk",
  },
  {
    label: "questions",
  },
];

export const APPOINTMENT_TABLE_HEADER = [
  "Name",
  "Requested Time",
  "Added Time",
  "Domain",
];

export const EMAIL_MARKETING_HEADER = ["Id", "Email", "Answers", "Domain"];

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: "chat",
    icon: LayoutDashboard,
  },
  {
    label: "helpdesk",
    icon: LayoutDashboard,
  },
  {
    label: "expired",
    icon: LayoutDashboard,
  },
  {
    label: "starred",
    icon: LayoutDashboard,
  },
];
