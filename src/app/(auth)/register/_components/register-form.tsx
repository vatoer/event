"use client";
import LogoMix from "@/components/logo-mix";
import { Button, buttonVariants } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ButtonWithGoogle } from "../../_components/button-with-google";
import { FormError } from "../../_components/form-error";
import InputForm from "../../_components/input-form";
import { register as registerUser } from "../_actions/register";
import { RegisterSchema, TRegister } from "../_schema/register";

const RegisterForm = () => {
  const callbackUrl = useSearchParams().get("callbackUrl") ?? "/";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<TRegister>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: TRegister) => {
    startTransition(async () => {
      const response = await registerUser(data);
      if (response?.error) {
        setError(response.error);
      }
    });
  };
  const t = useTranslations("Login");

  return (
    <div className="flex flex-col gap-2 mb-4">
      <LogoMix />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-2"
        noValidate
      >
        <InputForm
          id="name"
          label={t("name")}
          type="text"
          register={register}
          error={errors.name}
        />
        <InputForm
          id="email"
          label={t("email")}
          type="text"
          register={register}
          error={errors.email}
          pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
        />
        <InputForm
          id="password"
          label={t("password")}
          type="password"
          register={register}
          error={errors.password}
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
        />
        <FormError message={error} />

        <Button className=" w-full py-6" disabled={isPending} type="submit">
          {t("register")}
          {isPending && (
            <Loader className="ml-2 spin-in" size={24} color="white" />
          )}
        </Button>
        <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0">OR</p>
        </div>
        <ButtonWithGoogle callbackUrl={callbackUrl} text={t("withGoogle")} />
        <Link
          href="/login"
          className={buttonVariants({
            variant: "link",
            className: "gap-1.5 w-full text-blue-500",
          })}
        >
          {t("haveAccount")} {t("login")}
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

export default RegisterForm;
