import GoogleLoginButton from "@/components/forms/google-login";
import LoginForm from "@/components/forms/sign-in/login-form";
import SignFormProvider from "@/components/forms/sign-in/sign-form-provider";
import SignInButtonHandler from "@/components/forms/sign-in/sign-in-button-handler";

function AuthLogin() {
  return (
    <div className="py-36 w-full flex-1">
      <div className="flex flex-col h-full gap-4">
        <SignFormProvider>
          <div className="flex flex-col gap-6">
            <LoginForm />
            <SignInButtonHandler />
            <GoogleLoginButton />
          </div>
        </SignFormProvider>
      </div>
    </div>
  );
}

export default AuthLogin;
