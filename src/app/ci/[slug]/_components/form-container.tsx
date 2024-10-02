"use client";
import { OptionRsvp, setCheckIn } from "@/actions/guest";
import { SelectRsvp } from "./select-rsvp";
import { useState } from "react";
import { Guest, Rsvp } from "@prisma/client";
import RsvpResponseWrapperBackEnd from "@/components/rsvp-response-wrapper-be";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check } from "lucide-react";
import ContainerCheckinBy from "./container-checkin-by";

interface FormContainerProps {
  rsvpOptions: OptionRsvp[];
}
const FormContainer = ({ rsvpOptions }: FormContainerProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionRsvp | null>(null);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const onChange = (value: OptionRsvp | null) => {
    console.log("Selected option:", value);
    setSelectedOption(value);
  };

  const checkIn = async () => {
    console.log("Selected option:", selectedOption);

    if (!selectedOption) {
      return;
    }

    const checkin = await setCheckIn(selectedOption.id, true);
    if (!checkin.success) {
      console.error(checkin.error);
      return;
    }

    setSelectedOption((prev) => {
      if (prev) {
        return { ...prev, attending: true };
      }
      return null;
    });
  };

  const cancelCheckIn = async () => {
    console.log("Selected option:", selectedOption);
    if (!selectedOption) {
      return;
    }

    const checkin = await setCheckIn(selectedOption.id, false);
    if (!checkin.success) {
      console.error(checkin.error);
      return;
    }
    setSelectedOption((prev) => {
      if (prev) {
        return { ...prev, attending: false };
      }
      return null;
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col p-2 items-center gap-4 justify-start h-full w-full">
      
      <div className="flex w-full sm:w-2/3 border  max-h-[200px] sm:max-h-1/2 overflow-y-auto">
        <ContainerCheckinBy />
      </div>
      <div className="flex-grow sm:hidden"></div>
      {selectedOption && (
        <GuestDetails
          rsvp={selectedOption}
          guest={selectedOption.guest}
          attending={selectedOption.attending || false}
          className="block sm:hidden py-2"
        />
      )}
      <div className="w-full sm:w-2/3">
        <SelectRsvp
          initialOption={null}
          optionsRsvp={rsvpOptions}
          onChange={onChange}
        />
      </div>

      <div className="flex flex-col w-full items-center justify-center gap-2">
        {selectedOption && (
          <GuestDetails
            rsvp={selectedOption}
            guest={selectedOption.guest}
            attending={selectedOption.attending || false}
            className="hidden sm:flex mt-36"
          />
        )}

        {selectedOption && !selectedOption.attending && (
          <Button
            className="mt-2 bg-customRed hover:bg-red-700  w-full sm:w-1/2 text-lg h-16"
            onClick={checkIn}
          >
            Check-in
          </Button>
        )}

        {selectedOption && selectedOption.attending && (
          <Button
            variant={"outline"}
            className="mt-2 w-full bg-gray-200 shadow-sm sm:w-1/2 text-lg h-16"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Cancel edit" : "Edit Check-in"}
          </Button>
        )}

        {selectedOption && selectedOption.attending && isEditing && (
          <Button
            className="mt-2 text-customRed  w-full sm:w-1/2 text-lg h-16"
            onClick={cancelCheckIn}
          >
            <span>Cancel Check-in</span>
            <AlertTriangle className="w-12 h-12 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

const GuestDetails = ({
  rsvp,
  guest,
  attending,
  className,
}: {
  rsvp: Rsvp;
  guest: Guest;
  attending: boolean;
  className: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-10 sm:gap-2 items-center w-full sm:w-2/3  justify-center border",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col w-full gap-1 py-2 items-center justify-center"
        )}
      >
        <h1 className="font-semibold text-2xl w-full text-center">{`${guest.firstName} ${guest.lastName}`}</h1>
        <h1 className="font-semibold text-lg w-full text-center">{`${guest.profession}`}</h1>
        <h1 className="font-semibold text-xl w-full text-center">{`${guest.institution}`}</h1>

        


        {rsvp.representedBy && (
          <h1 className="font-semibold text-lg w-full text-center">{`Represented by: ${rsvp.representedBy}`}</h1>
        )}

        {rsvp.rsvpResponseUpdated && (
          <h1 className="font-semibold text-lg w-full text-center">{`Notes: ${rsvp.note}`}</h1>
        )}

      </div>
      {attending && (
        <div className="flex w-full items-center justify-center border-t py-2">
          <div className="flex bg-blue-600 rounded-full p-2 w-12 h-12 justify-center items-center">
            <Check className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormContainer;
