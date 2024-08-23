import { Guest } from "@prisma/client";
import { blurEmail, blurName } from "@/utils/blurdata";


interface GuestWrapperProps {
    guest: Guest;
    blur?: boolean;
}

const blurGuest = (guest: Guest) => {
    return {
        ...guest,
        name: blurName(guest.name),
        email: blurEmail(guest.email),
    };
}

const GuestWrapper = ({guest,blur}:GuestWrapperProps) => {
    if (blur) {
        guest = blurGuest(guest);
    }
    return ( 
        <div className="w-full items-center justify-center flex flex-col mt-2 border-customRed border-x-0 border-2">
            <div>Guest: {guest.name}</div>
            <div>Ambassador</div>
            <div>Email: {guest.email}</div>
        </div>
     );
}
 
export default GuestWrapper;