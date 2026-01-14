"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/assets";

interface DomainCardProps {
  name: string;
  description: string;
  enabled: boolean;
  icon?: string;
  onToggle?: (value: boolean) => void;
  onViewDomain?: () => void;
}

export function DomainCard({
  name,
  description,
  enabled,
  icon,
  onToggle,
  onViewDomain,
}: DomainCardProps) {
  return (
    <Card className="w-full py-0 rounded-xl shadow-none border bg-white">
      <CardContent className="p-4 space-y-4 ">
        {/* Top */}
        <div className="flex flex-col space-y-2">
          <Image
            alt=""
            width={100}
            height={100}
            src={icon || IMAGES.LOGO.src}
            className="h-10 w-10 rounded-lg border flex items-center justify-center"
          />

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>

            <Badge className="text-xs bg-green-500 ">Verified</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            {description}
          </p>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 text-muted-foreground"
            onClick={onViewDomain}
          >
            <Settings size={14} />
            View Domain
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {enabled ? "Enabled" : "Disabled"}
            </span>
            <Switch checked={enabled} onCheckedChange={onToggle} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
