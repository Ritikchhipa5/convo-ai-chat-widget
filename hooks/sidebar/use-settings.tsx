import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangedPasswordProps,
  ChangedPasswordSchema,
} from "@/schemas/settings.schema";
import { useState } from "react";

export function useChangePassword() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<ChangedPasswordProps>({
    resolver: zodResolver(ChangedPasswordSchema as any),
  });
  const onChangePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = "";

      if (updated) {
        reset();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  });

  return { errors, loading, register, onChangePassword };
}
