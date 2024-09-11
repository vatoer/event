import { getRsvpOptions } from "@/actions/guest";
import { SelectRsvp } from "./_components/select-rsvp";
import FormContainer from "./_components/form-container";

const UpdateResponsePage = async ({ params }: { params: { slug: string } }) => {
    const eventId = params.slug 
    const rsvpOptions = await getRsvpOptions();
    return ( 
        <div className="px-10 py-2 w-full">
            <h1 className="font-semibold text-lg">Update Response {eventId}</h1>
            <FormContainer rsvpOptions={rsvpOptions} />
        </div>
     );
}
 
export default UpdateResponsePage;