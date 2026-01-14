"use client";

import DomainSettingsForm from "@/components/forms/settings/domain-setting-form";
import InfoBar from "@/components/infobar";
import { useSpecificDomain } from "@/hooks/domain/use-domain-api";

import { useParams } from "next/navigation";

function DomainSettingPage() {
  const { domain } = useParams();
  const { data: currentDomain } = useSpecificDomain(domain as string);
  if (!currentDomain) return null;
  return (
    <div>
      <InfoBar />

      <DomainSettingsForm
        description={currentDomain.description}
        chatBot={currentDomain?.chatBot}
        id={currentDomain?.id}
        name={currentDomain?.name}
      />
    </div>
  );
}

export default DomainSettingPage;
