"use client";
import SignUpFromProvider from "@/components/forms/sign-up/sign-up-from-provider";
import RegistrationFromStep from "@/components/forms/sign-up/registration-step";
import SignUpButtonHandler from "@/components/forms/sign-up/sign-up-button-handler";
function AuthRegister() {
  return (
    <div className="py-36 w-full flex-1">
      <div className="flex flex-col h-full gap-4">
        <SignUpFromProvider>
          <div className="flex flex-col gap-6">
            <RegistrationFromStep />
            <SignUpButtonHandler />
          </div>
        </SignUpFromProvider>
      </div>
    </div>
  );
}

export default AuthRegister;
