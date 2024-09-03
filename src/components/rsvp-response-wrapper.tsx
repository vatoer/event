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
  const initialRsvpResponse = rsvpResponse || RsvpResponse.YES;
  const options = [
    { text: "Yes, I will attend", rsvpResponse: RsvpResponse.YES },
    { text: "Maybe", rsvpResponse: RsvpResponse.MAYBE },
    { text: "No", rsvpResponse: RsvpResponse.NO },
    { text: "Yes, Represented by", rsvpResponse: RsvpResponse.REPRESENTEDBY },
  ];

  return (
    <div className="flex flex-col w-full mt-2">
      {rsvpResponse && (
        <div className="w-full items-center text-sm justify-center flex-col leading-7 text-gray-900 sm:truncate sm:tracking-tight text text-center">
          <h1>Your response</h1>
          <h1 className="font-semibold text-xl text-customRed underline">
            {rsvpResponse}
          </h1>

          <div className="w-full items-center text-sm justify-center flex-col leading-5 m-4 text-gray-900 sm:truncate sm:tracking-tight text text-center">
            <p>Thank you for your response. Your RSVP has been recorded</p>
            <p>to update your response please click button below</p>
          </div>
        </div>
      )}

      <div>
        <RsvpResponseButtons options={options} initialRsvpResponse={initialRsvpResponse} />
      </div>
    </div>
  );
};

export default RsvpResponseWrapper;
