"use client";

import { LoginSchema } from "@/types/definitions";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogInAction } from "@/reduxs/actions/UserActions";
import { LucideEye, LucideEyeClosed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const navigate = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      const result = await dispatch(LogInAction(values.email, values.password));

      if (result?.token) {
        // window.location.href = "/dashboard";
        toast.success("Login Successfully");
        navigate.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      form.reset({
        email: "",
        password: "",
      });
    }
  };

  if (error) {
    toast(error);
  }

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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    placeholder='password'
                    type={showPassword ? "text" : "password"}
                    {...field}
                    autoComplete='current-password'
                    required
                  />
                  <Button
                    className='absolute right-3 bottom-0 bg-transparent hover:bg-transparent p-0 shadow-none cursor-pointer'
                    type='button'
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}>
                    {showPassword ? (
                      <LucideEye size='20px' color='black' />
                    ) : (
                      <LucideEyeClosed size='20px' color='black' />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={loading} className='w-full cursor-pointer subMittbutton'>
          {loading ? "Loading ..." : "Submit"}
        </Button>

        <div className='flex flex-col lg:flex-row items-center gap-2 lg:justify-between'>
          <div className='flex gap-2'>
            <span className=''>Don&apos;t have an account? </span>
            <Link href='/RegisterUser' className='text-blue-600 underline'>
              Sign Up
            </Link>
          </div>
          <Link href={"/Forget-password"} className='hover:text-blue-600 hover:underline cursor-pointer'>
            <span>Forgot Password</span>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginScreen;
