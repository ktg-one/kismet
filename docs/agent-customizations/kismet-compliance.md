# Kismet Finance Group - Compliance Notes

## Entity and Licensing

| Field | Value |
|---|---|
| Legal entity | Kismet Finance Group Pty Ltd |
| ABN | 17 665 148 390 |
| AFSL | **Does NOT hold** - never imply otherwise |
| ACL | **Does NOT hold** - authorised representative status only |
| Authorised under | Home Loan Solutions (HLS) within Australian Finance Group (AFG) network |
| AFG Licence | Australian Credit Licence 389087 |
| AFCA membership | AFG's AFCA membership (footer references this) |

## What Kismet Is

Kismet Finance Group is a **mortgage broking and finance consultancy**. It:
- Compares loan products across a panel of approximately 70 Australian lenders
- Connects clients with appropriate lenders based on their circumstances
- Helps clients understand their options and navigate the loan process
- Operates as an authorised representative under AFG/HLS

## What Kismet Is NOT

Kismet does NOT provide:
- Personal financial advice (requires AFSL)
- Personal credit advice (requires ACL or authorised rep under ACL holder - AFG holds this)
- Tax advice
- Legal advice
- Investment advice
- General financial planning

**Never write or imply that Kismet provides any of the above services.**

## The Compliance Line Component

Every Insights article **must** include the `ComplianceLine` component at the bottom of the article:

```tsx
import ComplianceLine from "@/components/ComplianceLine";

// At the bottom of every Insights article:
<ComplianceLine />
```

This component renders the formal general advice warning. Do not write inline compliance disclaimers - use the component.

## Lender Panel

- Approximately **70 Australian lenders** on panel
- Never quote a precise number (e.g., "exactly 72 lenders") - use "approximately 70" or "around 70"
- This panel coverage is a credibility signal; reference it with confidence but not precision

## AFG Attribution

The formal AFG attribution appears in the site footer. It must:
1. Name Home Loan Solutions (HLS) as the authorised credit representative entity
2. Reference Australian Finance Group (AFG) ACL 389087
3. Be present on every page via the shared footer component

**Do not remove or modify AFG attribution without explicit compliance review.**

## General Advice Warning

The footer contains the general advice warning as required. This is separate from the ComplianceLine component (which is article-specific). Both must remain in place.

## AFCA

The footer references AFG's AFCA (Australian Financial Complaints Authority) membership. This is not Kismet's own AFCA membership - it is AFG's, flowing through to Kismet via authorised representative status.

## Copy Compliance Rules

### Regulated advice territory - hard no

Never write in a way that implies personal recommendation:
- No "you should..." 
- No "the right loan for you is..."
- No "we recommend you..."

### Acceptable framing

Capability framing that stays out of advice territory:
- "We compare loans across approximately 70 lenders"
- "We look at the full picture of your situation"
- "We find the fit that works for you" (note: "works for you" is general; "right for your financial situation" edges toward advice)
- "We connect you with lenders suited to your goals"

### Insights articles

All Insights articles are general information only. They must:
1. Not address any reader's personal financial situation
2. Include `ComplianceLine` component at bottom
3. Not make statements that could be read as personal financial advice
4. Be labelled as "general information" not "advice"

## What Cannot Be Changed Without Compliance Review

1. AFG attribution text in footer
2. General advice warning in footer  
3. `ComplianceLine` component content
4. Any mention of ACL 389087
5. ABN 17 665 148 390
6. Removal of the Boundaries section from `/how-we-work`

## Key Addresses

- Physical: 52 Cooper Road, Cockburn Central WA 6164
- Email: admin@kismetfinancegroup.com.au
- Phone: 08 6285 8501
