import type { CarRental } from "@/lib/types";

export default function CarRentalCard({ rental }: { rental: CarRental }) {
  return (
    <div className="bg-white rounded-xl border border-sand/40 shadow-sm overflow-hidden card-hover">
      <div className="bg-sea/10 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🚗</span>
          <span className="font-serif font-semibold text-navy">
            {rental.company} &mdash; {rental.vehicle}
          </span>
        </div>
        <span className="text-sea font-semibold text-sm">{rental.totalPrice}</span>
      </div>

      <div className="p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Pick-up */}
          <div className="bg-cream/50 rounded-lg p-3">
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">
              Pick-up
            </p>
            <p className="font-medium">
              {new Date(rental.pickUp.date + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {rental.pickUp.time}
            </p>
            <p className="text-xs text-warm-gray mt-0.5">{rental.pickUp.location}</p>
          </div>
          {/* Drop-off */}
          <div className="bg-cream/50 rounded-lg p-3">
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-1">
              Drop-off
            </p>
            <p className="font-medium">
              {new Date(rental.dropOff.date + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {rental.dropOff.time}
            </p>
            <p className="text-xs text-warm-gray mt-0.5">{rental.dropOff.location}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-warm-gray">
          <span>
            <span className="font-medium text-navy">Class:</span> {rental.vehicleClass}
          </span>
          <span>
            <span className="font-medium text-navy">Duration:</span> {rental.duration}
          </span>
          <span>
            <span className="font-medium text-navy">Capacity:</span> {rental.capacity}
          </span>
          <span>
            <span className="font-medium text-navy">Confirmation:</span>{" "}
            <span className="font-mono">{rental.confirmation}</span>
          </span>
        </div>

        <p className="mt-2 text-xs text-warm-gray">
          {rental.priceBreakdown} &mdash; {rental.paymentNote}
        </p>
      </div>
    </div>
  );
}
