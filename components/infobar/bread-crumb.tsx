"use client ";

import Loader from "@/components/loader";
import { Switch } from "@/components/ui/switch";
import useAppSidebar from "@/hooks/sidebar/use-app-sidebar";

const BreadCrumb = () => {
  const { page, loading, chatRoom, realtime, onActivateRealtime } =
    useAppSidebar();
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-semibold capitalize">{page}</h2>
        {page === "conversation" && chatRoom && (
          <Loader loading={loading}>
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
            />
          </Loader>
        )}
      </div>
      <p className="text-muted-foreground text-xs max-w-md">
        {page == "settings"
          ? "Manage your account settings, preferences and integration"
          : page == "dashboard"
          ? "A detailed overview of your metrics, usage, customers and more"
          : page == "domains"
          ? "A detailed overview of your metrics, usage, customers and more"
          : page == "appointment"
          ? "View and edit all your appointment"
          : page == "email-marketing"
          ? "Send bulk emails to your customers"
          : page == "integration"
          ? "Connect third-party applications into Convo Ai"
          : "Modify domain settings, change chatbot options, enter sales questions and train your bot to do what you want it to."}
      </p>
    </div>
  );
};

export default BreadCrumb;
