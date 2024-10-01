import { getRsvpOptions } from "@/actions/guest";
import { SelectRsvp } from "./_components/select-rsvp";
import FormContainer from "./_components/form-container";
import { auth, signOut } from "@auth/auth";
import { UserButton } from "@/components/user/user-button";
import { Button } from "@/components/ui/button";

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

  if (user && !user.roles?.includes("USER")) {
    return (
      <div>
        <h1>Not authorized, please contact Administrator</h1>
        <Button onClick={() => signOut({ redirectTo: "/login" })}>Login</Button>
      </div>
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
