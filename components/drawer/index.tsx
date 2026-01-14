import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode, useState } from "react";

type Props = {
  onOpen: ReactNode;
  title: string;
  description: string;
  children: (args: { closeDrawer: () => void }) => React.ReactNode;
};

function AppDrawer({ title, description, children, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{onOpen}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          {children({ closeDrawer })}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default AppDrawer;
