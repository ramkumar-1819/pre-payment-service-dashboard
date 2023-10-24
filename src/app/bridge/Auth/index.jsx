import Image from "next/image";
import AuthForm from "./form";
import VSLOGO from "@/app/components/vslogo";

const Auth = () => {
  return (
    <div className="bg-white w-[475px] text-black rounded-md px-5 pt-8 pb-4">
      <VSLOGO className="mx-auto" />
      <p className="text-center my-5">Sign in with your credentials</p>
      <AuthForm />
    </div>
  );
};

export default Auth;
