import type { DayTrip } from "@/lib/types";

export default function DayTripCard({ trip }: { trip: DayTrip }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 shadow-sm overflow-hidden card-hover">
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
          <h4 className="font-serif text-lg font-semibold text-navy">{trip.name}</h4>
          <span className="text-xs text-olive bg-olive/10 rounded-full px-2.5 py-0.5 whitespace-nowrap flex-shrink-0">
            {trip.driveTime}
          </span>
        </div>
        <p className="text-sm text-navy/80 leading-relaxed">{trip.highlights}</p>
      </div>
    </div>
  );
}
