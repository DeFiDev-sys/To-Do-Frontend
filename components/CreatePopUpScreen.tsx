import React from "react";
import { Button } from "./ui/button";
import { CreateTaskSchema, state } from "@/types/definitions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { setLoading } from "@/reduxs/Slices/TaskSlice";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { CreateTaskAction } from "@/reduxs/actions/TaskActions";
import { toast } from "sonner";
import { XIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";

const CreatePopUpScreen = ({ setIsOpen }: state) => {
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.task);

  const form = useForm<z.infer<typeof CreateTaskSchema>>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      reminderAt: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateTaskSchema>) => {
    dispatch(setLoading(true));

    const reminderAt = values.reminderAt || new Date();

    try {
      const response = await dispatch(CreateTaskAction(values.title, values.description, reminderAt));

      if (response) {
        setIsOpen(false);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log("Failed to Create Task:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (error) {
    toast(error);
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Blur overlay */}
      <div className='absolute inset-0 bg-opacity-50 backdrop-blur-sm'></div>

      {/* Model content */}
      <div className='relative z-50 w-full max-w-md p-6 bg-white dark:bg-background rounded-lg shadow-xl'>
        <div className='flex flex-col gap-10'>
          <div className='flex justify-between items-center'>
            <h2 className=''>Create a new task</h2>

            <Button
              className='cursor-pointer'
              onClick={() => {
                setIsOpen(false);
              }}>
              <p>
                <XIcon />
              </p>
            </Button>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                          className='flex flex-col justify-center  max-w-1/2'
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
      </div>
    </div>
  );
};

export default CreatePopUpScreen;
