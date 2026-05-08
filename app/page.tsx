import { Hero } from "@/components/Hero";
import { ValueCardRow } from "@/components/ValueCardRow";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { Photo } from "@/components/Photo";
import { AccessBlock } from "@/components/AccessBlock";
import { SignatureStrip } from "@/components/SignatureStrip";
import { Declaration } from "@/components/Declaration";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Private finance coordination · Australia"
        headline="Strategy, structure, access. Coordinated."
        sub="For Australians who have already built something. We coordinate the moves, and the introductions to the licensed specialists who do the regulated work, so the work you started actually finishes."
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />

      {/* Authority signature - publication masthead style */}
      <SignatureStrip
        marks={[
          { label: "Established", meta: "MMXXIV" },
          { label: "Operating from", meta: "Cockburn Central, WA" },
          { label: "Engagement", meta: "By appointment only" },
          { label: "Discipline", meta: "Coordination, not advice" },
        ]}
      />

      {/* Documentary moment - editorial photo strip */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
          <Photo
            src="/photos/team-boardroom.jpg"
            alt="A working session"
            caption="The work happens in the room, before anything goes to a specialist."
            meta="Working session"
            aspect="21/9"
            sizes="(min-width: 1024px) 1100px, (min-width: 768px) 90vw, 100vw"
          />
        </div>
      </section>

      <ValueCardRow
        eyebrow="Principles"
        heading="We coordinate the conversations most people never get to have."
        cards={[
          {
            title: "Built for those already in motion",
            body: "Kismet works with people who have already built something. Operating businesses, investment positions, growing super balances. The work is about coordinating what is there, not starting from zero.",
          },
          {
            title: "Connected through relationships, not advertising",
            body: "Our partners are people we have known and watched work for years. Brokers, accountants, SMSF specialists, property and project partners. Quiet introductions, not public marketplaces.",
          },
          {
            title: "The right table, before the right product",
            body: "Most decisions go sideways because the right people are not in the room. We coordinate the conversation before the regulated work happens, so the question on the table is the right question.",
          },
        ]}
      />

      <AccessBlock
        eyebrow="Where strategy meets access"
        heading="Some pathways begin long before they become public."
        intro="A real strategy is built from the right inputs. We sit close to the conversations and partners that shape outcomes for our clients, then bring the licensed specialists in once the picture is clear. Nothing here is a promise of opportunity. It is a description of where we operate."
        channels={[
          {
            label: "Strategic property partners",
            body: "Development and project partners we have known for years. Some conversations happen before things go to market. We help you understand them, never sell you into them.",
          },
          {
            label: "Licensed broker network",
            body: "A small panel of finance brokers we trust to act in your interest. We sit in the room while they do the regulated work, so the question being answered is the right one.",
          },
          {
            label: "SMSF and accounting specialists",
            body: "Self-managed super and structuring specialists who understand growth strategy, not just compliance. We coordinate the handover so nothing falls between providers.",
          },
          {
            label: "Project and capital conversations",
            body: "Where appropriate, exposure to private project conversations our network is involved in. Always at arm's length, always with a licensed specialist doing the regulated work.",
          },
        ]}
        imageSrc="/photos/map-strategy.jpg"
        imageAlt="Real working session, strategy in progress"
        imageMeta="Working session"
      />

      <Declaration
        eyebrow="A quiet declaration"
        statement={
          <>
            We don&rsquo;t replace qualified advice.
            <span className="block opacity-60 mt-3">
              We help you get to the right table, with the right people, at the right time.
            </span>
          </>
        }
        signoff="Kismet operating principle"
      />

      <TestimonialBlock
        eyebrow="In their words"
        heading="From people we have sat across from."
        items={[
          {
            quote:
              "I cannot thank the team at Kismet enough for all their help. They have been so supportive and have made me feel like a person, not a number lost in a system.",
            name: "Riley-James Hogg",
            context: "Kismet client",
          },
          {
            quote:
              "I honestly wish someone like Dan was around years ago to help educate the public about superannuation. Very informative, patient, and clear about the goals and the process.",
            name: "Robyn Willers",
            context: "SMSF client",
          },
          {
            quote:
              "A friend of mine referred us to Kismet to help us out with our interest rates. The whole process was nice and convenient. They came to us, explained everything in plain English, and we walked away clearer than we started.",
            name: "Adam Walker",
            context: "Kismet client",
          },
          {
            quote:
              "Regular check-ins to make sure everything is on track. Knowledgeable, experienced and trustworthy. They genuinely care about how you end up, not just the introduction.",
            name: "Kismet client",
            context: "Verified review",
          },
          {
            quote:
              "It feels less like dealing with a finance company and more like having someone in your corner who has already had the conversations you need to have.",
            name: "Kismet client",
            context: "Verified review",
          },
        ]}
      />
    </>
  );
}
