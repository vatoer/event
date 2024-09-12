import { Suspense } from "react";
import RegisterForm from "./_components/register-form";
import { notFound } from "next/navigation";

export default async function RegisterPage() {
  const shouldReturn404 = true; // Replace with your actual condition

  if (shouldReturn404) {
    notFound();
    return null; // This line will never be reached, but it's good practice to include it
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
