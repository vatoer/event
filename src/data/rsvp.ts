import { dbEvent } from "@/lib/db-event";
import {  RsvpResponse } from "@prisma/client";

export async function getRsvp(eventId: string, id: string) {
  const rsvp = await dbEvent.rsvp.findFirst({
    include: {
        guest: true,
        event: true,
        },
    where: {
      eventId,
      id,
    },
  });
  return rsvp;
}

export async function updateRsvp( id: string, rsvpResponse: RsvpResponse, respresentedBy?: string) {
  const rsvp = await dbEvent.rsvp.update({
    where: {
      id,
    },
    data: {
      rsvpResponse,
      representedBy: respresentedBy,
    },
  });
  return rsvp;
}