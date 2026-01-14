import FormGenerator from "@/components/forms/form-generator";
import FormHeading from "@/components/forms/form-heading";
import { USER_REGISTRATION_FORM } from "@/constants/forms";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
};

function AccountDetailForm({ register, errors }: Props) {
  return (
    <>
      <FormHeading
        title="Account Details"
        description="Enter your email and password"
      />

      <div className="grid gap-4">
        {USER_REGISTRATION_FORM.map((field, index) => (
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

export default AccountDetailForm;
