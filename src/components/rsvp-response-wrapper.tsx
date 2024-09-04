"use client";
import { RsvpResponse } from "@prisma/client";
import RsvpResponseButtons from "./rsvp-response-buttons";
import { useState } from "react";
import { Button } from "./ui/button";
import responseRsvp from "@/actions/rsvp";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface RsvpResponseWrapperProps {
  id: string;
  rsvpResponse: RsvpResponse | null;
}

const RsvpResponseWrapper = ({
  id,
  rsvpResponse,
}: RsvpResponseWrapperProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    rsvpResponse || RsvpResponse.YES
  );
  const [isEditing, setIsEditing] = useState<Boolean>(
    rsvpResponse ? false : true
  );

  const options = [
    { text: "Yes, I will attend", rsvpResponse: RsvpResponse.YES },
    { text: "Maybe", rsvpResponse: RsvpResponse.MAYBE },
    { text: "No", rsvpResponse: RsvpResponse.NO },
    { text: "Yes, Represented by", rsvpResponse: RsvpResponse.REPRESENTEDBY },
  ];

  const [temporarilySelectedOption, setTemporarilySelectedOption] = useState<
    string | null
  >(null);

  const handleOnSelect = async (option: string) => {
    console.log("[option]", option);
    console.log("[selectedOption]", selectedOption);
    console.log("[temporarilySelectedOption]", temporarilySelectedOption);
    setSelectedOption(option);
    if (option !== RsvpResponse.REPRESENTEDBY) {
      setIsEditing(false);
      const rsvp = await responseRsvp(id, option as RsvpResponse, "");
      console.log("[rsvp]", rsvp);
    }
  };

  const [representedBy, setRepresentedBy] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log("[selectedOption]", selectedOption);
    console.log("[temporarilySelectedOption]", temporarilySelectedOption);

    if (selectedOption === RsvpResponse.REPRESENTEDBY && !representedBy) {
      alert("Please fill a name in the field");
      return;
    } else if (selectedOption === RsvpResponse.REPRESENTEDBY && representedBy) {
      setIsEditing(false);
      const rsvp = await responseRsvp(
        id,
        RsvpResponse.REPRESENTEDBY,
        representedBy?.trim()
      );
      console.log("[rsvp]", rsvp);
    }
  };

  let responseText = "";
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

  return (
    <div className="flex flex-col w-full mt-2">
      {rsvpResponse && (
        <div className="w-full items-center text-sm justify-center flex-col leading-7 text-gray-900 sm:tracking-tight text text-center">
          <h1>Your response</h1>
          <h1 className="font-bold text-customRed underline">{responseText}</h1>
          {!isEditing && (
            <div className="flex flex-wrap justify-center w-full p-2">
            <p className="w-full sm:w-2/3 break-words overflow-hidden">{ackText}</p>
          </div>
          )}
        </div>
      )}

      <div className="flex flex-col p-2">
        {!isEditing && (
          <Button
            className={cn("w-full",
              selectedOption === RsvpResponse.NO ? "bg-blue-500 text-white" : "text-gray-400 text-xs"
            )}
            variant={"outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            Edit
          </Button>
        )}

        {isEditing && (
          <>
            <RsvpResponseButtons
              options={options}
              selectedOption={selectedOption}
              temporarilySelectedOption={temporarilySelectedOption}
              setSelectedOption={handleOnSelect}
            />

            {selectedOption === RsvpResponse.REPRESENTEDBY && (
              <>
                <div className="w-full flex flex-col items-center p-2">
                  <input
                    maxLength={50}
                    type="text"
                    placeholder="Represented by"
                    value={representedBy ?? ""}
                    onChange={(e) => setRepresentedBy(e.target.value)}
                    className="w-full p-2 border border-blue-400 rounded-md"
                  />
                </div>
                <Button className="w-full bg-blue-700" onClick={handleSubmit}>
                  Submit
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RsvpResponseWrapper;
