export function ComplianceLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-neutral/70 leading-relaxed ${className}`}>
      Kismet Finance Group Pty Ltd (ABN 17 665 148 390) operates under an authorised representative
      arrangement with Home Loan Solutions, a member of the Australian Finance Group aggregation
      network (Australian Finance Group Ltd, Australian Credit Licence 389087). The regulated
      work is performed by independently licensed specialists. Information here is general only and
      does not constitute personal financial, credit or tax advice.
    </p>
  );
}
