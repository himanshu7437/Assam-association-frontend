import BookingHero from "@/components/booking/BookingHero";
import BookingForm from "@/components/booking/BookingForm";

export default function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      <BookingHero />

      {/* FORM SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 bg-surface-container-low">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="max-w-5xl mx-auto text-center mb-16">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B365D]">
              How Booking Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-6 text-primary font-serif text-4xl">01</div>
              <p className="text-on-surface-variant leading-relaxed">
                Submit your request with preferred facility, date, and requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-6 text-primary font-serif text-4xl">02</div>
              <p className="text-on-surface-variant leading-relaxed">
                Our administration verifies availability and contacts you for confirmation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-6 text-primary font-serif text-4xl">03</div>
              <p className="text-on-surface-variant leading-relaxed">
                Complete the formalities and receive your official booking approval.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}