import { Guest, Rsvp } from "@prisma/client";
import { blurEmail, blurName } from "@/utils/blurdata";

interface GuestWrapperProps {
  guest: Guest;
  rsvp: Rsvp;
  blur?: boolean;
}

const blurGuest = (guest: Guest) => {
  return {
    ...guest,
    name: `${guest.prefix ?? ""} ${blurName(guest.firstName ?? "")} ${blurName(
      guest.lastName ?? ""
    )}`,
    email: blurEmail(guest.email),
  };
};

const GuestWrapper = ({ guest, blur, rsvp }: GuestWrapperProps) => {
  const guestFullname = `${guest.prefix ?? ""} ${guest.firstName ?? ""} ${guest.lastName??""} `
  return (
    <div className="w-full items-center justify-center flex flex-col mt-2 p-2 border-customRed border-x-0 border-2 ">
      <div>{guestFullname}</div>      
      {rsvp.rsvpResponse === "REPRESENTEDBY" && (
        <div>Represented By: {rsvp.representedBy}</div>
      )}
    </div>
  );
};

export default GuestWrapper;
