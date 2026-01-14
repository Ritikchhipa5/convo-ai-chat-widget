import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  type: "email" | "text" | "password";
  inputType: "select" | "input" | "textarea";
  options?: {
    value: string;
    label: string;
    id: string;
  }[];
  placeholder?: string;
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  disabled?: boolean;
  defaultValue?: string;
};

function FormGenerator({
  inputType,
  type,
  label,
  placeholder,
  form,
  name,
  lines,
  options,
  errors,
  defaultValue,
  disabled,
  register,
}: Props) {
  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col items-start gap-0 "
          htmlFor={`input-${label}`}
        >
          {label && <div className="mb-2">{label}</div>}

          <Input
            disabled={disabled}
            className="bg-muted border-none"
            defaultValue={defaultValue}
            {...register(name)}
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            form={form}
          />

          <ErrorMessage
            name={name}
            errors={errors}
            render={({ message }) => (
              <p className="text-red-400 text-sm  mt-2">
                {message == "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "select":
      return (
        <Label
          className="flex flex-col items-start gap-2"
          htmlFor={`select-${label}`}
        >
          {label && label}

          <Select disabled={disabled} form={form} {...register(name)}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent id={`select-${label}`}>
              <SelectGroup>
                {options?.map(({ label, value }, index) => (
                  <SelectItem key={index} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <ErrorMessage
            name={name}
            errors={errors}
            render={({ message }) => (
              <p className="text-red-400  mt-2">
                {message == "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "textarea":
      return (
        <Label
          className="flex flex-col items-start gap-2"
          htmlFor={`textarea-${label}`}
        >
          {label && label}

          <Textarea
            disabled={disabled}
            rows={lines}
            id={`input-${label}`}
            placeholder={placeholder}
            defaultValue={defaultValue}
            form={form}
            className="bg-muted border-none"
            {...register(name)}
          />

          <ErrorMessage
            name={name}
            errors={errors}
            render={({ message }) => (
              <p className="text-red-400  mt-2">
                {message == "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );

    default:
      return <></>;
  }
}

export default FormGenerator;
