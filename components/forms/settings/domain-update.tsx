import FormGenerator from "@/components/forms/form-generator";
import Loader from "@/components/loader";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  description: string;
  name: string;
  loading: boolean;
};

function DomainUpdate({ name, register, errors, description, loading }: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <SectionLabel
        icon={Lock}
        label="Domain Name"
        description="Update your password to keep your account secure."
      />
      <div className=" space-y-4">
        <FormGenerator
          inputType="input"
          type="text"
          disabled
          register={register}
          errors={errors}
          name="domain"
          label="Domain Name"
          placeholder={name}
        />
        <FormGenerator
          inputType="textarea"
          type="text"
          register={register}
          errors={errors}
          name="description"
          label="Description"
          placeholder={description}
        />
        <div className="flex justify-end">
          <Button type="submit">
            <Loader loading={loading}>Save</Loader>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DomainUpdate;
