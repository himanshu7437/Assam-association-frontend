import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";

interface EmailPayload {
  userEmail: string;
  userName: string;
  facility: string;
  date: string;
}

export async function sendBookingEmails(payload: EmailPayload) {
  try {
    const { userEmail, userName, facility, date } = payload;

    // 1. Send User Confirmation
    const userEmailPromise = resend.emails.send({
      from: "Assam Association Delhi <info@assamassociationdelhi.org>", 
      to: [userEmail],
      subject: "Booking Request Received - Pending Approval",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #4b0004;">Booking Request Received</h2>
          <p>Hi <strong>${userName}</strong>,</p>
          <p>We have successfully received your booking request. Our committee will review it and get back to you shortly.</p>
          
          <div style="background-color: #fbf9f4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4b0004;">
            <p style="margin: 5px 0;"><strong>Facility:</strong> ${facility}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="background-color: #ffeb3b; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; color: #333;">Pending</span></p>
          </div>
          
          <p>Thank you for choosing Assam Association Delhi.</p>
          <p style="font-size: 12px; color: #888; margin-top: 30px;">This is an automated message. Please do not reply directly to this email.</p>
        </div>
      `,
    });

    // 2. Send Admin Notification
    const adminEmailPromise = resend.emails.send({
      from: "Assam Association Delhi <info@assamassociationdelhi.org>", 
      to: [ADMIN_EMAIL],
      subject: "Action Required: New Booking Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #4b0004;">New Booking Needs Approval</h2>
          <p>A new booking request has been submitted securely and is waiting for your review.</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>User Name:</strong> ${userName}</p>
            <p style="margin: 5px 0;"><strong>User Email:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Facility:</strong> ${facility}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
          </div>
          
          <p>Please log in to the admin dashboard to proceed with approving or rejecting this request.</p>
        </div>
      `,
    });

    // Execute both in parallel for performance
    const results = await Promise.allSettled([userEmailPromise, adminEmailPromise]);
    
    // Evaluate results (fault tolerance parsing)
    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) {
      console.error("[EmailService] Failed to send some emails:", failures);
      return { success: false, error: "Partial or total email failure" };
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("[EmailService] Critical error sending emails:", error);
    return { success: false, error: (error as Error)?.message || "Internal Email Error" };
  }
}
