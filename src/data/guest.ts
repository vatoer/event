import { dbEvent } from "@/lib/db-event";
import { Guest, Rsvp } from "@prisma/client";

interface rsvpGuest extends Rsvp {
  guest: Guest;
}

export interface RsvpGuest extends Rsvp {
  guest: Guest;
}

export interface GuestWithRsvp extends Guest {
  Rsvp: Rsvp[];
}

export const getGuestForEvent = async (
  eventId: string
): Promise<GuestWithRsvp[]> => {
  const guests = await dbEvent.guest.findMany({
    where: {
      Rsvp: {
        some: {
          eventId,
        },
      },
    },
    include: {
      Rsvp: true,
    },
  });

  return guests;
};

export const getRsvpForEvent = async (
  eventId: string,
  id?: string
): Promise<RsvpGuest[]> => {
  const rsvp = await dbEvent.rsvp.findMany({
    where: {
      eventId,
    },
    include: {
      guest: true,
    },
  });
  return rsvp;
};

export const getRsvpAttendanceCheckin = async (
  eventId: string,
  by?: string
): Promise<rsvpGuest[]> => {
  const rsvp = await dbEvent.rsvp.findMany({
    where: {
      eventId,
      checkinBy: by,
      attending: true,
    },
    include: {
      guest: true,
    },
  });
  return rsvp;
};

export const checkInGuest = async (
  rsvpId: string,
  attending: boolean,
  checkinBy: string
): Promise<rsvpGuest> => {
  const rsvp = await dbEvent.rsvp.update({
    where: {
      id: rsvpId,
    },
    data: {
      attending,
      attendingAt: attending ? new Date() : null,
      checkinBy,
    },
    include: {
      guest: true,
    },
  });
  return rsvp;
};

// export interface RsvpSummary {
//     rsvp_response: RsvpResponse | "NOTRESPONDING";
//     count: number;
//   }
//   export const getRsvpSummaryByResponse = async (eventId: string):Promise<RsvpSummary[]> => {

//       const result = await dbEvent.$queryRaw<RsvpSummary[]>`
//       SELECT
//         CASE
//           WHEN rsvp_response IS NULL THEN 'NOTRESPONDING'
//           ELSE rsvp_response::text
//         END AS rsvp_response,
//         COUNT(*) AS count
//       FROM
//         public.rsvps
//       WHERE
//         event_id = 'resdip79' -- Replace with the actual event ID
//       GROUP BY
//         CASE
//           WHEN rsvp_response IS NULL THEN 'NOTRESPONDING'
//           ELSE rsvp_response::text
//         END;
//       `
//       return result;
//   }
