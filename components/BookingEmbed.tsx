export function BookingEmbed() {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";
  if (!url) {
    return (
      <div className="border border-white/10 bg-white/[0.02] p-8 h-[600px] flex flex-col items-start justify-center">
        <div className="font-serif text-xl text-white mb-3">Booking link being set up.</div>
        <p className="text-white/65 leading-relaxed mb-1">
          Until then, use the form on the right to send a note. We will reply within one business day.
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-gold/60 mt-6">
          Configure NEXT_PUBLIC_BOOKING_URL to enable
        </p>
      </div>
    );
  }
  return (
    <iframe
      src={url}
      title="Book a Kismet strategy call"
      className="w-full h-[700px] rounded-sm border border-white/10 bg-white"
    />
  );
}
