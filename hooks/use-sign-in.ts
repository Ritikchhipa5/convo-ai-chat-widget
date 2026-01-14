"use client";

import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSignIn } from "@/hooks/auth/use-auth-api";

function useSignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { mutateAsync: signIn, isPending: isLoaded } = useSignIn();
  const router = useRouter();

  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema as any),
    mode: "onChange",
  });

  const onHandleSubmit = async (values: UserLoginProps) => {
    try {
      setLoading(true);

      const authenticated = await signIn({
        email: values.email,
        password: values.password,
      });

      toast("Success", {
        description: "Welcome back!",
      });
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      toast("Error", {
        description: error?.message || "email/ password is incorrect try again",
      });
    }
  };

  return { methods, onHandleSubmit, loading };
}

export default useSignInForm;
