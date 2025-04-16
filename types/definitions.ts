import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  confirmPassword: z
    .string()
    .min(2, { message: "Confirm Password must match Password" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
export const CreateTaskSchema = z.object({
  title: z.string().min(2, { message: "Tile must be at least 2 characters long." }).toUpperCase().trim(),
  description: z.string().trim(),
  reminderAt:z.union([
    z.date(),
    z.null(),
  ]).optional(),
});
export const UpadateTaskSchema = z.object({
  title: z.string().min(2, { message: "Tile must be at least 2 characters long." }).toUpperCase().trim(),
  description: z.string().max(160,{message:"Description must not be longer than 30 characters."}).trim(),
  status: z.string().trim(),
  reminderAt: z.union([
    z.date(),
    z.null(),
  ]).optional(),
});
export const ForgetPasswordScheme = z.object({
  email: z.string().email("Invalid email address").trim(),
});
export const ResetPasswordScheme = z.object({
  password: z
    .string()
    .min(2, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
  confirmPassword: z
    .string()
    .min(2, { message: "Confirm Password must match Password" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type UserData = {
  id: string;
  name: string;
  email: string;
  token?: string;
};

export type taskData = {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  reminderAt:string;
  notified:boolean;
  createdAt: string;
  updatedAt: string;
};

export const getUserFromLocalstorage = (): UserData | null => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const storedUserInfo = localStorage.getItem("userInfo");
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    return null;
  }
};

export type UserStatusProps = {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
} | null;

export interface UserState {
  loading: boolean;
  error: string | null;
  userInfo: Omit<UserData, "token"> | null;
  userStatus: UserStatusProps;
}

export interface TaskState {
  loading: boolean;
  error: string | null;
  tasks: taskData[];
}


export interface Task {
  task: taskData;
}

export type CookieProps = {
  id: string;
  email: string;
  exp: number;
  type: string;
};

export interface JwtPayload {
  sub: string; // Standard JWT claim for user ID
  email: string;
  iat?: number;
  exp?: number;
}

export type state = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface updateProps {
  task: taskData;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
