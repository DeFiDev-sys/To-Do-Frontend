"use client";
import ResetPassword from "@/Screens/PasswordScreen/ResetPassword";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { toast } from "sonner";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className='flex justify-center items-center'>
          <BounceLoader color='#0e25f1' />
        </div>
      }>
      <ResetPasswordContent />
    </Suspense>
  );
};

const ResetPasswordContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  useEffect(() => {
    if (!token) {
      toast.error("Invalid token");
      redirect("/SignIn");
    }
  }, [token]);

  return (
    <div className='flex flex-col justify-center px-5 lg:px-10 2xl:px-20 min-h-dvh lg:shadow-2xl'>
      <ResetPassword token={token} />
    </div>
  );
};

export default Page;
