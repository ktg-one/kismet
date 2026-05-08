import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { BookingEmbed } from "@/components/BookingEmbed";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
  title: "Contact | Kismet Finance Group",
  description:
    "Pick a time that suits, or send a note and we will be back inside one business day. No pitch, no script, no homework.",
};

export default function Contact() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        headline="The first call is the easiest part."
        sub="No pitch, no script, no homework. Pick a time that suits, or send a note and we will be back inside one business day."
        ctaLabel="Skip to the form"
        ctaHref="#message"
        showScrollCue={false}
      />

      <section className="atmosphere-soft">
        <div className="mx-auto max-w-7xl px-6 md:px-10 pb-32 md:pb-40 pt-16 md:pt-24">
          <div className="grid gap-16 lg:gap-20 lg:grid-cols-12">
            {/* Booking column */}
            <Reveal className="lg:col-span-7">
              <div>
                <div className="flex items-center gap-4 mb-7">
                  <span className="index-marker">01</span>
                  <span className="h-px w-10 bg-gold/40" aria-hidden />
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/55">
                    Pick a time
                  </span>
                </div>
                <h2 className="font-serif text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.012em] text-white mb-3">
                  Book a private call
                </h2>
                <p className="text-[15px] text-white/55 leading-[1.7] mb-10 max-w-md">
                  Thirty minutes, no obligation. We listen first.
                </p>
                <BookingEmbed />
              </div>
            </Reveal>

            {/* Form column */}
            <Reveal delay={0.12} className="lg:col-span-5 scroll-mt-32">
              <div id="message">
                <div className="flex items-center gap-4 mb-7">
                  <span className="index-marker">02</span>
                  <span className="h-px w-10 bg-gold/40" aria-hidden />
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/55">
                    Or send a note
                  </span>
                </div>
                <h2 className="font-serif text-[1.75rem] md:text-[2.25rem] leading-[1.15] tracking-[-0.012em] text-white mb-3">
                  Send a message
                </h2>
                <p className="text-[15px] text-white/55 leading-[1.7] mb-10 max-w-md">
                  A line or two is plenty. We reply inside one business day.
                </p>
                <LeadForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
