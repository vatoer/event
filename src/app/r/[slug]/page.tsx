import EventWrapper from "@/components/event-wrapper";
import GuestWrapper from "@/components/guest";
import RsvpResponseWrapper from "@/components/rsvp-response-wrapper";
import { getRsvp } from "@/data/rsvp";

const rsvpPage = async ({ params }: { params: { slug: string } }) => {
    // check data from database

    // if data exists, return the data
    const eventId = "resdip79";
    const rsvpId = params.slug;
    const rsvp = await getRsvp(eventId, rsvpId);
    console.log(rsvp);

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
            <RsvpResponseWrapper id={rsvp.id} rsvpResponse={rsvp.rsvpResponse} />
            
        </div>
     );
}
 
export default rsvpPage;