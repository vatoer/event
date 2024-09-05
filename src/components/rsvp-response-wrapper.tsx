"use client";
import { Rsvp, RsvpResponse } from "@prisma/client";
import RsvpResponseButtons from "./rsvp-response-buttons";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import responseRsvp from "@/actions/rsvp";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface RsvpResponseWrapperProps {
  rsvp: Rsvp;
}

const RsvpResponseWrapper = ({ rsvp }: RsvpResponseWrapperProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    rsvp.rsvpResponse || RsvpResponse.YES
  );
  const [isEditing, setIsEditing] = useState<Boolean>(
    rsvp.rsvpResponse ? false : true
  );

  const options = [
    { text: "Yes, I will attend", rsvpResponse: RsvpResponse.YES },
    { text: "Maybe", rsvpResponse: RsvpResponse.MAYBE },
    { text: "No", rsvpResponse: RsvpResponse.NO },
    { text: "Yes, Represented by", rsvpResponse: RsvpResponse.REPRESENTEDBY },
  ];

  let responseText = "";

  const handleOnSelect = async (option: string) => {
    console.log("[option]", option);
    console.log("[selectedOption]", selectedOption);
    setSelectedOption(option);
    if (option !== RsvpResponse.REPRESENTEDBY) {
      setIsEditing(false);
      const updatersvp = await responseRsvp(
        rsvp.id,
        option as RsvpResponse,
        ""
      );
      console.log("[rsvp]", updatersvp);
    }
  };

  const [representedBy, setRepresentedBy] = useState<string | null>(
    rsvp.rsvpResponse === RsvpResponse.REPRESENTEDBY ? rsvp.representedBy : null
  );

  const handleSubmit = async () => {
    console.log("[selectedOption]", selectedOption);

    if (selectedOption === RsvpResponse.REPRESENTEDBY && !representedBy) {
      alert("Please fill a name in the field");
      return;
    } else if (selectedOption === RsvpResponse.REPRESENTEDBY && representedBy) {
      setIsEditing(false);
      const updatersvp = await responseRsvp(
        rsvp.id,
        RsvpResponse.REPRESENTEDBY,
        representedBy?.trim()
      );
      console.log("[rsvp]", updatersvp);
    }
  };

  let ackText =
    "Thank you for your response. We look forward to welcoming you to the event.";

  const representative =
    representedBy && representedBy.trim() !== "" ? representedBy : "[Name]";
  switch (selectedOption) {
    case RsvpResponse.YES:
      responseText = "Yes, I graciously accept";
      break;
    case RsvpResponse.REPRESENTEDBY:
      responseText = "Yes, I am represented by " + representative;
      break;
    case RsvpResponse.NO:
      responseText = "No, I regretfully decline";
      ackText =
        "Thank you. Your response has been recorded. To update your response, please click the button below.";
      break;
    default:
      break;
  }

  useEffect(() => {
    if (selectedOption === "REPRESENTEDBY" && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });

      // Focus on the input element after scrolling
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 500); // Adjust the timeout duration as needed
    }
  }, [selectedOption]);

  return (
    <div className="flex flex-col w-full mt-2">
      {rsvp.rsvpResponse && (
        <div className="w-full items-center text-sm justify-center flex-col leading-7 text-gray-900 sm:tracking-tight text text-center">
          <h1>Your response</h1>
          <h1 className="font-bold text-customRed underline">{responseText}</h1>
          {!isEditing && (
            <div className="flex flex-wrap justify-center w-full p-2">
              <p className="w-full sm:w-2/3 break-words overflow-hidden">
                {ackText}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center w-full px-4 py-0">
      {!rsvp.rsvpResponse && selectedOption !==RsvpResponse.REPRESENTEDBY && (
        <span className="">Please select your response below</span>
      )}
      {rsvp.rsvpResponse && isEditing && selectedOption!==RsvpResponse.REPRESENTEDBY &&  (
        <span className="">Please select to update your response</span>
      )}

      {isEditing && selectedOption===RsvpResponse.REPRESENTEDBY && (
        <span className="">Kindly fill in the name of the person who will represent you</span>
      )}

      </div>

      <div className="flex flex-col p-2">
        {!isEditing && (
          <>
            <Button
              className={cn(
                "w-full",
                selectedOption === RsvpResponse.NO
                  ? "bg-blue-500 text-white mt-2"
                  : "text-gray-400 text-xs",
                selectedOption !== RsvpResponse.NO && "mt-32"
              )}
              variant={"outline"}
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit
            </Button>
          </>
        )}

        {isEditing && (
          <>
            <RsvpResponseButtons
              options={options}
              selectedOption={selectedOption}
              setSelectedOption={handleOnSelect}
            />

            {selectedOption === RsvpResponse.REPRESENTEDBY && (
              <div ref={scrollRef} className="w-full flex flex-col gap-2 px-2">
                  <input
                    ref={inputRef}
                    maxLength={50}
                    type="text"
                    placeholder="Represented by"
                    value={representedBy ?? ""}
                    onChange={(e) => setRepresentedBy(e.target.value)}
                    className="w-full p-2 border border-blue-400 rounded-md"
                  />
                <Button className="w-full bg-blue-700" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RsvpResponseWrapper;
