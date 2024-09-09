"use client";
import { RsvpResponse } from "@prisma/client";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import RsvpResponseButton from "./rsvp-response-button";

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

  const rsvpResponseOptions = {
    yes: { text: "Yes, I graciously accept", rsvpResponse: RsvpResponse.YES },
    no: { text: "No, I regretly decline", rsvpResponse: RsvpResponse.NO },
    representedBy: {
      text: "Yes, I am represented by",
      rsvpResponse: RsvpResponse.REPRESENTEDBY,
    },
  };

  return (
    <div className="w-full flex flex-col items-center p-2">
      <div className="flex flex-col gap-2 w-full">
        <RsvpResponseButton
          option={rsvpResponseOptions.yes}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          className="w-full p-4 my-1"
        />

        <RsvpResponseButton
          option={rsvpResponseOptions.no}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          className="w-full p-4 my-1"
        />

        <RsvpResponseButton
          option={rsvpResponseOptions.representedBy}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          className="w-full p-4 my-1"
        />

        <div className="flex flex-row w-full gap-2"></div>
      </div>
    </div>
  );
};

export default RsvpResponseButtons;
