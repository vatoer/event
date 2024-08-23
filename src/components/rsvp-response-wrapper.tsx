import { RsvpResponse } from "@prisma/client";
import RsvpResponseButtons from "./rsvp-response-buttons";

interface RsvpResponseWrapperProps {
  id: string;
  rsvpResponse?: RsvpResponse | null;
}

const RsvpResponseWrapper = ({
  id,
  rsvpResponse,
}: RsvpResponseWrapperProps) => {
  return (
    <div className="flex flex-col w-full mt-2">
      {rsvpResponse && (
        <div className="w-full items-center text-sm justify-center flex-col leading-7 text-gray-900 sm:truncate sm:tracking-tight text text-center">
          <h1>Your response</h1>
          <h1 className="font-semibold text-xl text-customRed underline">{rsvpResponse}</h1>

          <div className="w-full items-center text-sm justify-center flex-col leading-5 m-4 text-gray-900 sm:truncate sm:tracking-tight text text-center">
            <p>Thank you for your response. Your RSVP has been recorded</p>
            <p>to update your response please click button below</p>
          </div>
        </div>
      )}

      <RsvpResponseButtons rsvpId={id} />
    </div>
  );
};

export default RsvpResponseWrapper;
