"use client";

import React from "react";
import { MapPin, Phone, Mail, Send, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* HERO */}
      <section className="relative h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4b0004] to-[#73000a] opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M30 0l30 30-30 30-30-30z%22 fill=%22%23ffffff%22 fill-opacity=%220.03%22/%3E%3C/svg%3E')]" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight font-[Noto_Serif]">
              Get in Touch
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto font-[Inter] leading-relaxed">
              We’re here to help. Reach out for bookings, membership, or general inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN */}
      <section className="bg-muted/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT SIDE */}
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
                    Qutab Institutional Area, New Delhi
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <Phone className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Phone
                  </h4>
                  <p className="text-sm">+91 11 2696 0386</p>
                </div>
              </div>

              <div className="flex gap-6">
                <Mail className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Email
                  </h4>
                  <p className="text-sm">info@assamasociationdelhi.org</p>
                </div>
              </div>

              <div className="pt-8 border-t border-primary/10">
                <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-6">
                  <Globe size={16} /> Bank Details
                </h4>

                <div className="space-y-4 text-xs uppercase tracking-widest">
                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span>Bank</span>
                    <span className="text-primary">SBI</span>
                  </div>

                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span>A/C Name</span>
                    <span className="text-primary">AAD</span>
                  </div>

                  <div className="flex justify-between border-b border-primary/10 pb-2">
                    <span>A/C No</span>
                    <span className="text-primary">10245678901</span>
                  </div>

                  <div className="flex justify-between">
                    <span>IFSC</span>
                    <span className="text-primary">SBIN0001234</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="bg-white p-10 md:p-16">

              <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-10">
                Send a Message
              </h3>

              <form className="space-y-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                  {/* NAME */}
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Full Name
                    </Label>
                    <Input
                      placeholder="Your name"
                      className="h-12 border border-muted rounded-md px-4 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </Label>
                    <Input
                      placeholder="Your email"
                      className="h-12 border border-muted rounded-md px-4 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                    />
                  </div>

                </div>

                {/* SUBJECT */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Subject
                  </Label>
                  <Input
                    placeholder="Subject"
                    className="h-12 border border-muted rounded-md px-4 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>

                {/* MESSAGE */}
                <div className="space-y-2">
                  <Label className="text-xs uppercase tracking-widest text-muted-foreground">
                    Message
                  </Label>
                  <Textarea
                    placeholder="Your message"
                    className="min-h-[120px] border border-muted rounded-md px-4 py-3 resize-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
                  />
                </div>

                <Button className="w-full md:w-auto bg-primary text-white px-10 py-4 text-sm font-bold tracking-widest hover:bg-primary/90">
                  SEND MESSAGE <Send size={16} className="ml-2" />
                </Button>

              </form>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}