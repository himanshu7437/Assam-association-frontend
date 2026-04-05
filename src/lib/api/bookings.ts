import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs, 
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BookingInput } from "@/types";

export async function checkAvailability(
  facilityId: string, 
  checkIn: Date, 
  checkOut: Date
): Promise<{ available: boolean; message?: string }> {
  try {
    const bookingsRef = collection(db, "bookings");
    // Only check against pending and approved bookings
    const q = query(
      bookingsRef,
      where("facilityId", "==", facilityId),
      where("status", "in", ["pending", "approved"])
    );

    const querySnapshot = await getDocs(q);
    
    const newStart = new Date(checkIn);
    newStart.setHours(0, 0, 0, 0);
    const newEnd = new Date(checkOut);
    newEnd.setHours(23, 59, 59, 999);

    const newCheckInTime = newStart.getTime();
    const newCheckOutTime = newEnd.getTime();

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      
      // Handle legacy "date" field if it exists, or the new checkIn/checkOut
      const existingCheckIn = data.checkIn 
        ? (data.checkIn as Timestamp).toDate() 
        : (data.date as Timestamp).toDate();
      const existingCheckOut = data.checkOut 
        ? (data.checkOut as Timestamp).toDate() 
        : (data.date as Timestamp).toDate();

      const existingStart = new Date(existingCheckIn);
      existingStart.setHours(0, 0, 0, 0);
      const existingEnd = new Date(existingCheckOut);
      existingEnd.setHours(23, 59, 59, 999);

      // Overlap logic: (newCheckIn <= existingCheckOut) && (newCheckOut >= existingCheckIn)
      if (newCheckInTime <= existingEnd.getTime() && newCheckOutTime >= existingStart.getTime()) {
        return { 
          available: false, 
          message: "Selected dates are not available for this facility." 
        };
      }
    }

    return { available: true };
  } catch (error) {
    console.error("Error checking availability:", error);
    return { available: false, message: "Error checking availability. Please try again." };
  }
}

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
      const formatDate = (d: Date) => {
        return d instanceof Date ? d.toISOString() : new Date(d).toISOString();
      };

      const emailPayload = {
        userEmail: data.email,
        userName: data.name,
        facility: data.facility,
        checkIn: formatDate(data.checkIn),
        checkOut: formatDate(data.checkOut),
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
