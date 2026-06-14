import type { DayTrip } from "@/lib/types";

export default function DayTripCard({ trip }: { trip: DayTrip }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 border-l-4 border-l-olive/40 shadow-sm overflow-hidden card-hover">
      {trip.imageUrl && (
        <img
          src={trip.imageUrl}
          alt={trip.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4
            className="font-serif text-lg md:text-xl font-medium text-navy leading-tight"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
          >
            {trip.name}
          </h4>
          <span
            className="text-[11px] text-olive bg-olive/10 border border-olive/25 rounded-full px-2.5 py-0.5 whitespace-nowrap shrink-0 italic font-serif tracking-wide"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {trip.driveTime}
          </span>
        </div>
        <p className="text-sm text-navy/85 leading-relaxed">{trip.highlights}</p>
      </div>
    </div>
  );
}
