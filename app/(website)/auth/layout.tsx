import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = async ({ children }: Props) => {
  // const user = await currentUser();

  // if (user) redirect("/");

  return (
    <div className="h-screen flex w-full justify-center   ">
      <div className=" absolute top-0 left-0 right-0 h-1/2 bg-linear-to-t from-white to-amber-100 blur-2xl" />
      <div className=" relative z-10 flex justify-center w-full md:max-w-sm  mx-auto ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
