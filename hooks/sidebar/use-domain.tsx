"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddDomainProps, AddDomainSchema } from "@/schemas/settings.schema";
import { toast } from "sonner";
import { useAddDomain } from "@/hooks/domain/use-domain-api";

const useDomain = () => {
  const { mutateAsync: addDomain, isPending: addDomainPending } =
    useAddDomain();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddDomainProps>({
    resolver: zodResolver(AddDomainSchema as any),
  });

  const onAddDomain = handleSubmit(async (values) => {
    try {
      await addDomain({
        domain: values.domain,
        description: values.description,
      });
      console.log(values, "description");
      toast("Domain added!");

      // reset();
    } catch (err: any) {
      toast(err?.message || "Somthings went wrong");
    }
  });

  return { register, onAddDomain, addDomainPending, errors };
};

export default useDomain;
