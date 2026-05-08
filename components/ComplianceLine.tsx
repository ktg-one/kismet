export function ComplianceLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-neutral/70 leading-relaxed ${className}`}>
      Kismet Finance Group Pty Ltd (ABN 17 665 148 390) operates as an authorised representative
      within the Home Loan Solutions / Australian Finance Group network. Australian Finance Group
      Ltd holds Australian Credit Licence 389087. Finance introductions are made to brokers in the
      AFG aggregation network, who can draw on a panel of approximately 70 Australian lenders.
      Kismet does not hold its own AFSL or Australian Credit Licence, and does not provide personal
      financial, credit or tax advice. The regulated work is performed by independently licensed
      specialists. Information here is general only.
    </p>
  );
}
