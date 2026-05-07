import { Hero } from "@/components/Hero";
import { ValueCardRow } from "@/components/ValueCardRow";
import { TestimonialBlock } from "@/components/TestimonialBlock";
import { StatBar } from "@/components/StatBar";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Strategic finance coordination"
        headline="You built the foundation. Now build the future."
        sub="Kismet sits between you and the licensed brokers, advisers and property partners who turn the foundation you have built into the life you actually want. We coordinate the moves. You make the calls."
        ctaLabel="Book a private call"
        ctaHref="/contact"
        meta="Australia · Est. 2024"
      />

      <StatBar
        eyebrow="The shape of the work"
        stats={[
          { value: "1:1", label: "Coordination, never volume" },
          { value: "20+", label: "Specialist partners on bench" },
          { value: "100%", label: "Aligned to your outcome, not commission" },
        ]}
      />

      <ValueCardRow
        eyebrow="Principles"
        heading="Most Australians have more options than they realise. We help you see them."
        cards={[
          {
            title: "Strategy first",
            body: "We start with the picture, not the product. Where you are, where you want to be, and the gap between the two. Everything that follows starts from there.",
          },
          {
            title: "The right specialists",
            body: "We bring in the licensed brokers, accountants, SMSF specialists and property partners who actually fit your position. Not whoever pays the highest commission.",
          },
          {
            title: "We stay in the picture",
            body: "Our work doesn't end at the introduction. We sit across your team for the long haul, so the moves you have started actually finish.",
          },
        ]}
      />

      <TestimonialBlock
        eyebrow="In their words"
        heading="Real Australians, real outcomes."
        items={[
          {
            quote: "Dan showed us some ways to tax minimise and helped with those interest rates.",
            name: "Adam Walker",
            context: "Kismet client",
          },
          {
            quote: "They made me feel like a person and not a number lost in a system. Honestly wished I could give more than 5 stars.",
            name: "Riley-James Hogg",
            context: "Kismet client",
          },
          {
            quote: "My Self Managed Super Fund is actually working productively. Could not recommend Dan, Josh, Shane and Stuart highly enough.",
            name: "Robyn Willers",
            context: "SMSF client",
          },
        ]}
      />
    </>
  );
}
