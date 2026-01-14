import FormGenerator from "@/components/forms/form-generator";
import { SectionLabel } from "@/components/section-label";
import UploadButton from "@/components/upload-button";
import { BotIcon, Lock } from "lucide-react";
import Image from "next/image";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  chatBot: {
    id: string;
    icon: string | null;
    welcomeMessage: string | null;
  } | null;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
};

function ChatbotIconUpdate({ register, errors, chatBot }: Props) {
  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      <SectionLabel
        icon={Lock}
        label="Chatbot Icon"
        description="Update your password to keep your account secure."
      />

      <div className="flex flex-col gap-4  ">
        {chatBot?.icon ? (
          <div className="rounded-full overflow-hidden flex h-20 w-20 border-amber-400 border-2 ">
            <Image
              src={`https://56lltm1l86.ucarecd.net/${chatBot.icon}/-/preview/1000x1000/`}
              alt=""
              width={80}
              height={80}
            />
          </div>
        ) : (
          <div className="h-20 text-black w-20 bg-amber-400 rounded-full items-center justify-center flex">
            <BotIcon size={34} />
          </div>
        )}
        <UploadButton register={register} errors={errors} label="Edit Image" />
      </div>
    </div>
  );
}

export default ChatbotIconUpdate;
