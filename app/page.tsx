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
            For everyday Australians who already have something built. We coordinate strategy,
            structure and the introductions to the licensed specialists who do the regulated work,
            so the work you started actually finishes.
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
        intro="Outcomes that hold up are rarely about a single product. They are about how the parts of your financial life actually fit together. The lending, the structure, the professionals, the timing. We sit in the middle of that picture."
        body="Coordinated, not stitched together after the fact. Held in one room, by one team, against one strategy."
        bullets={[
          {
            icon: <Architecture className="w-5 h-5" />,
            title: "The decisions stay yours",
            body: "We make the introductions and sit in the room. The conversations, the calls and the contracts are between you and the specialist. Not us in their seat.",
          },
          {
            icon: <Clock className="w-5 h-5" />,
            title: "Known over years, not lists",
            body: "Every broker, accountant, SMSF specialist and project partner is someone we have worked alongside long enough to vouch for, with our name behind it.",
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
            body: "Through our authorised representative arrangement within the Home Loan Solutions / AFG network, our broker partners draw on a panel of approximately 70 Australian lenders. Real options that fit your actual position, with us in the room while they do the regulated work.",
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
        hubBody="We sit between you and your accountant, SMSF specialist, broker and project partners. The whole picture in one room. The strategy stops forming in silos and starts moving as one."
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
