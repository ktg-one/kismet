import { Hero } from "@/components/Hero";
import { ContactInquiry } from "@/components/ContactInquiry";

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
        headline="Let's begin the"
        headlineMuted="conversation."
        sub={
          <>
            Whether you are preparing your next strategic move or simply exploring pathways for the
            future, our team is ready to listen. No pitch, no script, no homework.
          </>
        }
        ctaLabel="Skip to the form"
        ctaHref="#message"
        showScrollCue={false}
      />

      <div id="message" className="scroll-mt-32">
        <ContactInquiry />
      </div>
    </>
  );
}
