"use server";
import * as z from "zod";

import { DEFAULT_ROUTE_AFTER_LOGIN } from "@/route";
import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import { LoginSchema } from "../_schema/login";
type TLogin = z.infer<typeof LoginSchema>;

export const login = async (data: TLogin) => {
  console.log(data);
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: "Invalid data", data: validateFields.error };
  }

  const { email, password } = validateFields.data;

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
};
