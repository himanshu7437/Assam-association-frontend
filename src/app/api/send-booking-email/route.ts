import { NextResponse } from "next/server";
import { validateBookingEmail } from "@/lib/validators/bookingEmailValidator";
import { sendBookingEmails } from "@/lib/email/sendBookingEmails";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate Input (Clean architecture pattern)
    const result = validateBookingEmail(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues || "Validation Failed" },
        { status: 400 }
      );
    }
    
    const payload = result.data;

    // 2. Format Dates securely and Call Email Service
    const formatDate = (d: string | Date) => {
      const dateObj = new Date(d);
      return dateObj.toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      });
    };

    const emailResult = await sendBookingEmails({
      userEmail: payload.userEmail,
      userName: payload.userName,
      facility: payload.facility,
      checkIn: formatDate(payload.checkIn),
      checkOut: formatDate(payload.checkOut),
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: emailResult.error },
        { status: 500 }
      );
    }

    // 3. Success Response
    return NextResponse.json(
      { success: true, message: "Emails dispatched successfully" }, 
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error("[POST /api/send-booking-email] - Critical error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
