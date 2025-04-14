"use client";

import React from "react";
import { ForgetPasswordScheme } from "@/types/definitions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { ForgetPassword } from "@/reduxs/actions/UserActions";
import { Button } from "@/components/ui/button";
import { useReduxNotifications } from "@/util/useReduxNotifications";

const ForgetPasswordScreen = () => {
  const dispatch = useAppDispatch();
  const { loading, error, userStatus } = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof ForgetPasswordScheme>>({
    resolver: zodResolver(ForgetPasswordScheme),
    defaultValues: {
      email: "",
    },
  });

  useReduxNotifications(error, userStatus, {
    onSuccess: () => form.reset({ email: "" }),
  });

  const onSubmit = async (values: z.infer<typeof ForgetPasswordScheme>) => {
    try {
      await dispatch(ForgetPassword(values.email));
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      form.reset({ email: "" });
    }
  };

  // if (error) {
  //   toast(error);
  // } else {
  //   toast.dismiss();
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-5'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={loading} className='w-full cursor-pointer subMittbutton'>
          {loading ? "Loading ..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgetPasswordScreen;
