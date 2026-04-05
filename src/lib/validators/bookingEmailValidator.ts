import { z } from "zod";

export const bookingEmailValidator = z.object({
  userEmail: z.string().email("Invalid email format"),
  userName: z.string().min(2, "Name must be at least 2 characters"),
  facility: z.string().min(1, "Facility is required"),
  checkIn: z.string().or(z.date()),
  checkOut: z.string().or(z.date()),
});

export type BookingEmailPayload = z.infer<typeof bookingEmailValidator>;

export function validateBookingEmail(data: unknown) {
  return bookingEmailValidator.safeParse(data);
}
