import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BookingInput } from "@/types";

export async function requestBooking(data: BookingInput): Promise<string> {
  try {
    const bookingsRef = collection(db, "bookings");
    const docRef = await addDoc(bookingsRef, {
      ...data,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    
    // Fire off email dispatch without blocking the return
    try {
      const formattedDate = data.date instanceof Date 
          ? data.date.toISOString() 
          : new Date(data.date).toISOString();

      const emailPayload = {
        userEmail: data.email,
        userName: data.name,
        facility: data.facilityName,
        date: formattedDate,
      };

      fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      }).catch(console.error);
    } catch (e) {
      console.error("[requestBooking] email trigger failed safely", e);
    }

    return docRef.id;
  } catch (error) {
    console.error("Error submitting booking request:", error);
    throw new Error("Unable to submit booking request at this time.");
  }
}
