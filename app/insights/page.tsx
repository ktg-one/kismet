import { Hero } from "@/components/Hero";
import { InsightsBento } from "@/components/InsightsBento";
import { listArticles } from "@/lib/articles";

export const metadata = {
  title: "Insights | Kismet Finance Group",
  description:
    "Short, plain-English reads on lending, structure, SMSF property and the conversations that actually change things. General information only, never advice.",
};

export default async function Insights() {
  const articles = await listArticles();
  return (
    <>
      <Hero
        eyebrow="Insights"
        headline="Why earning more"
        headlineMuted="doesn't always mean getting ahead."
        sub={
          <>
            Short reads on lending, structure, SMSF property and the conversations that actually
            change things. Plain English. General information only, never advice.
          </>
        }
        ctaLabel="Book a call"
        ctaHref="https://calendar.app.google/gBTNh7XSxQXxiXZF7"
        showScrollCue={false}
      />

      <InsightsBento articles={articles} />
    </>
  );
}
