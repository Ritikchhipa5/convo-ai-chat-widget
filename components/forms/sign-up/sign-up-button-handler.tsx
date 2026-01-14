import { Button } from "@/components/ui/button";

import Link from "next/link";

function SignUpButtonHandler() {
  const renderBtn = () => {
    return (
      <Button type="submit" size="lg" className="w-full">
        Continue
      </Button>
    );
  };
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      {renderBtn()}

      <p className="text-sm">
        Already have account?{" "}
        <Link href={"/auth/sign-in"} className="font-semibold">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default SignUpButtonHandler;
