import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { BookingEmbed } from "@/components/BookingEmbed";
import { LeadForm } from "@/components/LeadForm";

export default function Contact() {
  return (
    <>
      <Hero
        eyebrow="Contact"
        headline={<>The first call is the easiest part.</>}
        sub="No pitch, no script, no homework. Pick a time that suits, or send a note and we will be back inside one business day."
        ctaLabel="Skip to the form"
        ctaHref="#message"
      />
      <section className="mx-auto max-w-6xl px-6 pb-28 md:pb-36">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-5">01 Pick a time</div>
              <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-[1.15] mb-8">Book a private call</h2>
              <BookingEmbed />
            </div>
          </Reveal>
          <Reveal delay={0.12} className="scroll-mt-24">
            <div id="message">
              <div className="text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-5">02 Or send a note</div>
              <h2 className="font-serif text-[1.75rem] md:text-[2rem] leading-[1.15] mb-8">Send a message</h2>
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
