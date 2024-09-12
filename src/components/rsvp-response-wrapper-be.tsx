"use client";
import { Rsvp, RsvpResponse } from "@prisma/client";
import RsvpResponseButtons from "./rsvp-response-buttons";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import responseRsvp, { responseRsvpBackend } from "@/actions/rsvp";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import RsvpResponseButtonsBackEnd from "./rsvp-response-buttons-be";

interface RsvpResponseWrapperBackEndProps {
  rsvp: Rsvp;
}

const RsvpResponseWrapperBackEnd = ({
  rsvp: initialRsvp,
}: RsvpResponseWrapperBackEndProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [rsvp, setRsvp] = useState<Rsvp>(initialRsvp);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    rsvp.rsvpResponse || RsvpResponse.YES
  );
  const [isEditing, setIsEditing] = useState<Boolean>(
    rsvp.rsvpResponse ? false : true
  );
  const [note, setNote] = useState<string>("");

  const options = [
    { text: "Yes, I will attend", rsvpResponse: RsvpResponse.YES },
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
      const updatersvp = await responseRsvpBackend(
        rsvp.id,
        option as RsvpResponse,
        note
      );
      console.log("[rsvp]", updatersvp);
      setNote("");
      setRepresentedBy("");

      if (updatersvp.success) {
        setRsvp({
          ...rsvp,
          note: updatersvp.data.note ?? "",
          rsvpResponseUpdated: updatersvp.data.value as RsvpResponse,
        });
      }
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
      const updatersvp = await responseRsvpBackend(
        rsvp.id,
        RsvpResponse.REPRESENTEDBY,
        representedBy?.trim() + "; note: " + note
      );
      if (updatersvp.success) {
        setRsvp({
          ...rsvp,
          note: updatersvp.data.note!,
          rsvpResponseUpdated: updatersvp.data.value as RsvpResponse,
        });
      }
      console.log("[rsvp]", updatersvp);
      setNote("");
      setRepresentedBy("");
    }
  };

  let ackText = "Thank you for your response.";

  const representative =
    representedBy && representedBy.trim() !== "" ? representedBy : "[Name]";
  switch (selectedOption) {
    case RsvpResponse.YES:
      responseText = "Yes";
      break;
    case RsvpResponse.REPRESENTEDBY:
      responseText = "Yes, Represented by " + representative;
      break;
    case RsvpResponse.NO:
      responseText = "No";
      ackText = "Thank you";
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

  useEffect(() => {
    setNote("");
    setRepresentedBy("");
    setSelectedOption(rsvp.rsvpResponse || RsvpResponse.YES);

    if (rsvp.rsvpResponseUpdated) {
      setSelectedOption(rsvp.rsvpResponseUpdated);
      if (rsvp.note) {
        setNote(rsvp.note);
      }
    }
  }, [rsvp]);

  useEffect(() => {
    setRsvp(initialRsvp);
  }, [initialRsvp]);

  return (
    <div className="flex flex-col w-full mt-2 py-20">
      {!rsvp.rsvpResponse && !rsvp.rsvpResponseUpdated && (
        <div>
          <h1 className="text-white bg-gray-500 font-semibold text-2xl p-2 text-center my-2">
            BELUM ADA RESPONSE - {rsvp.id}
          </h1>
        </div>
      )}
      {rsvp.rsvpResponse && (
        <div className="border-blue-500 border w-full items-center text-sm justify-center flex-col leading-7 text-gray-900 sm:tracking-tight text text-center">
          <h1 className="font-semibold text-lg my-2">Response by Invitee</h1>
          <h1 className="font-bold text-customRed underline text-2xl">
            {rsvp.rsvpResponse}
          </h1>
          {!isEditing && (
            <div className="flex flex-wrap justify-center w-full p-2">
              <p className="w-full sm:w-2/3 break-words overflow-hidden">
                {ackText}
              </p>
            </div>
          )}
        </div>
      )}

      {rsvp.rsvpResponseUpdated && (
        <div className="border-green-700 mt-10 bg-gray-200 border w-full items-center text-sm justify-center flex-col leading-7 text-gray-900 sm:tracking-tight text text-center">
          <h1 className="font-semibold text-lg my-2">
            Updated Response by {rsvp.responseUpdatedBy} at{" "}
            {rsvp.responseUpdatedAt?.toLocaleDateString()} {rsvp.responseUpdatedAt?.toLocaleTimeString()}
          </h1>
          <h1 className="font-semibold text-lg my-2">{rsvp.id}</h1>
          <h1 className="font-bold text-customRed underline text-2xl">
            {rsvp.rsvpResponseUpdated}
          </h1>

          <div className="flex flex-wrap justify-center w-full p-2">
            <p className="w-full sm:w-2/3 break-words overflow-hidden">
              {rsvp.note}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center w-full px-4 py-0 mt-10">
        {/* {!rsvp.rsvpResponseUpdated &&
          selectedOption !== RsvpResponse.REPRESENTEDBY && (
            <h1 className="font-semibold text-lg my-8">Response</h1>
          )} */}
        {rsvp.rsvpResponseUpdated &&
          isEditing &&
          selectedOption !== RsvpResponse.REPRESENTEDBY && (
            <span className="">Update Response</span>
          )}

        {isEditing && selectedOption === RsvpResponse.REPRESENTEDBY && (
          <span className="">
            Kindly fill in the name of the person who will represent you
          </span>
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
            <div className="flex w-full p-2">
              <textarea
                placeholder="catatan: email,phone,etc"
                className="w-full border rounded-md border-blue-500 p-2"
                onChange={(e) => setNote(e.target.value)}
                value={note}
              ></textarea>
            </div>

            <RsvpResponseButtonsBackEnd
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

export default RsvpResponseWrapperBackEnd;
