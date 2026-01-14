"use client";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useGoogle } from "@/hooks/auth/use-auth-api";

import Image from "next/image";
import { toast } from "sonner";

function GoogleLoginButton() {
  const { mutateAsync: googleLogin, isPending } = useGoogle();

  const onHandleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8001/auth/google";

      //   await googleLogin();
      toast("Google login successful");
    } catch (error: any) {
      toast(error?.message);
    }
  };
  return (
    <div className="">
      <div className=" relative text-sm text-muted-foreground text-center">
        or
      </div>
      <Button
        disabled={isPending}
        onClick={onHandleGoogleLogin}
        type="button"
        variant="outline"
        size="lg"
        className="w-full mt-4"
      >
        <Loader loading={isPending}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
            width={18}
            height={18}
            alt="google-logo"
          />
          Sign in with Google
        </Loader>
      </Button>
    </div>
  );
}

export default GoogleLoginButton;
