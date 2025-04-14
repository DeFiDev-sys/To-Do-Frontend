"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { GetTaskAction } from "@/reduxs/actions/TaskActions";
import { getAuthToken } from "@/server/server";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import TaskCard from "@/components/TaskCard";
import { ScaleLoader } from "react-spinners";
import { useTheme } from "next-themes";
import Image from "next/image";
import errorImage from "../public/errorImage.svg";
import CreatePopUpScreen from "@/components/CreatePopUpScreen";

const Dashboard = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { tasks, error, loading } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleTokenOnLoad = async () => {
      const token = getAuthToken();

      if (!token && !userInfo) {
        redirect("/SignIn");
      }
    };
    handleTokenOnLoad();
    dispatch(GetTaskAction());
  }, [dispatch, userInfo]);

  return (
    <div className='my-5'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Task Manager</h1>
      <div className='border-2 mx-2 lg:mx-20 min-h-dvh my-5 rounded-lg p-2 lg:p-6'>
        <Button
          className='float-end flex gap-2 items-center cursor-pointer bg-green-500'
          onClick={() => {
            setIsOpen(true);
          }}>
          <span>Add Task</span>
          <Plus />
        </Button>

        {/* Display Data */}
        {loading ? (
          <div className='flex justify-center items-center m-auto w-full min-h-dvh'>
            <ScaleLoader color={theme === "dark" ? "white" : "black"} />
          </div>
        ) : error ? (
          <div className='flex flex-col gap-4 w-full justify-center items-center'>
            <Image src={errorImage} alt={error} className='object-cover' width={150} height={150} />
            <p>{error}</p>
          </div>
        ) : tasks.length < 1 ? (
          <p className='flex justify-center items-center text-center min-h-dvh w-full'>No Task Found.</p>
        ) : (
          <div className=' my-14 p-2 lg:p-5 border-b shadow-lg gap-2 max-h-dvh lg:max-h-[600px] overflow-y-auto scroll-smooth'>
            <ul className='space-y-5'>
              {tasks.map((task) => (
                <li key={task._id}>
                  <Card>
                    <TaskCard task={task} />
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isOpen && <CreatePopUpScreen setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
};

export default Dashboard;
