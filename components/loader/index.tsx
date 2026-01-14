import { Spinner } from "@/components/ui/spinner";
import { ReactNode } from "react";

type Props = {
  loading: boolean;
  children: ReactNode;
};
function Loader({ loading, children }: Props) {
  return loading ? (
    <div className="w-full py-5 flex justify-center">
      <Spinner className="size-6 text-amber-500" />
    </div>
  ) : (
    children
  );
}

export default Loader;
