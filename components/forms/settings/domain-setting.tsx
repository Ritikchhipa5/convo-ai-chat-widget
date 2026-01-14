import CodeSnippet from "@/components/forms/settings/code-snippet";
import DomainUpdate from "@/components/forms/settings/domain-update";
import { Separator } from "@/components/ui/separator";
import { useDomain } from "@/hooks/domain/use-domain";

type Props = {
  chatBotId: string;
  id: string;
  name: string;
  description: string;
};

function DomainSetting({ id, chatBotId, name, description }: Props) {
  const { errors, updateDomainPending, register, onUpdatingSettings } =
    useDomain(id);

  return (
    <form className="space-y-10" onSubmit={onUpdatingSettings}>
      <DomainUpdate
        name={name}
        description={description}
        register={register}
        errors={errors}
        loading={updateDomainPending}
      />
      <Separator />
      <CodeSnippet id={chatBotId} />
      <Separator />
    </form>
  );
}

export default DomainSetting;
