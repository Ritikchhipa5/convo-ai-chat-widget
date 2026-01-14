import FormHeading from "@/components/forms/form-heading";
import UserTypeCard from "@/components/forms/sign-up/user-type-card";
import { User } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "owner" | "student";
  setUseType: Dispatch<SetStateAction<"owner" | "student">>;
};

function TypeSelectionForm({ register, userType, setUseType }: Props) {
  return (
    <>
      <FormHeading
        title="Create an account"
        description="Select your role to continue"
      />

      {/* Cards */}
      <div className="grid gap-4">
        <UserTypeCard
          icon={<User />}
          register={register}
          userType={userType}
          setUseType={setUseType}
          title="Student"
          role="student"
          description="Join as a student and access learning resources."
        />
        <UserTypeCard
          icon={<User />}
          register={register}
          userType={userType}
          setUseType={setUseType}
          role="owner"
          title="Owner"
          description="Manage your business, products, or services."
        />
      </div>
    </>
  );
}

export default TypeSelectionForm;
