"use client";
import { RsvpResponse } from "@prisma/client";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RsvpResponseButtonsProps {
    options: {
        text: string;
        rsvpResponse: RsvpResponse;
      }[];
      initialRsvpResponse: RsvpResponse;
}

const RsvpResponseButtons = ({
    options,
    initialRsvpResponse,
}: RsvpResponseButtonsProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(initialRsvpResponse);

    const handleClick = (option: string) => {
      setSelectedOption(option);
    };

    return (
        <div className="w-full flex flex-col items-center p-2">
          <div className="flex flex-col gap-2 w-full">
            {options.map((option) => (
              <Button
                variant={"outline"}
                key={option.text}
                onClick={() => handleClick(option.rsvpResponse)}
                className={cn(
                    "w-full p-2 rounded-md transition-colors hover:bg-red-300 hover:text-white",
                    selectedOption === option.rsvpResponse
                        ? "bg-customRed text-white"
                        : "")
                }
                
              >
                {option.text}
              </Button>
            ))}
            <Button>
                Submit
            </Button>
          </div>
        </div>
      );
};

export default RsvpResponseButtons;
