import { Suspense } from "react";
import LoginForm from "./_components/login-form";

export default async function LoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
