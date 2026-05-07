import { Hero } from "@/components/Hero";
import { ValueCardRow } from "@/components/ValueCardRow";
import { TestimonialBlock } from "@/components/TestimonialBlock";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow={<span className="placeholder-copy">[VOICE PLACEHOLDER: short positioning line, max 4 words. Strategic coordinator framing. Avoid generic "Strategic Connections".]</span>}
        headline={
          <span className="placeholder-copy">
            [VOICE PLACEHOLDER: outcome-led headline. One sentence. Boutique consultancy tone. Not punchy marketing-speak. Speaks to a high-earning Australian who has not yet built a strategic plan around their money.]
          </span>
        }
        sub={
          <span className="placeholder-copy">
            [VOICE PLACEHOLDER: 1-2 sentence subhead. Specific, not generic. Frames Kismet as the operator who orchestrates a client's whole financial picture across multiple specialists, over years.]
          </span>
        }
        ctaLabel="Book a private call"
        ctaHref="/contact"
      />
      <ValueCardRow
        heading={
          <span className="placeholder-copy">
            [VOICE PLACEHOLDER: section heading. One short sentence. Not "What we do". Speaks to outcomes, not features.]
          </span>
        }
        cards={[
          {
            title: <span className="placeholder-copy">[VOICE PLACEHOLDER: 2-3 word title]</span>,
            body: <span className="placeholder-copy">[VOICE PLACEHOLDER: 1-2 sentences. Strategic coordinator framing.]</span>,
          },
          {
            title: <span className="placeholder-copy">[VOICE PLACEHOLDER: 2-3 word title]</span>,
            body: <span className="placeholder-copy">[VOICE PLACEHOLDER: 1-2 sentences.]</span>,
          },
          {
            title: <span className="placeholder-copy">[VOICE PLACEHOLDER: 2-3 word title]</span>,
            body: <span className="placeholder-copy">[VOICE PLACEHOLDER: 1-2 sentences.]</span>,
          },
        ]}
      />
      <TestimonialBlock
        items={[
          {
            quote: <span className="placeholder-copy">[VOICE PLACEHOLDER: real client quote, picked by Shane in Task 17]</span>,
            name: "[Name]",
            context: "[Context]",
          },
          {
            quote: <span className="placeholder-copy">[VOICE PLACEHOLDER]</span>,
            name: "[Name]",
            context: "[Context]",
          },
          {
            quote: <span className="placeholder-copy">[VOICE PLACEHOLDER]</span>,
            name: "[Name]",
            context: "[Context]",
          },
        ]}
      />
    </>
  );
}
