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

export async function updateRsvpBackend( id: string, rsvpResponse: RsvpResponse, note?: string|null) {
  const rsvp = await dbEvent.rsvp.update({
    where: {
      id,
    },
    data: {
      rsvpResponseUpdated: rsvpResponse,
      note: note, // repsentedBy + note
    },
  });
  return rsvp;
}

const eventId = 'your-event-id'; // Replace with the actual event ID

export interface RsvpSummary {
  rsvp_response: RsvpResponse | "NOTRESPONDING";
  count: number;
}
export const getRsvpSummaryByResponse = async (eventId: string):Promise<RsvpSummary[]> => {

    const result = await dbEvent.$queryRaw<RsvpSummary[]>`
    SELECT 
      CASE 
        WHEN rsvp_response IS NULL THEN 'NOTRESPONDING' 
        ELSE rsvp_response::text 
      END AS rsvp_response, 
      COUNT(*) AS count 
    FROM 
      public.rsvps 
    WHERE 
      event_id = 'resdip79' -- Replace with the actual event ID
    GROUP BY 
      CASE 
        WHEN rsvp_response IS NULL THEN 'NOTRESPONDING' 
        ELSE rsvp_response::text 
      END;
    `
    return result;
}

export const getRsvpSummaryByResponseUpdatedByAdmin = async (eventId: string):Promise<RsvpSummary[]> => {

  const result = await dbEvent.$queryRaw<RsvpSummary[]>`
  SELECT 
    CASE 
      WHEN rsvp_response_updated IS NULL THEN 'NOTRESPONDING' 
      ELSE rsvp_response_updated::text 
    END AS rsvp_response, 
    COUNT(*) AS count 
  FROM 
    public.rsvps 
  WHERE 
    event_id = 'resdip79' -- Replace with the actual event ID
  GROUP BY 
    CASE 
      WHEN rsvp_response_updated IS NULL THEN 'NOTRESPONDING' 
      ELSE rsvp_response_updated::text 
    END;
  `
  return result;
}