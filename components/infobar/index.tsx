"use client";

import BreadCrumb from "@/components/infobar/bread-crumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const InfoBar = () => {
  return (
    <div className="flex mb-8 justify-between items-center">
      <div className="flex gap-2 items-center">
        <SidebarTrigger />
        <BreadCrumb />
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default InfoBar;
