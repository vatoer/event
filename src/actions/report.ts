"use server";
import { getRsvpSummaryByResponse } from "@/data/rsvp";

//   }
const getResponseSummary = async (eventId:string) => {
  // jari jumlah dari rsvp yang 
  const sum = await getRsvpSummaryByResponse(eventId);
  return sum;
}