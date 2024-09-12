"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

interface IButtonWithGoogleProps {
  callbackUrl?: string;
  disabled?: boolean;
  text?: string;
}

export const ButtonWithGoogle = ({
  callbackUrl = "/",
  disabled = false,
  text = "Continue with Google",
}: IButtonWithGoogleProps) => {
  const searchParams = useSearchParams()
  callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const handleLoginWithGoogle = () => {
    signIn("google", { callbackUrl });
  };
  return (
    <Button
      type="button"
      onClick={handleLoginWithGoogle}
      variant={"outline"}
      className="flex justify-center items-center gap-x-2"
    >
      <FcGoogle className="h-5 w-5" />
      <span className="text-slate-600">{text}</span>
    </Button>
  );
};
