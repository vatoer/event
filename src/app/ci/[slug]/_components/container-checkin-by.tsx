"use client";
import { getGuestAttendanceCheckinByMe, GuestAttendance } from "@/actions/guest";
import { useEffect, useState } from "react";

interface ContainerCheckinByProps {
//   guest: GuestAttendance[];
}
export const ContainerCheckinBy = () => {
  const [guest, setGuest] = useState<GuestAttendance[]>([]);

  useEffect(() => {
    const fetchGuest = async () => {
      const response = await getGuestAttendanceCheckinByMe();
      if (!response.success) {
        console.error(response.error);
        return;
      }
      setGuest(response.data);
      console.log(response.data);
    };
    fetchGuest();
  }, []);

  return (
    <div className="max-h-[500px] w-full text-sm">
      <h1>Check-in by me</h1>
      <div>
      
        {guest.map((g) => {
          return (
            <div key={g.id} className="flex flex-row w-full gap-2 sm:flex-row odd:bg-gray-100 p-1">
            <div className="w-1/4">{g.attendingAt?.toLocaleTimeString()}</div>    
              <div>
                {g.guest.firstName} {g.guest.lastName}
              </div>
                        
            </div>
          );
        })}
        <div></div>
      </div>
    </div>
  );
};

export default ContainerCheckinBy;

