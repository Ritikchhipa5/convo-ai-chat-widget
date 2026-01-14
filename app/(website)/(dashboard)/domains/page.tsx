"use client";
import InfoBar from "@/components/infobar";
import DomainList from "@/components/domains/domain-list";
import useDomain from "@/hooks/sidebar/use-domain";
function Domains() {
  return (
    <div>
      <InfoBar />
      <DomainList />
    </div>
  );
}

export default Domains;
