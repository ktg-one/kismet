export function ComplianceLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-neutral/70 leading-relaxed ${className}`}>
      Kismet Finance Group is a strategic introducer. We do not hold an Australian Financial Services Licence and do not provide personal financial advice. Information here is general only. Always seek advice from a licensed professional before making financial decisions.
    </p>
  );
}
