"use client";

import React from "react";
import { RegisterSchema } from "@/types/definitions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { toast } from "sonner";
import { RegisterUserAction } from "@/reduxs/actions/UserActions";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const SignUpScreen = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    if (values.confirmPassword !== values.password) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const result = await dispatch(RegisterUserAction(values.name, values.email, values.password));

      if (result?.token) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log("Registration failed:", error);
    } finally {
      form.reset();
    }
  };

  if (error) {
    toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 p-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First and Last Name</FormLabel>
              <FormControl>
                <Input placeholder='Fullname' type='text' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='password' type={showPassword ? "text" : "password"} {...field} required />
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
                <Input
                  placeholder='confirmPassword'
                  type={showPassword ? "text" : "password"}
                  {...field}
                  autoComplete='current-password'
                  required
                />
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

        <div className='flex flex-col lg:flex-row gap-2 items-center lg:justify-between'>
          <div className='flex gap-1.5'>
            <span>Already have an account? </span>
            <Link href='/SignIn' className='text-blue-600 underline'>
              Login
            </Link>
          </div>
          <Link href={"/forget-password"} className='hover:text-blue-600 hover:underline cursor-pointer'>
            <span>Forgot Password</span>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignUpScreen;
