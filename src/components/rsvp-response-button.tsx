"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { RsvpResponse } from "@prisma/client";

interface RsvpResponseButtonProps {
  rsvpId: string;
  text: string;
  value: RsvpResponse;
  isSelected?: boolean;
  onClickResponse?: (value: RsvpResponse) => void;
}

const RsvpResponseButton = ({
  rsvpId,
  text,
  value,
  isSelected,
  onClickResponse,
}: RsvpResponseButtonProps) => {
  const handleClick = async () => {
    onClickResponse && onClickResponse(value);
    // console.log(value);
    // const rsvpResponse = await responseRsvp(rsvpId,value);
    // if (rsvpResponse.success) {
    //     onClickResponse && onClickResponse(value);
    //     console.log(rsvpResponse.data.value);
    // } else {
    //     console.log("Error");
    // }
  };

  return (
    <Button
      variant={"outline"}
      className={cn("w-full", isSelected && "bg-red-500")}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default RsvpResponseButton;