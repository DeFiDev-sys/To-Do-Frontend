import { Task } from "@/types/definitions";
import React from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import PopUpForm from "./PopUpForm";
import { DeteleTaskAction, formatDate } from "@/reduxs/actions/TaskActions";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { Badge } from "./ui/badge";

const TaskCard: React.FC<Task> = ({ task }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.task);
  const handleDeleteTask = async (id: string) => {
    try {
      await dispatch(DeteleTaskAction(id));
    } catch (error) {
      console.log("Failed to delete task:", error);
    }
  };

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return (
    <div className='flex flex-col gap-4 lg:gap-1.5'>
      <CardHeader className='flex flex-col lg:flex-row justify-between items-center gap-5'>
        <div className='w-full text-center lg:text-left'>
          <CardTitle>{task.title}</CardTitle>
        </div>
        <div className='flex gap-2 mx-2'>
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            className='bg-amber-400 cursor-pointer'>
            Update Task
          </Button>
          <Button
            className='bg-destructive cursor-pointer'
            onClick={() => {
              handleDeleteTask(task._id);
            }}>
            {loading ? "Loading ..." : "Delete"}
          </Button>
        </div>
      </CardHeader>

      <CardDescription className='px-6'>Description : {task.description}</CardDescription>
      {/* Change this to bages */}
      <CardDescription className='px-6'>
        Status :{" "}
        <Badge
          className='px-2'
          variant={task.status === "todo" ? "secondary" : task.status === "in-progress" ? "outline" : "destructive"}>
          {task.status}
        </Badge>
      </CardDescription>
      <CardDescription className='px-6'>Date : {formatDate(task.createdAt)}</CardDescription>

      <CardContent className='px-6'>{isOpen && <PopUpForm setIsOpen={setIsOpen} task={task} />}</CardContent>
    </div>
  );
};

export default TaskCard;
