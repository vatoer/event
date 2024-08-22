const rsvpPage = async ({ params }: { params: { slug: string } }) => {
    // check data from database
    return ( 
        <div>
            <h1>RSVP Page</h1>
            <div>My Post: {params.slug}</div>
        </div>
     );
}
 
export default rsvpPage;