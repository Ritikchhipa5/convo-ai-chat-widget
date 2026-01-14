import { Button } from "@/components/ui/button";
import Link from "next/link";

function SignInButtonHandler() {
  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button type="submit" size="lg" className="w-full ">
        Continue
      </Button>

      <p className="text-sm mt-2 text-muted-foreground">
        Create new account?{" "}
        <Link href={"/auth/sign-up"} className=" text-amber-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SignInButtonHandler;
