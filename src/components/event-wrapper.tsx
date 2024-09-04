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
      <div className="w-full items-center justify-center flex-col leading-5 sm:leading-6 text-gray-900 sm:truncate sm:tracking-tight text text-center">
        <h1 className="m-1">RSVP FORM</h1>
        <h1 className="">Diplomatic Reception Commemorating 
        </h1>
        <h1></h1>
        <h1>
        the 79<sup>th</sup>Anniversary of the Independence Day
        </h1>
        <h1>of the Republic of Indonesia</h1>
        <h1>and</h1>
        <h1>
        the 79<sup>th</sup> Anniversary  of the Armed Forces 
        </h1>
        <h1>of the Republic of Indonesia</h1>
      </div>

      <div className="w-full items-center justify-center flex flex-col px-2 my-4 text-xs">
        <span>Date/Time: {formattedDate} / {formattedTime}</span>        
        <span>Venue: {event.location}</span>
      </div>
    </>
  );
};

export default EventWrapper;
