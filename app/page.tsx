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
        eyebrow="Strategic Financial Coordination"
        headline="It may not be an income problem."
        headlineMuted="It may be a structure, timing and coordination problem."
        sub={
          <>
            For everyday Australians who already have something built but feel like the moves
            aren&rsquo;t lining up. We drive the strategy, open the right doors, and make sure the
            work you started actually finishes.
          </>
        }
        ctaLabel="Begin the Conversation"
        ctaHref="/contact"
        secondaryHref="/approach"
        secondaryLabel="How We Work"
      />

      <BiggerPicture
        eyebrow="The Why"
        heading="The Bigger Picture"
        intro="Real outcomes are rarely about one product. They come from how the parts of your financial life fit together. Lending, structure, professionals, timing. We pull all of it together."
        body="Coordinated, not patched together. Three professionals, one strategy. You don't have to chase the same answer in three places."
        bullets={[
          {
            icon: <Architecture className="w-5 h-5" />,
            title: "The decisions stay yours",
            body: "We tell you what we'd do and why. We tell you what we'd avoid and why. Then you decide. No one rushes you, no one talks past you, no one sells you into anything.",
          },
          {
            icon: <Clock className="w-5 h-5" />,
            title: "Known over years, not lists",
            body: "Every broker, accountant, SMSF specialist and project partner is someone we've worked with for years. We only introduce people we'd send our own family to.",
          },
        ]}
        imageSrc="/photos/team-focused.jpg"
        imageAlt="A small group working together over a laptop"
      />

      <StrategicPathways
        eyebrow="Strategic Pathways"
        heading="The work happens in three places."
        cards={[
          {
            icon: <Building className="w-6 h-6" />,
            title: "Lending",
            body: "Around 70 Australian lenders on one panel through our Home Loan Solutions / AFG broker partners. We work the strategy. You get real options that fit your actual position, not whatever your bank happened to be selling that week.",
            size: "lg",
          },
          {
            icon: <ColumnsIcon className="w-6 h-6" />,
            title: "Property",
            body: "Coordinated property and project conversations through partners we have known and watched work for years. We help you see what is genuinely on the table for someone in your position. We do not sell you into anything.",
            goldEdge: true,
          },
        ]}
        hubLabel="Coordination"
        hubBody="Your accountant, SMSF specialist, broker and project partners, all on the same page because we run the play across all of them. One conversation, one strategy. You stop getting three different versions of the same answer."
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
            role: "Business Partner",
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
