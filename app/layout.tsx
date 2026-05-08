import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GrainOverlay } from "@/components/GrainOverlay";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600"],
});

const SITE_URL = "https://kismetfinancegroup.com.au";
const SITE_NAME = "Kismet Finance Group";
const TAGLINE = "Strategic finance coordination for Australians.";
const DESCRIPTION =
  "Kismet works alongside Australians who already have something built. We coordinate strategy, structure and the introductions to the licensed specialists who do the regulated work, so the moves you start actually finish.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Kismet Finance Group",
  keywords: [
    "Kismet Finance Group",
    "strategic finance coordination",
    "Australian property strategy",
    "SMSF property",
    "private finance introducer",
    "boutique finance consultancy",
  ],
  openGraph: {
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/photos/team-boardroom.jpg",
        width: 2400,
        height: 1350,
        alt: "Kismet Finance Group team in a working session",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: DESCRIPTION,
    images: ["/photos/team-boardroom.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: { canonical: SITE_URL },
  formatDetection: { telephone: true, email: true, address: true },
};

const ORGANISATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#organisation`,
  name: SITE_NAME,
  legalName: "Kismet Finance Group Pty Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/photos/team-boardroom.jpg`,
  image: `${SITE_URL}/photos/team-boardroom.jpg`,
  description: DESCRIPTION,
  identifier: { "@type": "PropertyValue", propertyID: "ABN", value: "17 665 148 390" },
  telephone: "+61862858501",
  email: "hello@kismetfinancegroup.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "52 Cooper Road",
    addressLocality: "Cockburn Central",
    addressRegion: "WA",
    postalCode: "6164",
    addressCountry: "AU",
  },
  areaServed: { "@type": "Country", name: "Australia" },
  founder: { "@type": "Person", name: "Shane Hewson" },
  foundingDate: "2024-11-07",
  slogan: "Strategy, structure and access. Coordinated.",
  sameAs: ["https://www.facebook.com/kismetfs"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANISATION_JSON_LD),
          }}
        />
        <meta name="theme-color" content="#0A1A32" />
      </head>
      <body className="font-sans bg-navy-deep text-white min-h-screen flex flex-col antialiased overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GrainOverlay />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
