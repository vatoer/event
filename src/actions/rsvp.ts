"use server";
import { updateRsvp } from "@/data/rsvp";
import { ActionResponse } from "./response";
import { RsvpResponse } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface ResponseRsvpResult  {
    value: RsvpResponse;
}
const responseRsvp = async (id:string, rsvpResponse:RsvpResponse):Promise<ActionResponse<ResponseRsvpResult>> => {
    console.log("[rsvpResponse]",rsvpResponse);

    const rsvp = await updateRsvp(id, rsvpResponse);
    revalidatePath(`/r/${id}`);

    return ( 
        {
            success: true,
            data: {
                value: rsvpResponse
            }
        }
     );
}
 
export default responseRsvp;