"use client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import responseRsvp from "@/actions/rsvp";
import { RsvpResponse } from "@prisma/client";

interface RsvpResponseButtonProps {
    rsvpId: string;
    text: string;
    value: RsvpResponse;
    primary?: boolean;
}
const RsvpResponseButton = ({rsvpId,text, value, primary}:RsvpResponseButtonProps) => {

    const handleClick = async () => {
        console.log(value);
        const rsvpResponse = await responseRsvp(rsvpId,value);
        if (rsvpResponse.success) {
            console.log(rsvpResponse.data.value);
        } else {
            console.log("Error");
        }
    }

    return ( 
        <Button 
            variant={primary ? "default" : "outline"}
            className={cn(
            primary && "bg-customRed")}
            onClick={handleClick}
        >{text}</Button>
     );
}
 
export default RsvpResponseButton;