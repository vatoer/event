"use server"

import { getRsvpForEvent } from "@/data/guest"
import { Rsvp,Guest } from "@prisma/client"

export interface OptionRsvp extends Rsvp {
    value: string;
    label: string;
    guest: Guest;
}

export const getRsvpOptions = async () => {
    const rsvp = await getRsvpForEvent("resdip79");
    console.log(rsvp);    

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