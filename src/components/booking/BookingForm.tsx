"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { requestBooking } from "@/lib/api/bookings";
import { getFacilities } from "@/lib/api/services";
import { Facility } from "@/types";

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
  facilityId: z.string().min(1, "Please select a facility."),
  facilityName: z.string(),
  type: z.string(),
  room: z.string().optional(),
  duration: z.string().optional(),
  date: z.any().refine((val) => val instanceof Date, {
    message: "A booking date is required.",
  }),
  message: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === "accommodation" && !data.room) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a room type.",
      path: ["room"],
    });
  }
  if (data.type === "event" && !data.duration) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please select a duration.",
      path: ["duration"],
    });
  }
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(true);

  useEffect(() => {
    async function fetchFacilities() {
      try {
        const data = await getFacilities();
        setFacilities(data);
      } catch (e) {
        console.error("Error loading facilities", e);
      } finally {
        setIsLoadingFacilities(false);
      }
    }
    fetchFacilities();
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      facilityId: "",
      facilityName: "",
      type: "simple",
      room: "",
      duration: "",
      message: "",
    },
  });

  const selectedFacilityId = form.watch("facilityId");
  const selectedFacilityObj = facilities.find(f => f.id === selectedFacilityId);

  // Handle facility change to clear dependent fields and update hidden state
  const handleFacilityChange = (val: string | null) => {
    if (!val) return;
    
    const facility = facilities.find(f => f.id === val);
    if (!facility) return;
    
    form.setValue("facilityId", facility.id);
    form.setValue("facilityName", facility.name);
    form.setValue("type", facility.type);
    
    // reset dependents
    form.setValue("room", "");
    form.setValue("duration", "");
    form.clearErrors(["room", "duration"]);
  };

  const onSubmit = async (values: BookingFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await requestBooking(values);
      setSuccess(true);
      form.reset();
    } catch (err: unknown) {
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
                <AlertCircle size={12} /> {form.formState.errors.name.message as string}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
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
              disabled={isLoadingFacilities}
              value={selectedFacilityId || null}
              onValueChange={handleFacilityChange}
            >
              <SelectTrigger className={cn("h-12 border border-gray-300 focus:ring-2 focus:ring-primary/20 bg-white", form.formState.errors.facilityId && "border-red-500")}>
                <SelectValue placeholder={isLoadingFacilities ? "Loading facilities..." : "Select one..."}>
                  {selectedFacilityObj ? selectedFacilityObj.name : undefined}
                </SelectValue>
              </SelectTrigger>

              <SelectContent align="start" className="z-[9999] bg-white shadow-xl border w-[var(--radix-select-trigger-width)] max-h-64 overflow-y-auto">
                {facilities.map((fac) => (
                  <SelectItem key={fac.id} value={fac.id} className="cursor-pointer whitespace-normal py-2 pr-6">
                    {fac.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.facilityId && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> {form.formState.errors.facilityId.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Fields */}
        <AnimatePresence>
          {selectedFacilityObj?.type === "accommodation" && selectedFacilityObj.rooms && selectedFacilityObj.rooms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="space-y-2 relative z-10"
            >
              <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
                Select Room Type
              </Label>
              <Select
                value={form.watch("room") || null}
                onValueChange={(val: string | null) => form.setValue("room", val || undefined, { shouldValidate: true })}
              >
                <SelectTrigger className={cn("h-12 border border-gray-300 focus:ring-2 focus:ring-primary/20 bg-white", form.formState.errors.room && "border-red-500")}>
                  <SelectValue placeholder="Select a room...">
                    {form.watch("room") || undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start" className="z-[9999] bg-white shadow-xl border w-[var(--radix-select-trigger-width)] max-h-64 overflow-y-auto">
                  {selectedFacilityObj.rooms.map((room, idx) => (
                    <SelectItem key={idx} value={room.name} className="cursor-pointer whitespace-normal py-2 pr-6 leading-relaxed">
                      {room.name} (₹{room.price}/night)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.room && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {form.formState.errors.room.message as string}
                </p>
              )}
            </motion.div>
          )}

          {selectedFacilityObj?.type === "event" && selectedFacilityObj.pricing && selectedFacilityObj.pricing.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="space-y-2 relative z-10"
            >
              <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
                Select Duration
              </Label>
              <Select
                value={form.watch("duration") || null}
                onValueChange={(val: string | null) => form.setValue("duration", val || undefined, { shouldValidate: true })}
              >
                <SelectTrigger className={cn("h-12 border border-gray-300 focus:ring-2 focus:ring-primary/20 bg-white", form.formState.errors.duration && "border-red-500")}>
                  <SelectValue placeholder="Select event duration...">
                    {form.watch("duration") || undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent align="start" className="z-[9999] bg-white shadow-xl border w-[var(--radix-select-trigger-width)] max-h-64 overflow-y-auto">
                  {selectedFacilityObj.pricing.map((price, idx) => (
                    <SelectItem key={idx} value={`${price.duration}`} className="cursor-pointer whitespace-normal py-2 pr-6 leading-relaxed">
                      {price.duration} - ₹{price.amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.duration && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {form.formState.errors.duration.message as string}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 relative z-0">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-foreground">
              Booking Date
            </Label>

            <Popover>
              <PopoverTrigger className={cn("h-12 flex items-center border border-gray-300 rounded-lg px-3 bg-white focus:ring-2 focus:ring-primary/20 w-full", form.formState.errors.date && "border-red-500")}>
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