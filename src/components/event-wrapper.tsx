import { Event } from "@prisma/client";
import { format } from "date-fns";

interface EventWrapperProps {
  event: Event;
}
const EventWrapper = ({ event }: EventWrapperProps) => {
  const formattedDate = format(new Date(event.date), "dd MMMM yyyy");
  const formattedTime = format(new Date(event.date), "hh:mm a");

  return (
    <>
      <div className="w-full items-center text-sm justify-center flex-col font-semibold leading-5 sm:leading-7 text-gray-900 sm:truncate sm:tracking-tight text text-center">
        <h1 className="m-2">RSVP FORM</h1>
        <h1 className="">DIPLOMATIC RECEPTION</h1>
        <h1>COMMEMORATING</h1>
        <h1>
          THE 79<sup>TH</sup> INDEPENDENCE DAY OF
        </h1>
        <h1>THE REPUBLIC OF INDONESIA</h1>
      </div>

      <div className="w-full items-center justify-center flex flex-col px-2 my-4">
        <span>Date/Time: {formattedDate} / {formattedTime}</span>        
        <span>Venue: {event.location}</span>
      </div>
    </>
  );
};

export default EventWrapper;
