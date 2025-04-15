import BackButton from "@/components/BackButton";
import ForgetPasswordScreen from "@/Screens/PasswordScreen/ForgetPasswordScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forget Password",
};

const page = () => {
  return (
    <div className='flex flex-col justify-center px-5  lg:px-10 2xl:px-20 min-h-dvh lg:shadow-2xl'>
      <BackButton />
      <h2 className='font-medium text-xl p-5'>Forget Password</h2>
      <ForgetPasswordScreen />
    </div>
  );
};

export default page;
