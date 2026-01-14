import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "@hookform/error-message";
import { Edit } from "lucide-react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  label: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<FieldValues>;
};

const UploadButton = ({ label, register, errors }: Props) => {
  return (
    <>
      <div>
        <Label htmlFor="upload-button" className="bg-muted p-2.5 rounded-md">
          <Input
            {...register("image")}
            className="hidden"
            type="file"
            id="upload-button"
          />
          <Edit className="" size={18} />
          {label}
        </Label>
        <p className="text-xs mt-1 text-muted-foreground">
          {" "}
          Recommend size is 300px * 300px, size <br /> less than 2MB
        </p>
      </div>
      <ErrorMessage
        name={"image"}
        errors={errors}
        render={({ message }) => (
          <p className="text-red-400  mt-2">
            {message == "Required" ? "" : message}
          </p>
        )}
      />
    </>
  );
};
export default UploadButton;
