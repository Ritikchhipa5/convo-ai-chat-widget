"use client";

import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSignUp } from "@/hooks/auth/use-auth-api";

function useSignUpForm() {
  const { mutateAsync: signUp, isPending } = useSignUp();
  const router = useRouter();
  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema as any),
    defaultValues: {
      type: "owner",
    },
    mode: "onChange",
  });

  const onHandleSubmit = async (values: UserRegistrationProps) => {
    try {
      await signUp({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast("Error", {
        description: error.errors[0].longMessage,
      });
    }
  };

  return { methods, onHandleSubmit, loading: isPending };
}

export default useSignUpForm;
