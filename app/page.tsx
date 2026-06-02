import { Hero } from "@/components/Hero";
import { BiggerPicture } from "@/components/BiggerPicture";
import { StrategicPathways } from "@/components/StrategicPathways";
import { TeamPortraits } from "@/components/TeamPortraits";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { Architecture, Clock, Building, ColumnsIcon, Hub } from "@/components/Icons";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Strategic Finance Coordination"
        headline="It may not be an income problem."
        headlineMuted="It's a structure, timing and coordination problem."
        sub={
          <>
            We help everyday Australians see the bigger picture, connect with the right people, and
            make the whole process feel clearer.
          </>
        }
        ctaLabel="Book a call"
        ctaHref={process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendar.app.google/gBTNh7XSxQXxiXZF7"}
        secondaryHref="/approach"
        secondaryLabel="How We Work"
      />

      <BiggerPicture
        eyebrow="Why we exist"
        heading="The Bigger Picture"
        intro="Most of the time, getting ahead isn't about one product. It's about how lending, property, structure and timing all fit together. That's the part most people never see. We pull it together with you."
        body="When the moving parts are connected, you stop chasing the same answer in three different places. One strategy. The right people, working from the same page."
        bullets={[
          {
            icon: <Architecture className="w-5 h-5" />,
            title: "The decisions stay yours",
            body: "We tell you what we'd do and why. We tell you what we'd avoid and why. Then you decide. No one rushes you, no one talks past you, no one sells you into anything.",
          },
          {
            icon: <Clock className="w-5 h-5" />,
            title: "People we actually trust",
            body: "Every broker, accountant, SMSF specialist and project partner is someone we've worked with for years. We only introduce people we'd send our own family to.",
          },
        ]}
        imageSrc="/photos/team-focused.jpg"
        imageAlt="A small group working together over a laptop"
      />

      <StrategicPathways
        eyebrow="What we do"
        heading="Three ways we help."
        cards={[
          {
            icon: <Building className="w-6 h-6" />,
            title: "Lending",
            body: "Through our broker partners in the Home Loan Solutions / AFG network, you get access to around 70 Australian lenders. So you see real options that fit your situation, not just whatever the bank happened to be selling that week.",
            size: "lg",
          },
          {
            icon: <ColumnsIcon className="w-6 h-6" />,
            title: "Property",
            body: "Property and project partners we have worked with and watched deliver for years. We help you see what is actually worth a look for someone in your situation. We do not push you into anything.",
            goldEdge: true,
          },
        ]}
        hubLabel="Coordination"
        hubBody="Your accountant, broker, SMSF specialist and project partners, all working from the same plan, because we keep the conversations connected. One strategy. You stop getting three different versions of the same answer."
        hubCta="How We Work"
        hubHref="/approach"
        hubIcon={<Hub className="w-6 h-6" />}
      />

      <TeamPortraits
        eyebrow="Leadership"
        heading="The people you deal with."
        people={[
          {
            name: "Josh",
            role: "Director",
            imageSrc: "/photos/josh.jpg",
            imageAlt: "Josh seated at his desk in the Kismet office",
            imagePosition: "50% 28%",
          },
          {
            name: "Shane",
            role: "Founder · Director",
          },
        ]}
      />

      <TestimonialBlock
        eyebrow="Google reviews"
        heading="From people we have sat across from."
        items={[
          {
            quote:
              "I cannot thank the team at Kismet enough for all their help. They have been so supportive and have made me feel like a person, not a number lost in a system.",
            name: "Riley-James Hogg",
            context: "Google review · ★★★★★",
          },
          {
            quote:
              "I honestly wish someone like Dan was around years ago to help educate the public about superannuation. Very informative, patient, and clear about the goals and the process.",
            name: "Robyn Willers",
            context: "Google review · ★★★★★",
          },
          {
            quote:
              "A friend of mine referred us to Kismet to help us out with our interest rates. The whole process was nice and convenient. They came to us, explained everything in plain English, and we walked away clearer than we started.",
            name: "Adam Walker",
            context: "Google review · ★★★★★",
          },
        ]}
      />
    </>
  );
}
