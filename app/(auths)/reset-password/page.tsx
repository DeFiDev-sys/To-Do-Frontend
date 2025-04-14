"use client";
import ResetPassword from "@/Screens/PasswordScreen/ResetPassword";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  useEffect(() => {
    if (!token) {
      toast.error("Invalid token");
      redirect("/SignIn");
    }
  }, [token]);
  return (
    <div className='flex flex-col justify-center px-5  lg:px-10 2xl:px-20 min-h-dvh lg:shadow-2xl'>
      <ResetPassword token={token} />
    </div>
  );
};

export default Page;
