"use client";
import Loader from "@/components/loader";
import { RegisterContextProvider } from "@/context/register-auth-context";
import useSignUpForm from "@/hooks/use-sign-up";
import { ReactNode } from "react";
import { FormProvider } from "react-hook-form";

type Props = {
  children: ReactNode;
};

const SignUpFromProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();
  return (
    <RegisterContextProvider>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onHandleSubmit)}
          className="h-full"
        >
          <div className="flex flex-col justify-between gap-4 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </RegisterContextProvider>
  );
};

export default SignUpFromProvider;
