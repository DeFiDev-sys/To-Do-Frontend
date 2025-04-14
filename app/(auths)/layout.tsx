"use client";

import Image from "next/image";
import LoginImage from "../../public/images/To-Do image.png";
import ForgetPasswordImage from "../../public/images/undraw_forgot-password_odai.png";
import { usePathname } from "next/navigation";
// https://res.cloudinary.com/dybqllv1r/image/upload/v1743849149/To-Do_image_e6dteb.png

export default function AuthsLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const LoginAndSignUpLayout = ["/SignIn", "/RegisterUser"];
  return (
    <main className='flex flex-row w-full min-h-dvh overflow-hidden h-screen'>
      <section className='min-w-1/2 min-h-dvh hidden lg:block'>
        {LoginAndSignUpLayout.includes(pathName || "") ? (
          <Image src={LoginImage} alt={"LoginImage"} className='object-cover min-h-dvh' priority />
        ) : (
          <Image src={ForgetPasswordImage} alt={"ForgetPasswordImage"} className='object-cover min-h-dvh' priority />
        )}
      </section>
      <section className='w-full border-l'>{children}</section>
    </main>
  );
}
