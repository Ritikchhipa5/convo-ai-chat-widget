import InfoBar from "@/components/infobar";
import { BillingSettings } from "@/components/settings/billing-settings";
import PasswordSection from "@/components/settings/password-section";
import { ThemeSection } from "@/components/settings/theme-section";
import { Separator } from "@/components/ui/separator";

function SettingsPage() {
  return (
    <div>
      <InfoBar />
      <div className="space-y-8">
        <BillingSettings />
        <Separator />
        <ThemeSection />
        <Separator />
        <PasswordSection />
      </div>
    </div>
  );
}

export default SettingsPage;
