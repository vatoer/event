import { Guest } from "@prisma/client";
import { blurEmail, blurName } from "@/utils/blurdata";


interface GuestWrapperProps {
    guest: Guest;
    blur?: boolean;
}

const blurGuest = (guest: Guest) => {
    return {
        ...guest,
        name: `${guest.prefix ?? ""} ${blurName(guest.firstName ?? "")} ${blurName(guest.lastName ?? "")}`,
        email: blurEmail(guest.email),
    };
}

const GuestWrapper = ({guest,blur}:GuestWrapperProps) => {
    if (blur) {
        guest = blurGuest(guest);
    }
    return ( 
        <div className="w-full items-center justify-center flex flex-col mt-2 border-customRed border-x-0 border-2">
            <div>{guest.name}</div>
            <div>{guest.email}</div>
        </div>
     );
}
 
export default GuestWrapper;