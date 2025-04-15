import LoginScreen from "@/Screens/LoginScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
};

export default function Login() {
  return (
    <div className='my-20 lg:my-0 p-5 lg:p-32 2xl:p-60 min-h-dvh lg:shadow-2xl'>
      <h2 className='font-medium text-xl p-5'>Welcome Back.</h2>
      <LoginScreen />
    </div>
  );
}
