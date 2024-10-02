"use server";

import { auth } from "@auth/auth";
import {
  checkInGuest,
  getRsvpAttendanceCheckin,
  getRsvpForEvent,
} from "@/data/guest";
import { Rsvp, Guest } from "@prisma/client";
import { ActionResponse, ErrorResponse } from "./response";
import { revalidatePath } from "next/cache";
import { GuestWithRsvp, RsvpGuest } from "@/data/guest";
export type { GuestWithRsvp, RsvpGuest };
import { Guest as ZGuest } from "@/zod/schemas/guest";
import { dbEvent } from "@/lib/db-event";
import { customAlphabet } from "nanoid";
import { Logger } from "tslog";
const logger = new Logger();



// Define an alphabet without '-' and '_'
const alphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const nanoid5 = customAlphabet(alphabet, 5);
const nanoid = customAlphabet(alphabet, 21);

function generateRandomAlphanumeric(length: number = 5): string {
  // Define possible characters (uppercase, lowercase, and digits)
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Generate the random alphanumeric ID
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

const getUserEmail = async (): Promise<ActionResponse<string>> => {
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      error: "User not authenticated",
      message: "User not authenticated",
    };
  }

  const user = session.user;
  user.email = user.email ?? "NON EXISTING EMAIL";
  return { success: true, data: user.email };
};

export interface OptionRsvp extends Rsvp {
  value: string;
  label: string;
  guest: Guest;
}

export const getRsvpOptions = async () => {
  const rsvp = await getRsvpForEvent("resdip79");
  //console.log(rsvp);

  const options: OptionRsvp[] = rsvp.map((r) => {
    return {
      ...r, // Spread all properties from the original Rsvp object
      value: r.id,
      label: `${r.guest.firstName} ${r.guest.lastName}`,
      profession: r.guest.profession ?? "",
      institution: r.guest.institution ?? "",
      email: r.guest.email ?? "",
    };
  });

  return options;
};

export interface GuestAttendance extends Rsvp {
  guest: Guest;
}

export const getGuestAttendanceCheckinByMe = async (): Promise<
  ActionResponse<GuestAttendance[]>
> => {
  const checkUserEmail = await getUserEmail();

  if (!checkUserEmail.success) {
    return checkUserEmail;
  }

  const rsvp = await getRsvpAttendanceCheckin("resdip79", checkUserEmail.data);
  return { success: true, data: rsvp };
};

export const setCheckIn = async (
  rsvpId: string,
  attending: boolean
): Promise<ActionResponse<GuestAttendance>> => {
  const checkUserEmail = await getUserEmail();

  if (!checkUserEmail.success) {
    return checkUserEmail;
  }

  const checkin = await checkInGuest(rsvpId, attending, checkUserEmail.data);
  revalidatePath(`/r/${rsvpId}`);
  logger.info(checkin);
  return { success: true, data: checkin };
};

export const simpanDataGuest = async (
  data: ZGuest
): Promise<ActionResponse<Guest>> => {
  const checkUserEmail = await getUserEmail();

  if (!checkUserEmail.success) {
    return checkUserEmail;
  }
  const byUser = checkUserEmail.data;

  try {
    const trans = await dbEvent.$transaction(async (db) => {
      const rsvpId = nanoid5();
      const fallbackId = nanoid();
      const {eventId, ...guestData} = data;
      const guest = await db.guest.upsert({
        where: { id: data.id || fallbackId }, //if data.id is null or undefined, use fallbackId
        create: { ...guestData, createdBy: byUser },
        update: { ...guestData, updatedBy: byUser },
      });

      const rsvp = await db.rsvp.upsert({
        where: {
          guestId_eventId: { eventId: data.eventId, guestId: guest.id },
        },
        create: { id: rsvpId, eventId: data.eventId, guestId: guest.id },
        update: { updatedBy: byUser, updatedAt: new Date() },
      });

      return { guest, rsvp };
    });
    revalidatePath(`/g/${data.eventId}`);
    return { success: true, data: trans.guest };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to save data" };
  }
};

export const deleteGuest = async (
  id: string
): Promise<ActionResponse<Guest>> => {
  return { success: false, error: "Not implemented yet" };
};
