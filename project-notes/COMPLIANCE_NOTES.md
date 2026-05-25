# Compliance Notes

These are the compliance rules that govern every word on the Kismet site. They are not optional. If a piece of copy conflicts with anything below, the copy gets changed.

## What Kismet is

Kismet Finance Group Pty Ltd (ABN 17 665 148 390) operates as an authorised representative within the Home Loan Solutions / Australian Finance Group network.

That is the formal description. Plain version: Kismet is a strategic finance coordinator. Kismet brings the bigger picture together and connects clients with vetted, independently licensed specialists. The licensed specialists do the regulated work.

## What Kismet is NOT

- Not a financial planner.
- Not an Australian Financial Services Licence (AFSL) holder.
- Not an Australian Credit Licence (ACL) holder.
- Not a tax agent.
- Not a legal practice.
- Not an accountant.
- Not a property developer or vendor.

## Hard rules (apply to every piece of copy and every conversation)

1. Kismet does not provide personal financial advice.
2. Kismet does not provide credit advice.
3. Kismet does not provide tax advice.
4. Kismet does not provide legal advice.
5. Kismet does not provide accounting advice.
6. Kismet does not sell financial products.
7. Kismet does not take fees or commissions from clients.
8. Kismet does not promise outcomes, returns, savings or guarantees of any kind.
9. Personal advice is referred to the licensed specialist in the network. Always.
10. General observations are fine. "You should..." statements are not.

## AFG / HLS attribution rules

Whenever the network is referenced on the site, attribution must be precise.

- Australian Finance Group Ltd is the licensee. Their licence is `Australian Credit Licence 389087`.
- Home Loan Solutions is the AFG aggregator within which Kismet operates as an authorised representative.
- The lender panel size is "approximately 70 Australian lenders" through the AFG aggregation network. Do not state a precise number that varies by month.
- The AFG network includes approximately 3,500 brokers Australia-wide. AFG was established in 1994 and has been ASX-listed since 2015. These facts are usable as authority anchors on the About page.

Standard formal attribution line (used in `components/ComplianceLine.tsx`):

> Kismet Finance Group Pty Ltd (ABN 17 665 148 390) operates as an authorised representative within the Home Loan Solutions / Australian Finance Group network. Australian Finance Group Ltd holds Australian Credit Licence 389087. Finance introductions are made to brokers in the AFG aggregation network, who can draw on a panel of approximately 70 Australian lenders. Kismet does not hold its own AFSL or Australian Credit Licence, and does not provide personal financial, credit or tax advice. The regulated work is performed by independently licensed specialists. Information here is general only.

## Where compliance language lives

Compliance language is quarantined. It does not bleed into hero or marketing copy. It lives in three places:

1. The dedicated Boundaries section on `/approach`. This section is titled "What we are. What we aren't." and contains the formal disclaimer plus a five-point negative list ("we don't hold our own credit licence", etc.).
2. The `ComplianceLine` component. Imported into the Boundaries section and the bottom of every Insights article.
3. The site footer. Compliance attribution at the very bottom of every page.

Everywhere else on the site (Hero copy, BiggerPicture, StrategicPathways, About philosophy, etc.) the voice is confident and capability-led. Disclaimer-voice is forbidden in marketing context.

## Article disclaimer rule

Every Insights article ends with the `ComplianceLine` component. The line "Information here is general only" is non-negotiable on article pages.

Article copy must never:

- Tell the reader what to do with their own money.
- Suggest a specific lender, product or structure for the reader.
- State an outcome ("you'll save X", "you'll be ahead by Y").

Article copy can:

- Explain how a structure works generally.
- Give framing on a category (e.g. how SMSF property purchases work).
- Reference industry stats and research with attribution.
- Refer the reader to "speak to a licensed specialist" for their personal situation.

## Accountant, broker, planner referrals

When Kismet introduces a client to a licensed professional in the network, the licensed professional's regulated advice is theirs. Kismet's role ends at the introduction and the strategic coordination around it.

Copy must reflect this. Never imply Kismet is doing the licensed work. Always frame the licensed work as belonging to the licensed party.

## Outcome promises

Forbidden language anywhere on the site:

- "Guaranteed savings"
- "We will save you X"
- "Guaranteed returns"
- "Better outcomes guaranteed"
- "Risk-free"
- "No risk"

All of the above are misleading conduct under ASIC and ACCC rules and would expose Kismet directly. Do not use them under any framing.

## Third-party logos and references

When referencing AFG, Home Loan Solutions, or any partner organisation, do not place their logos in a way that suggests Kismet IS the licensee. Attribution wording must always make the relationship clear (authorised representative, not principal).

## When in doubt

Refer to Dave Caffarelli (licensed broker in the Kismet network) for any specific compliance question. Do not publish copy that sits in the grey zone between "general framing" and "personal advice" without a licensed review.
