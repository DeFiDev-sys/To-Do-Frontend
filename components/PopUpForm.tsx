import { UpadateTaskSchema, updateProps } from "@/types/definitions";
import React from "react";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setLoading } from "@/reduxs/Slices/TaskSlice";
import { UpdateTaskAction } from "@/reduxs/actions/TaskActions";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

const Status: string[] = ["todo", "in-progress", "done"];

const PopUpForm: React.FC<updateProps> = ({ task, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.task);

  const updateForm = useForm<z.infer<typeof UpadateTaskSchema>>({
    resolver: zodResolver(UpadateTaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      reminderAt: new Date(task.reminderAt),
    },
  });

  const onSubmit = async (values: z.infer<typeof UpadateTaskSchema>) => {
    dispatch(setLoading(true));

    const reminderAt = values.reminderAt || new Date();

    try {
      const updateRes = await dispatch(
        UpdateTaskAction(task._id, values.title, values.description, values.status, reminderAt)
      );

      if (updateRes) {
        setIsOpen(false);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log("Failed to Update Task:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (error) {
    toast(error);
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <div>Upadate Task</div>

        <Button
          className='cursor-pointer'
          onClick={() => {
            setIsOpen(false);
          }}>
          Cancle
        </Button>
      </div>

      <Form {...updateForm}>
        <form onSubmit={updateForm.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={updateForm.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Task Title' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={updateForm.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Task Description' className='resize-none' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={updateForm.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Status.map((status, index) => (
                      <SelectItem key={index} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={updateForm.control}
            name='reminderAt'
            render={({ field }) => {
              // Convert Date to string for the input value
              const value = field.value instanceof Date ? field.value.toISOString().split("T")[0] : "";

              return (
                <FormItem>
                  <FormLabel>Reminder Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Reminder Date'
                      type='date'
                      {...field}
                      value={value}
                      onChange={(e) => {
                        field.onChange(e.target.value ? new Date(e.target.value) : null);
                      }}
                      className='flex flex-col justify-center max-w-1/2 lg:max-w-1/4'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            type='submit'
            disabled={loading}
            className={`w-full cursor-pointer subMittbutton ${loading ? "cursor-progress" : ""}`}>
            {loading ? "Loading ..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PopUpForm;
