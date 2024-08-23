import { RsvpResponse } from "@prisma/client";
import RsvpResponseButton from "./rsvp-response-button";
import { Button } from "./ui/button";

interface RsvpResponseButtonsProps {
    rsvpId: string;
}

const RsvpResponseButtons = ({rsvpId}:RsvpResponseButtonsProps) => {
    return ( 
        <div className="flex gap-2 w-full justify-center">
            <RsvpResponseButton text="Yes, I will attend" value={RsvpResponse.YES} primary={true} rsvpId={rsvpId} />
            <RsvpResponseButton text="Maybe" value={RsvpResponse.MAYBE} rsvpId={rsvpId} />
            <RsvpResponseButton text="No" value={RsvpResponse.NO} rsvpId={rsvpId} />
        </div>
     );
}
 
export default RsvpResponseButtons;