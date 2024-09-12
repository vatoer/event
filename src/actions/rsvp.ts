"use server";
import { updateRsvp, updateRsvpBackend } from "@/data/rsvp";
import { ActionResponse } from "./response";
import { RsvpResponse } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@auth/auth";

interface ResponseRsvpResult {
  value: RsvpResponse;
  note?: string;
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


export const responseRsvpBackend = async (
  id: string,
  rsvpResponse: RsvpResponse,
  note?: string| null
): Promise<ActionResponse<ResponseRsvpResult>> => {
  console.log("[rsvpResponse]", rsvpResponse);

  const session = await auth();
  const user = session?.user;

  if (!user) {
    return {
      success: false,
      error: "Please login",
    };
  }

  if (rsvpResponse === RsvpResponse.REPRESENTEDBY && !note) {
    return {
      success: false,
      error: "Please provide a name",
    };
  }

  
  const rsvp = await updateRsvpBackend(id, rsvpResponse, user.email!,  note);
  console.log("[rsvp]", rsvp);

  return {
    success: true,
    data: {
      value: rsvp.rsvpResponseUpdated!,
      note: rsvp.note ?? "",
    },
  };
};

export default responseRsvp;
