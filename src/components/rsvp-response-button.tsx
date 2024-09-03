"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { RsvpResponse } from "@prisma/client";

interface RsvpResponseButtonProps {
  setSelectedOption: (option: string) => void;
  selectedOption: string | null;
  option: {
    text: string;
    rsvpResponse: RsvpResponse;
  };
  className?: string;
}

const RsvpResponseButton = ({
  setSelectedOption,
  selectedOption,
  option,
  className
}: RsvpResponseButtonProps) => {
  const handleClick = (rsvpResponse: string) => {
    setSelectedOption(rsvpResponse);
  };

  return (
    <button
      //variant={"outline"}
      key={option.text}
      onClick={() => handleClick(option.rsvpResponse)}
      className={cn(
        "p-2  rounded-md border border-customRed transition-colors sm:hover:bg-red-300 sm:hover:text-white",
        className,
        selectedOption === option.rsvpResponse ? "bg-customRed text-white" : ""
      )}
    >
      {option.text}
    </button>
  );
};

export default RsvpResponseButton;
