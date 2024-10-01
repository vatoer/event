"use server"

import { auth } from "@auth/auth";
import { checkInGuest, getRsvpAttendanceCheckin, getRsvpForEvent } from "@/data/guest"
import { Rsvp,Guest } from "@prisma/client"
import { ActionResponse, ErrorResponse } from "./response";
import { revalidatePath } from "next/cache";
import { GuestWithRsvp,RsvpGuest } from "@/data/guest";
export type { GuestWithRsvp,RsvpGuest };
import { Guest as ZGuest } from "@/zod/schemas/guest";

const getUserEmail = async (): Promise<ActionResponse<string>> => {
    const session = await auth();
    if (!session || !session.user) {
        return { 
            success: false, 
            error: "User not authenticated",
            message: "User not authenticated" };
    }

    const user = session.user;
    user.email = user.email ?? "NON EXISTING EMAIL";
    return { success: true, data: user.email };
}

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
            email: r.guest.email ?? ""
        }
    });

    return options;

}

export interface GuestAttendance extends Rsvp {
    guest: Guest;
}

export const getGuestAttendanceCheckinByMe = async (): Promise<ActionResponse<GuestAttendance[]>> => {
    const checkUserEmail = await getUserEmail();

    if (!checkUserEmail.success) {
        return checkUserEmail;
    }

    const rsvp = await getRsvpAttendanceCheckin("resdip79", checkUserEmail.data);
    return { success: true, data: rsvp };
    
}




export const setCheckIn = async (rsvpId: string, attending: boolean): Promise<ActionResponse<GuestAttendance>> => {
    const checkUserEmail = await getUserEmail();

    if (!checkUserEmail.success) {
        return checkUserEmail;
    }
    
    const checkin = await checkInGuest(rsvpId, attending, checkUserEmail.data);
    revalidatePath(`/r/${rsvpId}`);
    console.log(checkin);
    return { success: true, data: checkin };
}

export const simpanDataGuest = async (data: ZGuest): Promise<ActionResponse<Guest>> => {
    console.log(data);
    return { success: false, error: "Not implemented yet" };
}

export const deleteGuest = async (id: string): Promise<ActionResponse<Guest>> => {
    return { success: false, error: "Not implemented yet" };
}