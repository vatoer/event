import { getRsvpOptions } from "@/actions/guest";
import { auth } from "@auth/auth";
import { UserButton } from "@/components/user/user-button";
import { getGuestForEvent, getRsvpForEvent } from "@/data/guest";
import GuestContainer from "./_components/guest-container";
import Search from "@/components/search";

const UpdateResponsePage = async ({ params }: { params: { slug: string } }) => {
  const eventId = params.slug;
  const session = await auth();

  let user = null;
  if (session) {
    user = session.user;   
  }

  if (!user) {
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );
  }

  if (user && !user.roles?.includes("USER")) {
    return (
      <div>
        <h1>Not authorized, please contact Administrator</h1>
      </div>
    );
  }

  const guest = await getRsvpForEvent(eventId);

  return (
    <div className="px-10 py-2 w-full">
      <div className="flex flex-row w-full justify-end">
        <UserButton />
      </div>
      <div className="w-full">
        <Search />
      </div>
      <h1 className="font-semibold text-lg">Guest Of Event {eventId}</h1>
      <GuestContainer data={guest} eventId={eventId} />
    </div>
  );
};

export default UpdateResponsePage;
