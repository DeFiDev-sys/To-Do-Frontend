import SignUpScreen from "@/Screens/SignUpScreen";
import React from "react";

const page = () => {
  return (
    <div className='my-2 lg:my-0 p-5 lg:px-14 lg:py-10 2xl:p-40 min-h-dvh lg:shadow-2xl'>
      <h2 className='font-medium text-xl p-5'>Get Started. </h2>
      <SignUpScreen />
    </div>
  );
};

export default page;
