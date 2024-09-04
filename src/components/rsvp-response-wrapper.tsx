"use client";
import { RsvpResponse } from "@prisma/client";
import RsvpResponseButtons from "./rsvp-response-buttons";
import { useState } from "react";
import { Button } from "./ui/button";
import responseRsvp from "@/actions/rsvp";

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

  const handleOnSelect = async (option: string) => {
    setSelectedOption(option);
    if (option !== RsvpResponse.REPRESENTEDBY) {
      setIsEditing(false);
      // submit form
      const rsvp = await responseRsvp(id, option as RsvpResponse);
    }
  }

  const [representedBy, setRepresentedBy] = useState<string | null>(null);
  const handleOnRepresentedBy = async() => {
    if(!representedBy) {
      alert("Please fill a name in the field");
      return};
    setIsEditing(false);
    // submit form
    const rsvp = await responseRsvp(id, RsvpResponse.REPRESENTEDBY, representedBy?.trim());
  }

  return (
    <div className="flex flex-col w-full mt-2">
      {rsvpResponse && (
        <div className="w-full items-center text-sm justify-center flex-col leading-7 text-gray-900 sm:truncate sm:tracking-tight text text-center">
          <h1>Your response</h1>
          <h1 className="font-semibold text-xl text-customRed underline">
            {selectedOption}
          </h1>
          {!isEditing && (
            <div className="w-full items-center text-sm justify-center flex-col leading-5 m-4 text-gray-900 sm:truncate sm:tracking-tight text text-center">
              <p>Thank you for your response. Your RSVP has been recorded</p>
              <p>to update your response please click button below</p>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col p-2">
        {!isEditing && (
          <Button
            className="w-full"
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
              setSelectedOption={handleOnSelect}
            />
            {selectedOption === RsvpResponse.REPRESENTEDBY && (
              <>
                <div className="w-full flex flex-col items-center p-2">
                  <input
                    type="text"
                    placeholder="Represented by"
                    value={representedBy ?? ""}
                    onChange={(e) => setRepresentedBy(e.target.value)}
                    className="w-full p-2 border border-blue-400 rounded-md"
                  />
                </div>
                <div className="w-full flex flex-col items-center p-2">
                  <Button
                    className="w-full bg-blue-700"
                    onClick={handleOnRepresentedBy}
                  >
                    Submit
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RsvpResponseWrapper;
