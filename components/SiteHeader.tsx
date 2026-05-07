import Link from "next/link";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "How we work" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-navy-deep/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="font-serif text-lg tracking-[0.18em] text-gold uppercase">
          Kismet
        </Link>
        <nav className="hidden md:flex items-center gap-9 text-[11px] uppercase tracking-[0.14em] text-white/75">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-gold transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="text-[11px] uppercase tracking-[0.14em] font-semibold px-5 py-2.5 rounded-sm bg-gold-gradient text-navy-deep shadow-[0_4px_20px_rgba(212,175,55,0.18)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.32)] transition-shadow"
        >
          Book a private call
        </Link>
      </div>
    </header>
  );
}
