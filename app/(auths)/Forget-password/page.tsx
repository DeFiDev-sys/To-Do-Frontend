"use client";

import { Button } from "@/components/ui/button";
import ForgetPasswordScreen from "@/Screens/PasswordScreen/ForgetPasswordScreen";
import React from "react";

const page = () => {
  const handleBackFun = () => {
    window.location.href = "/SignIn";
  };
  return (
    <div className='flex flex-col justify-center px-5  lg:px-10 2xl:px-20 min-h-dvh lg:shadow-2xl'>
      <div className='flex w-full p-5 justify-end'>
        <Button
          className='max-w-1/4 cursor-pointer'
          onClick={() => {
            handleBackFun();
          }}>
          Back
        </Button>
      </div>
      <h2 className='font-medium text-xl p-5'>Forget Password</h2>
      <ForgetPasswordScreen />
    </div>
  );
};

export default page;
