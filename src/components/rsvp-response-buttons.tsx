"use client";
import { RsvpResponse } from "@prisma/client";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RsvpResponseButtonsProps {
  options: {
    text: string;
    rsvpResponse: RsvpResponse;
  }[];
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
}

const RsvpResponseButtons = ({
  options,
  selectedOption,
  setSelectedOption,
}: RsvpResponseButtonsProps) => {
  const handleClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="w-full flex flex-col items-center p-2">
      <div className="flex flex-col gap-2 w-full">
        {options.map((option) => (
          <button
            //variant={"outline"}
            key={option.text}
            onClick={() => handleClick(option.rsvpResponse)}
            className={cn(
              "w-full p-2 rounded-md border border-customRed transition-colors sm:hover:bg-red-300 sm:hover:text-white",
              selectedOption === option.rsvpResponse
                ? "bg-customRed text-white"
                : ""
            )}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RsvpResponseButtons;
