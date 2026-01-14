import FormGenerator from "@/components/forms/form-generator";
import { SectionLabel } from "@/components/section-label";
import { Lock } from "lucide-react";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  message: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
};

function ChatbotGreetingMessageUpdate({ register, errors, message }: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <SectionLabel
        icon={Lock}
        label="Greeting Message"
        description="Customize your message"
      />
      <FormGenerator
        inputType="textarea"
        type="text"
        register={register}
        errors={errors}
        name="welcomeMessage"
        label="Write Message"
        placeholder={message}
      />
    </div>
  );
}

export default ChatbotGreetingMessageUpdate;
