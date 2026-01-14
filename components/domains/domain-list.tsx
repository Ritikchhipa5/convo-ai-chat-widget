import { DomainCard } from "@/components/domains/domain-card";
import DomainAdd from "@/components/domains/domain-add";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useGetDomains } from "@/hooks/domain/use-domain-api";

function DomainList() {
  const router = useRouter();
  const { data: domains, isPending: domainsLoading } = useGetDomains();

  const onHandleViewDomain = (domainId: string) => {
    router.push(`/domains/${domainId}`);
  };
  return (
    <div className=" space-y-4">
      <div className="flex justify-end">
        <DomainAdd />
      </div>

      <Loader loading={domainsLoading}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains?.map((domain, key) => (
            <DomainCard
              key={key}
              name={domain.name}
              description={domain.description}
              enabled={true}
              icon={domain?.icon}
              onToggle={(v) => console.log("Enabled:", v)}
              onViewDomain={() => onHandleViewDomain(domain.id)}
            />
          ))}
        </div>
      </Loader>
    </div>
  );
}

export default DomainList;
