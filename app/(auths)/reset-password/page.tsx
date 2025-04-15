import ResetPasswordClient from "@/Screens/RestPasswordClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

const Page = () => {
  return <ResetPasswordClient />;
};

export default Page;
