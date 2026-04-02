"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, Globe, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { submitContactForm } from "@/lib/api/contact";
import contactBg from "../../../public/images/contact2-Photoroom.png";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) return "Valid email is required";
    if (!formData.message.trim() || formData.message.length < 10) return "Message must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* HERO (UNCHANGED) */}
      <section className="relative h-[350px] md:h-[400px] flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={contactBg}
            alt="Contact Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right md:object-center"
          />
        </div>

        {/* DARK GREEN → TRANSPARENT GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r 
          from-green-900/60 
          via-green-900/60 
          to-transparent"
        />

        {/* KEEP YOUR PATTERN */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M30 0l30 30-30 30-30-30z%22 fill=%22%23ffffff%22 fill-opacity=%220.03%22/%3E%3C/svg%3E')]" />

        {/* CONTENT (ONLY TEXT ENHANCED) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex items-center justify-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-left max-w-2xl"
          >
            {/* HEADING */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight font-[Noto_Serif] drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
              Get in Touch
            </h1>

            {/* SUBTEXT */}
            <p className="text-base sm:text-lg md:text-xl text-white/95 font-[Inter] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
              Connecting the Assamese community in the heart of the national capital. We are here to listen, support, and grow together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN */}
      <section className="bg-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT SIDE (UNCHANGED) */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                  Contact Information
                </h2>
                <p className="text-muted-foreground">
                  Visit us or reach out through the following channels.
                </p>
              </div>

              <div className="flex gap-6">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Address
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Srimanta Sankaradeva Bhawan,<br />
                    A14B, Satsang Vihar Marg, Block A,<br />
                    Qutab Institutional Area, New Delhi - 110067
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <Phone className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Phone
                  </h4>
                  <p className="text-sm">098713 19664</p>
                </div>
              </div>

              <div className="flex gap-6">
                <Mail className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Email
                  </h4>
                  <p className="text-sm">info@assamassociationdelhi.org</p>
                </div>
              </div>

              <div className="pt-8 border-t border-primary/10">
                <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-6">
                  <Globe size={16} /> Bank Details
                </h4>

                <div className="space-y-4 text-xs uppercase tracking-widest">
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span>Bank</span>
                    <span className="text-primary">CANARA BANK</span>
                  </div>

                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span>A/C Name</span>
                    <span className="text-primary">ASSAM ASSOCIATION CULTURAL EDUC TRUST</span>
                  </div>

                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span>A/C No</span>
                    <span className="text-primary">1484101027718</span>
                  </div>

                  <div className="flex justify-between">
                    <span>IFSC</span>
                    <span className="text-primary">CNRB0001484</span>
                  </div>
                </div>

                {/* QR Code / Barcode section */}
                <div className="mt-8 p-4 bg-white rounded-lg border border-primary/10 shadow-sm inline-block">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-3 text-center">
                    Scan to Pay
                  </p>
                  <div className="mx-auto flex justify-center w-[160px]">
                    <Image
                      src={"https://res.cloudinary.com/disniu3hn/image/upload/v1775053149/paymentBarcode_tz0mtp.jpg"}
                      alt="Payment Barcode"
                      width={160}
                      height={160}
                      className="object-contain"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="bg-white p-10 md:p-16 rounded-xl shadow-lg border border-primary/5">

              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">

                <AnimatePresence mode="wait">
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm"
                    >
                      <CheckCircle2 size={18} />
                      Your message has been sent successfully!
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm"
                    >
                      <AlertCircle size={18} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* NAME */}
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                      Full Name
                    </Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="h-12 border border-muted rounded-md px-4 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                      Email
                    </Label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="h-12 border border-muted rounded-md px-4 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* SUBJECT */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                    Subject
                  </Label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about..."
                    className="h-12 border border-muted rounded-md px-4 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                    disabled={loading}
                  />
                </div>

                {/* MESSAGE */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">
                    Message
                  </Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="min-h-[120px] border border-muted rounded-md px-4 py-3 resize-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                    required
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto bg-[#4b0004] text-white px-10 py-6 text-sm font-bold tracking-widest hover:bg-[#73000a] transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <>SUBMITTING... <Loader2 size={16} className="ml-2 animate-spin" /></>
                  ) : (
                    <>SEND MESSAGE <Send size={16} className="ml-2" /></>
                  )}
                </Button>

              </form>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
