import Link from "next/link";
import { ComplianceLine } from "./ComplianceLine";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-navy-deep border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="font-serif text-lg tracking-[0.18em] text-gold uppercase">Kismet</Link>
          <p className="mt-4 text-sm text-white/55 max-w-sm leading-relaxed">
            Strategic finance coordination for Australians who want their money working harder than they do.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4">Site</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link href="/approach" className="hover:text-gold transition-colors">How we work</Link></li>
            <li><Link href="/insights" className="hover:text-gold transition-colors">Insights</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.18em] text-white/40 mb-4">Reach us</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li><a href="mailto:hello@kismetfinancegroup.com.au" className="hover:text-gold transition-colors">hello@kismetfinancegroup.com.au</a></li>
            <li className="text-white/45">ABN to confirm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <ComplianceLine />
        </div>
      </div>
    </footer>
  );
}
