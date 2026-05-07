export function BookingEmbed() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
  if (!url) {
    return (
      <div className="kismet-surface p-10 md:p-12 min-h-[480px] flex flex-col items-start justify-center">
        <div className="eyebrow eyebrow-with-dot mb-7">
          <span className="eyebrow-dot" />
          <span>Calendar coming online</span>
        </div>
        <div className="font-serif text-[1.625rem] md:text-[1.875rem] leading-[1.18] tracking-[-0.008em] text-white mb-5 max-w-md">
          Booking link is being finalised.
        </div>
        <p className="text-[15px] text-white/65 leading-[1.78] max-w-md">
          Until then, send a note on the right and we will reply within one business day with a time that suits.
        </p>
        <p className="mt-10 text-[10px] uppercase tracking-[0.24em] text-gold/55">
          NEXT_PUBLIC_BOOKING_URL to enable
        </p>
      </div>
    );
  }
  return (
    <div className="kismet-surface-elevated overflow-hidden">
      <iframe
        src={url}
        title="Book a Kismet strategy call"
        className="w-full h-[680px] bg-white"
      />
    </div>
  );
}
