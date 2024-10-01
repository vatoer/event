import { getRsvpOptions } from "@/actions/guest";
import { SelectRsvp } from "./_components/select-rsvp";
import FormContainer from "./_components/form-container";
import { auth } from "@auth/auth";
import { UserButton } from "@/components/user/user-button";
import ContainerCheckinBy from "./_components/container-checkin-by";

const UpdateResponsePage = async ({ params }: { params: { slug: string } }) => {
  const eventId = params.slug;
  const rsvpOptions = await getRsvpOptions();
  let user = null;
  const session = await auth();
  if (session) {
    user = session.user;
    console.log(user?.email);
  }

  return (
    <div className="p-2 sm:px-10 w-full flex flex-col h-full gap-2">
      <div className="flex flex-row w-full justify-end">
        <UserButton />
      </div>
      <h1 className="font-semibold text-2xl text-center">Check-in {eventId}</h1>
      {user && !user.roles?.includes("SCANNER") && (
        <div className="p-4">
          <h1>Not authorized, please contact Administrator</h1>
        </div>
      )}

      {user && user.roles?.includes("SCANNER") && (
        <div className="flex flex-auto h-full w-full border ">
          <FormContainer rsvpOptions={rsvpOptions} />
        </div>
      )}

    </div>
  );
};

export default UpdateResponsePage;
