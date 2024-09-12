import { getRsvpOptions } from "@/actions/guest";
import { SelectRsvp } from "./_components/select-rsvp";
import FormContainer from "./_components/form-container";
import { auth } from "@auth/auth";
import { UserButton } from "@/components/user/user-button";

const UpdateResponsePage = async ({ params }: { params: { slug: string } }) => {
    const eventId = params.slug 
    const rsvpOptions = await getRsvpOptions();
    const session = await auth();

    return ( 
        <div className="px-10 py-2 w-full">
            <div className="flex flex-row w-full justify-end">
                <UserButton />
            </div>
            <h1 className="font-semibold text-lg">Update Response {eventId}</h1>
            <FormContainer rsvpOptions={rsvpOptions} />
        </div>
     );
}
 
export default UpdateResponsePage;