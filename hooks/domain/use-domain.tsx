import {
  useDeleteDomain,
  useUpdateDomain,
  useUpdateDomainChatbot,
} from "@/hooks/domain/use-domain-api";
import {
  DomainChatBotProps,
  DomainChatBotSchema,
  DomainSettingsProps,
  DomainSettingsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDomain = (domainId: string) => {
  const router = useRouter();
  const { mutateAsync: deleteDomain, isPending: deleteDomainPending } =
    useDeleteDomain(domainId);
  const { mutateAsync: updateDomain, isPending: updateDomainPending } =
    useUpdateDomain(domainId);

  const {
    mutateAsync: updateDomainChatbot,
    isPending: updateDomainChatbotPending,
  } = useUpdateDomainChatbot(domainId);

  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema as any),
  });

  const {
    formState: { errors: domainChatbotErrors },
    handleSubmit: domainChatbotHandleSubmit,
    register: domainChatbotRegister,
  } = useForm<DomainChatBotProps>({
    resolver: zodResolver(DomainChatBotSchema as any),
  });

  const onUpdatingSettings = handleSubmit(async (values) => {
    try {
      await updateDomain({
        domain: values.domain,
        description: values.description,
      });
      toast("Domain updated!");
      reset();
      router.refresh();
    } catch (error: any) {
      toast(error.message);
    }
  });

  const onDeleteDomain = handleSubmit(async (values) => {
    try {
      await deleteDomain();
      toast("Domain deleted!");
      router.refresh();
    } catch (error: any) {
      toast(error.message);
    }
  });

  const onUpdateChatbotSetting = domainChatbotHandleSubmit(async (values) => {
    try {
      await updateDomainChatbot({
        welcomeMessage: values.welcomeMessage,
      });
      toast("Domain updated!");
      reset();
      router.refresh();
    } catch (error: any) {
      toast(error.message);
    }
  });

  return {
    errors,
    deleteDomainPending,
    updateDomainPending,
    updateDomainChatbotPending,
    domainChatbotErrors,

    register,
    domainChatbotRegister,
    onUpdatingSettings,
    onDeleteDomain,
    onUpdateChatbotSetting,
  };
};
