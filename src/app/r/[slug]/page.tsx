import { auth } from "@/app/(auth)/auth";
import EventWrapper from "@/components/event-wrapper";
import GuestWrapper from "@/components/guest";
import RsvpResponseWrapper from "@/components/rsvp-response-wrapper";
import { getRsvp } from "@/data/rsvp";
import FormCheckin from "./_components/checkin";
import { UserButton } from "@/components/user/user-button";

const rsvpPage = async ({ params }: { params: { slug: string } }) => {
  // check data from database

  // if data exists, return the data
  const eventId = "resdip79";
  const rsvpId = params.slug;
  const rsvp = await getRsvp(eventId, rsvpId);
  console.log(rsvp);
  let user = null;
  const session = await auth();
  if (session) {
    user = session.user;
    console.log(user?.email);
  }

  if (!rsvp) {
    return (
      <div>
        <h1>RSVP Page</h1>
        <div>NOT FOUND</div>
      </div>
    );
  }

  const guest = rsvp.guest;
  const event = rsvp.event;

  return (
    <div className="flex flex-col w-full">
      <EventWrapper event={event} />
      <GuestWrapper guest={guest} blur={false} rsvp={rsvp} />

      {!user && <RsvpResponseWrapper rsvp={rsvp} />}
      {user && user.roles.includes("SCANNER") && <FormCheckin rsvp={rsvp} />}
      {user && !user.roles.includes("SCANNER") && (
        <div className="p-4">
          <h1>Not authorized, please contact Administrator</h1>
        </div>
      )}
    </div>
  );
};

export default rsvpPage;
