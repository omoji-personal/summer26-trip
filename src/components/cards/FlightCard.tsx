import type { Flight } from "@/lib/types";

export default function FlightCard({ flight }: { flight: Flight }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 shadow-sm overflow-hidden card-hover">
      {/* Header bar — refined navy with eyebrow + confirmation in folio italic */}
      <div className="bg-navy px-5 py-3 flex items-center justify-between gap-3">
        <span className="eyebrow text-cream/90 text-[0.65rem]">
          {flight.airline}
        </span>
        {flight.confirmation && (
          <span
            className="font-serif italic text-terracotta-light text-sm tracking-wide"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {flight.confirmation}
          </span>
        )}
      </div>

      <div className="p-5 md:p-7">
        {/* Label & date */}
        <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
          <h4
            className="font-serif text-xl md:text-2xl font-medium text-navy leading-tight"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
          >
            {flight.label}
          </h4>
          <span className="eyebrow text-[0.65rem] text-warm-gray bg-cream-dark/70 rounded-full px-3 py-1">
            {new Date(flight.date + "T00:00:00").toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Segments */}
        <div className="space-y-3">
          {flight.segments.map((seg, i) => (
            <div
              key={i}
              className="flex items-center gap-3 md:gap-5 text-sm bg-cream/55 rounded-lg p-3.5 border border-sand/40"
            >
              <div className="text-center min-w-[56px]">
                <p className="font-semibold text-navy text-[15px]">
                  {seg.depart}
                </p>
                <p className="text-[11px] text-warm-gray font-medium tracking-widest mt-0.5">
                  {seg.from}
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[10px] text-warm-gray mb-1 tracking-wider uppercase">
                  {seg.flight}
                </span>
                <div className="w-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta shrink-0" />
                  <div className="flex-1 border-t border-dashed border-sand" />
                  <div className="w-1.5 h-1.5 rounded-full bg-sea shrink-0" />
                </div>
                <span className="text-[10px] text-warm-gray mt-1 italic">
                  {seg.class}
                </span>
              </div>
              <div className="text-center min-w-[56px]">
                <p className="font-semibold text-navy text-[15px]">
                  {seg.arrive}
                </p>
                <p className="text-[11px] text-warm-gray font-medium tracking-widest mt-0.5">
                  {seg.to}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-warm-gray">
          {flight.passengers.length > 0 && (
            <span>
              <span className="font-medium text-navy">Passengers</span>
              <span className="text-warm-gray/50 mx-1.5" aria-hidden="true">
                ·
              </span>
              {flight.passengers.join(", ")}
            </span>
          )}
          {flight.price && (
            <span>
              <span className="font-medium text-navy">Price</span>
              <span className="text-warm-gray/50 mx-1.5" aria-hidden="true">
                ·
              </span>
              {flight.price}
            </span>
          )}
          {flight.seat && (
            <span>
              <span className="font-medium text-navy">Seat</span>
              <span className="text-warm-gray/50 mx-1.5" aria-hidden="true">
                ·
              </span>
              {flight.seat}
            </span>
          )}
          {flight.seats && (
            <span>
              <span className="font-medium text-navy">Seats</span>
              <span className="text-warm-gray/50 mx-1.5" aria-hidden="true">
                ·
              </span>
              {Object.entries(flight.seats)
                .map(([name, seat]) => `${name}: ${seat}`)
                .join(", ")}
            </span>
          )}
        </div>

        {/* Notes */}
        {flight.notes && (
          <p className="mt-3 text-xs text-warm-gray leading-relaxed bg-cream/55 rounded-lg p-3 border-l-2 border-sand/80">
            {flight.notes}
          </p>
        )}
      </div>
    </div>
  );
}
