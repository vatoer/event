"use client";
import LogoMix from "@/components/logo-mix";
import { Button, buttonVariants } from "@/components/ui/button";
import { ButtonWithGoogle } from "@auth/_components/button-with-google";
import { FormError } from "@auth/_components/form-error";
import InputForm from "@auth/_components/input-form";
import { login } from "@auth/login/_actions/login";
import { LoginSchema, TLogin } from "@auth/login/_schema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") ?? "/";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: TLogin) => {
    startTransition(async () => {
      login(data).then((response) => {
        if (response?.error) {
          setError(response.error);
        }
      });
    });
  };


  return (
    <div className="flex flex-col gap-2 mb-4">
      <LogoMix />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-2"
        noValidate
      >
        <InputForm
          id="email"
          label="Email"
          type="text"
          register={register}
          error={errors.email}
          pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
        />
        <InputForm
          id="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        />
        <FormError message={error} />
        <Button className=" w-full py-6" disabled={isPending} type="submit">
          <span>Login</span>
          {isPending && (
            <Loader className="ml-2 spin-in" size={24} color="white" />
          )}
        </Button>
        <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        <ButtonWithGoogle
          disabled={isPending}
          callbackUrl={callbackUrl}
          text="Login with Google"
        />
        <Link
          href="/register"
          className={buttonVariants({
            variant: "link",
            className: "gap-1.5 w-full text-blue-500",
          })}
        >
          <span>Dont have an account? Register here</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </form>
    </div>
  );
};

const checkEmailPattern = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const checkComplexity = (password: string): boolean => {
  // Password complexity requirements:
  // At least 8 characters
  // Contains at least one uppercase letter
  // Contains at least one lowercase letter
  // Contains at least one digit
  // Contains at least one special character

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

export default LoginForm;
