import { getRsvp } from "@/data/rsvp";
import { generateUndangan } from "@/lib/generate-undangan";
import { NextResponse } from "next/server";


export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  // if data exists, return the data
  const eventId = "resdip79";
  const rsvpId = params.slug;
  console.log(rsvpId);
  const rsvp = await getRsvp(eventId, rsvpId);

  if (!rsvp) {
    return new NextResponse("NOT FOUND", { status: 404 });
  }

  
  const pdfBuffer = await generateUndangan(rsvp);
  const guestName = `${rsvp.guest.prefix} ${rsvp.guest.firstName} ${rsvp.guest.lastName}`;


  //const filename = `${rsvp.guest.id}_${guestName}_${rsvpId}.pdf`;
  //replace all spaces with underscore
  const filename = `${rsvp.guest.id}_${guestName}_${rsvpId}.pdf`.replace(
    /\s/g,
    "_"
  );

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}

