import AppSidebar from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppAuthProvider } from "@/context/app-auth-provider";
import { ChatProvider } from "@/context/use-chat-context";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

async function OwnerLayout({ children }: Props) {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get("accessToken")?.value;
  if (!authenticated) return null;

  return (
    <AppAuthProvider>
      <SidebarProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ChatProvider>
            <AppSidebar />
            <SidebarInset className="flex h-screen  w-full overflow-scroll p-4 rounded-2xl">
              {children}
            </SidebarInset>
          </ChatProvider>
        </ThemeProvider>
      </SidebarProvider>
    </AppAuthProvider>
  );
}

export default OwnerLayout;
