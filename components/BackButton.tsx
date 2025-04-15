"use client";

import { Button } from "@/components/ui/button";

export default function BackButton() {
  const handleBack = () => {
    window.location.href = "/SignIn";
  };

  return (
    <div className='flex w-full p-5 justify-end'>
      <Button className='max-w-1/4 cursor-pointer' onClick={handleBack}>
        Back
      </Button>
    </div>
  );
}
