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
      key={option.text}
      onClick={() => handleClick(option.rsvpResponse)}
      className={cn(
        "px-1 py-2  rounded-md border border-customRed transition-colors sm:hover:bg-red-300 sm:hover:text-white text-sm",
        className,
        selectedOption === option.rsvpResponse ? "bg-customRed text-white" : "",
      )}
    >
      {option.text}
    </button>
  );
};

export default RsvpResponseButton;
