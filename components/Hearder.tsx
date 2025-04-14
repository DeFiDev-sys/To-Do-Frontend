"use client";

import React from "react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { setUserLogout } from "@/reduxs/Slices/UserSlice";
import { deleteAuthToken } from "@/server/server";
import { useRouter } from "next/navigation";
import ToDoLogo from "./ToDoLogo";
import { useTheme } from "next-themes";
import { Sun, Moon, LogOut } from "lucide-react";

const Hearder = () => {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.user);
  const route = useRouter();

  const handleLogOut = async () => {
    try {
      await deleteAuthToken();
      await dispatch(setUserLogout());
      await route.push("/SignIn");
    } catch (error) {
      console.log(error);
    }
  };

  const handleThemeDarkMode = () => {
    setTheme("dark");
  };

  const handleThemeLightMode = () => {
    setTheme("light");
  };

  // const handleLogin = () => {
  //   route.push("/SignIn");
  // };

  return (
    <div className='border-b min-h-[60px] flex items-center px-5 lg:px-20 justify-between sticky top-0 z-50 shadow-lg bg-white dark:bg-background'>
      <div className='flex items-center space-x-2'>
        <span className='text-xl font-bold'>To-Do List</span>
        <ToDoLogo />
      </div>
      {userInfo && (
        <div className='flex gap-6 items-center'>
          <div>
            {theme === "light" ? (
              <Moon
                className='cursor-pointer'
                onClick={() => {
                  handleThemeDarkMode();
                }}
              />
            ) : (
              <Sun
                className='cursor-pointer'
                onClick={() => {
                  handleThemeLightMode();
                }}
              />
            )}
          </div>
          <Button onClick={handleLogOut} className='cursor-pointer subMittbutton flex items-center'>
            <span>Logout</span>
            <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Hearder;
