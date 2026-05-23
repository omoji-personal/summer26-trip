import type { Flight } from "@/lib/types";

export default function FlightCard({ flight }: { flight: Flight }) {
  return (
    <div className="bg-white rounded-xl border border-sand/40 shadow-sm overflow-hidden card-hover">
      {/* Header bar */}
      <div className="bg-navy-light px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">✈️</span>
          <span className="text-white font-medium text-sm">{flight.airline}</span>
        </div>
        <span className="text-terracotta-light text-xs font-mono tracking-wide">
          {flight.confirmation}
        </span>
      </div>

      <div className="p-5 md:p-6">
        {/* Label & date */}
        <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
          <h4 className="font-serif text-lg font-semibold text-navy">{flight.label}</h4>
          <span className="text-xs text-warm-gray bg-cream-dark rounded-full px-3 py-1">
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
              className="flex items-center gap-3 md:gap-5 text-sm bg-cream/50 rounded-lg p-3"
            >
              <div className="text-center min-w-[52px]">
                <p className="font-semibold text-navy">{seg.depart}</p>
                <p className="text-xs text-warm-gray font-mono">{seg.from}</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-[10px] text-warm-gray mb-1">{seg.flight}</span>
                <div className="w-full flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                  <div className="flex-1 border-t border-dashed border-sand" />
                  <div className="w-1.5 h-1.5 rounded-full bg-sea flex-shrink-0" />
                </div>
                <span className="text-[10px] text-warm-gray mt-1">{seg.class}</span>
              </div>
              <div className="text-center min-w-[52px]">
                <p className="font-semibold text-navy">{seg.arrive}</p>
                <p className="text-xs text-warm-gray font-mono">{seg.to}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-warm-gray">
          <span>
            <span className="font-medium text-navy">Passengers:</span>{" "}
            {flight.passengers.join(", ")}
          </span>
          {flight.price && (
            <span>
              <span className="font-medium text-navy">Price:</span> {flight.price}
            </span>
          )}
          {flight.seat && (
            <span>
              <span className="font-medium text-navy">Seat:</span> {flight.seat}
            </span>
          )}
        </div>

        {/* Notes */}
        {flight.notes && (
          <p className="mt-3 text-xs text-warm-gray leading-relaxed bg-cream/50 rounded-lg p-3 border-l-2 border-sand">
            {flight.notes}
          </p>
        )}
      </div>
    </div>
  );
}
