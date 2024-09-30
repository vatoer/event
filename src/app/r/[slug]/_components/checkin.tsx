"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { OptionRsvp, setCheckIn } from "@/actions/guest";
import { rsvpGuest } from "@/data/rsvp";
import { Check } from "lucide-react";

interface FormCheckinProps {
  rsvp: rsvpGuest;
}
const FormCheckin = ({ rsvp }: FormCheckinProps) => {
  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const checkIn = async () => {
    const checkin = await setCheckIn(rsvp.id, true);
    if (!checkin.success) {
      console.error(checkin.error);
      return;
    }
  };

  const cancelCheckIn = async () => {
    const checkin = await setCheckIn(rsvp.id, false);
    if (!checkin.success) {
      console.error(checkin.error);
      return;
    }
    setIsEditing(false);
  };
  return (
    <div className="flex flex-col w-full p-2">
        <div className="flex flex-col w-full justify-center items-center p-2 gap-2">
            <h1>{rsvp.guest.profession}</h1>
            <h1 className="font-semibold">{rsvp.guest.institution}</h1>
        </div>
      <div className="flex flex-col w-full justify-center items-center p-2 gap-2">
        <h1 className="font-semibold text-2xl w-full text-center">Check-in</h1>
        <div className="w-full justify-center items-center">
          {rsvp.attending && (
            <div className="w-full flex flex-col items-center justify-center">
              <div className="flex flex-row gap-2">
                <Check size={24} />
                <div>
                  Checked-in at {rsvp.attendingAt?.toLocaleTimeString()}
                </div>
              </div>
              <div>
                <span>by: {rsvp.checkinBy}</span>
              </div>
              <div className="w-full mt-6">
                <Button
                  className="mt-2 bg-customRed hover:bg-red-700 w-full text-lg h-16"
                  onClick={cancelCheckIn}
                >
                  Cancel Check-in
                </Button>
              </div>
            </div>
          )}
          {!rsvp.attending && (
            <Button
              className="mt-2 bg-customRed hover:bg-red-700 w-full text-lg h-16"
              onClick={checkIn}
            >
              Check-in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCheckin;
