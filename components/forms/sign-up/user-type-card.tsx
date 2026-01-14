import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  setUseType: Dispatch<SetStateAction<"owner" | "student">>;
  userType: "student" | "owner";
  role: "student" | "owner";
  title: string;
  description: string;
  icon: React.ReactNode;
};

const UserTypeCard = ({
  role,
  userType,
  title,
  description,
  register,
  setUseType,
  icon,
}: Props) => {
  const isActive = role === userType;

  return (
    <Label htmlFor={role} className="cursor-pointer ">
      <div
        className={cn(
          "relative w-full flex items-start gap-4 rounded-xl border p-4 transition-all",
          "hover:border-amber-400 hover:bg-amber-50",
          isActive ? "border-amber-400 bg-amber-50 " : "border-border"
        )}
      >
        {/* Left Icon */}
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            isActive
              ? "bg-amber-500 text-white"
              : "bg-muted text-muted-foreground"
          )}
        >
          {icon}
        </div>

        {/* Title + Description */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Radio Circle */}
        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full border transition-all",
            isActive
              ? "border-amber-500 bg-amber-500"
              : "border-muted-foreground"
          )}
        >
          {isActive && <Check className="h-3 w-3 text-white" />}
        </div>

        {/* Hidden Input */}
        <Input
          type="radio"
          id={role}
          value={role}
          className="hidden"
          {...register("type", {
            onChange: (e) => setUseType(e.target.value),
          })}
        />
      </div>
    </Label>
  );
};

export default UserTypeCard;
