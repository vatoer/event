"use server";
import { updateRsvp } from "@/data/rsvp";
import { ActionResponse } from "./response";
import { RsvpResponse } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface ResponseRsvpResult {
  value: RsvpResponse;
}
const responseRsvp = async (
  id: string,
  rsvpResponse: RsvpResponse,
  representedBy?: string
): Promise<ActionResponse<ResponseRsvpResult>> => {
  console.log("[rsvpResponse]", rsvpResponse);

  if (rsvpResponse === RsvpResponse.REPRESENTEDBY && !representedBy) {
    return {
      success: false,
      error: "Please provide a name",
    };
  }

  const rsvp = await updateRsvp(id, rsvpResponse,representedBy);
  revalidatePath(`/r/${id}`);

  return {
    success: true,
    data: {
      value: rsvpResponse,
    },
  };
};

export default responseRsvp;
