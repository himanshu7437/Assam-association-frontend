import { z } from "zod";

export const bookingEmailValidator = z.object({
  userEmail: z.string().email("Invalid email format"),
  userName: z.string().min(2, "Name must be at least 2 characters"),
  facility: z.string().min(1, "Facility is required"),
  date: z.string().or(z.date()), // API might receive it as string or Date
});

export type BookingEmailPayload = z.infer<typeof bookingEmailValidator>;

export function validateBookingEmail(data: unknown) {
  return bookingEmailValidator.safeParse(data);
}
