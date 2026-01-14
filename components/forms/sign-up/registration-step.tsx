import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";

const DetailForm = dynamic(() => import("./account-detail-form"), {
  ssr: false,
  loading: () => <Spinner />,
});

function RegistrationFromStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return <DetailForm register={register} errors={errors} />;
}

export default RegistrationFromStep;
