import { getRsvpOptions } from "@/actions/guest";
import { SelectRsvp } from "./_components/select-rsvp";
import FormContainer from "./_components/form-container";
import { auth, signOut } from "@auth/auth";
import { UserButton } from "@/components/user/user-button";
import { Button } from "@/components/ui/button";
import Unauthorized from "@/components/unauthorized";

const UpdateResponsePage = async ({ params }: { params: { slug: string } }) => {
  const eventId = params.slug;
  const rsvpOptions = await getRsvpOptions();
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

  console.log(user);

  if (user && !user.roles?.includes("USER")) {
    console.log(user);
    return (
      <Unauthorized />
    );
  }

  return (
    <div className="px-10 py-2 w-full">
      <div className="flex flex-row w-full justify-end">
        <UserButton />
      </div>
      <h1 className="font-semibold text-lg">Update Response {eventId}</h1>
      <FormContainer rsvpOptions={rsvpOptions} />
    </div>
  );
};

export default UpdateResponsePage;
