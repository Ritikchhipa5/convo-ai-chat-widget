"use client";

import Loader from "@/components/loader";
import { RegisterContextProvider } from "@/context/register-auth-context";
import useSignInForm from "@/hooks/use-sign-in";
import { ReactNode } from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: ReactNode;
};

function SignFormProvider({ children }: Props) {
  const { methods, onHandleSubmit, loading } = useSignInForm();
  return (
    <RegisterContextProvider>
      <FormProvider {...methods}>
        <form
          className="h-full"
          onSubmit={methods.handleSubmit(onHandleSubmit)}
        >
          <div className="flex flex-col justify-center gap-4 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </RegisterContextProvider>
  );
}

export default SignFormProvider;
