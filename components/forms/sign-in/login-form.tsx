"use client";
import FormGenerator from "@/components/forms/form-generator";
import FormHeading from "@/components/forms/form-heading";
import { USER_LOGIN_FORM } from "@/constants/forms";
import { useFormContext } from "react-hook-form";

function LoginForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <FormHeading title="Login" description="You will get otp on your email" />

      <div className="grid gap-4">
        {USER_LOGIN_FORM.map((field, index) => (
          <FormGenerator
            {...field}
            register={register}
            errors={errors}
            key={index}
            name={field.name}
          />
        ))}
      </div>
    </>
  );
}

export default LoginForm;
