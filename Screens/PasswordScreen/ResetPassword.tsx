"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { ResetPasswordAction } from "@/reduxs/actions/UserActions";
import { ResetPasswordScheme } from "@/types/definitions";
import { useReduxNotifications } from "@/util/useReduxNotifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type tokenProps = {
  token: string;
};

const ResetPassword = ({ token }: tokenProps) => {
  const dispatch = useAppDispatch();
  const { loading, error, userStatus } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ResetPasswordScheme>>({
    resolver: zodResolver(ResetPasswordScheme),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useReduxNotifications(error, userStatus, {
    onSuccess: () => {
      form.reset();
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordScheme>) => {
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Password does not match");
        return form.reset({
          confirmPassword: "",
        });
      }
      const res = await dispatch(ResetPasswordAction(token, values.password));
      if (res?.statusText === "OK") {
        router.push("/SignIn");
      }
    } catch (error) {
      console.error("Changed of password failed:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-5'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Enter new password' type={showPassword ? "text" : "password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder='Re-enter password' type={showPassword ? "text" : "password"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2 items-center'>
          <Checkbox
            className='border border-black'
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          />
          <span className='text-sm'>Show Passwords</span>
        </div>

        <Button type='submit' disabled={loading} className='w-full cursor-pointer subMittbutton'>
          {loading ? "Loading ..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPassword;
