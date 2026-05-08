import { Hero } from "@/components/Hero";
import { InsightsBento } from "@/components/InsightsBento";
import { listArticles } from "@/lib/articles";

export const metadata = {
  title: "Strategic Insights | Kismet Finance Group",
  description:
    "Operator notes from Kismet. Short, plain-English reads on lending, structure, SMSF property and the conversations that change outcomes. General information only.",
};

export default async function Insights() {
  const articles = await listArticles();
  return (
    <>
      <Hero
        eyebrow="Strategic Insights"
        headline="Why earning more"
        headlineMuted="doesn't always mean getting ahead."
        sub={
          <>
            Operator notes on lending, structure, SMSF property and the conversations that change
            outcomes. Short reads, plain English. General information only, never advice.
          </>
        }
        ctaLabel="Begin the Conversation"
        ctaHref="/contact"
        showScrollCue={false}
      />

      <InsightsBento articles={articles} />
    </>
  );
}
