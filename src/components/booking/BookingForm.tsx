"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { CalendarIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { requestBooking } from "@/lib/api/bookings";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().regex(/^\+?[0-9]{10,12}$/, "Invalid phone number."),
  facility: z.string().min(1, "Please select a facility."),
  date: z.any().refine((val) => val instanceof Date, {
    message: "A booking date is required.",
  }),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      facility: "",
      message: "",
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await requestBooking(values);
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto p-12 bg-white rounded-3xl border border-border shadow-2xl text-center"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">
          Request Received!
        </h2>
        <p className="text-muted-foreground mb-8">
          Your booking request has been submitted successfully and is pending approval.
        </p>
        <Button
          onClick={() => setSuccess(false)}
          variant="outline"
          className="rounded-full px-8"
        >
          Make Another Booking
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-8 md:p-12 bg-white rounded-3xl border border-border shadow-2xl"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Name + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
              Full Name
            </Label>
            <Input
              placeholder="John Doe"
              className={cn(
                "h-12 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
                form.formState.errors.name && "border-red-500"
              )}
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
              Email Address
            </Label>
            <Input
              placeholder="john@example.com"
              className={cn(
                "h-12 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
                form.formState.errors.email && "border-red-500"
              )}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {form.formState.errors.email.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Phone + Facility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
              Phone Number
            </Label>
            <Input
              placeholder="+91 9876543210"
              className={cn(
                "h-12 border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20",
                form.formState.errors.phone && "border-red-500"
              )}
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {form.formState.errors.phone.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
              Select Facility
            </Label>

            <Select
              onValueChange={(value) => form.setValue("facility", value as any)}
            >
              <SelectTrigger className="h-12 border border-gray-300 focus:ring-2 focus:ring-primary/20 bg-white">
                <SelectValue placeholder="Select one..." />
              </SelectTrigger>

              <SelectContent className="z-[9999] bg-white shadow-xl border">
                <SelectItem value="guesthouse">Guest House / Room</SelectItem>
                <SelectItem value="auditorium">Main Auditorium</SelectItem>
                <SelectItem value="hall">Community Hall</SelectItem>
                <SelectItem value="library">Library Space</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.facility && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> {form.formState.errors.facility.message as string}
              </p>
            )}
          </div>

        </div>

        {/* Date */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 relative z-0">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
              Booking Date
            </Label>

            <Popover>
              <PopoverTrigger className="h-12 flex items-center border border-gray-300 rounded-lg px-3 bg-white focus:ring-2 focus:ring-primary/20 w-full">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.watch("date")
                  ? format(form.watch("date"), "PPP")
                  : "Pick a date"}
              </PopoverTrigger>

              <PopoverContent className="z-[9999] w-auto p-0 bg-white shadow-xl border">
                <Calendar
                  mode="single"
                  selected={form.watch("date")}
                  onSelect={(date) => {
                    if (date) form.setValue("date", date);
                  }}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            {form.formState.errors.date && (
               <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                 <AlertCircle size={12} /> {form.formState.errors.date.message as string}
               </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
            Special Requirements (Optional)
          </Label>
          <Textarea
            placeholder="Tell us about any specific needs..."
            className="min-h-[120px] border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            {...form.register("message")}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-100 text-red-600 rounded-xl flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* BUTTON FIX */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-full text-lg shadow-xl bg-primary text-white hover:bg-primary/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Complete Booking Request"
          )}
        </Button>

        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
          By clicking, you agree to{" "}
          <Link href="/terms" className="underline hover:text-primary">
            policies
          </Link>{" "}
          &{" "}
          <Link href="/privacy" className="underline hover:text-primary">
            terms
          </Link>
        </p>
      </form>
    </motion.div>
  );
}