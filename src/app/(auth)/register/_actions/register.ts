"use server";
import { DEFAULT_ROUTE_AFTER_LOGIN } from "@/route";
import { userCreate } from "@auth/_data/user";
import { signIn } from "@auth/auth";
import { AuthError } from "next-auth";
import * as z from "zod";
import { RegisterSchema } from "../_schema/register";

type TRegister = z.infer<typeof RegisterSchema>;

export const register = async (data: TRegister) => {
  console.log(data);
  const validateFields = RegisterSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid data", data: validateFields.error };
  }

  const { email, password } = validateFields.data;

  const newUser = await userCreate(data);
  if ("error" in newUser) {
    return { error: newUser.error };
  }

  // if user is created, sign in

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_ROUTE_AFTER_LOGIN,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          console.log(error);
          return { error: "Invalid credentials" };
        }
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }

  delete (newUser as any).password;
  return { user: newUser };
};
