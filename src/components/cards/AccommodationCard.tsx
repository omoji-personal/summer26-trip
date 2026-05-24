import type { Hotel, Airbnb } from "@/lib/types";

function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 shadow-sm overflow-hidden card-hover">
      <div className="bg-terracotta/10 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🏨</span>
          <span className="font-serif font-semibold text-navy">{hotel.name}</span>
          <span className="text-xs text-terracotta">
            {"★".repeat(hotel.stars)}
          </span>
        </div>
        {hotel.adultOnly && (
          <span className="text-xs text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
            Adults only ({hotel.adultAge}+)
          </span>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Check-in</p>
            <p className="font-medium">
              {new Date(hotel.checkIn + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Check-out</p>
            <p className="font-medium">
              {new Date(hotel.checkOut + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Rooms</p>
            <p className="font-medium">{hotel.rooms}</p>
          </div>
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Total</p>
            <p className="font-medium text-terracotta">{hotel.totalPrice}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          {hotel.breakfast && (
            <div className="flex items-start gap-2">
              <span className="text-green-600 text-xs mt-0.5">&#10003;</span>
              <span className="text-warm-gray">{hotel.breakfast}</span>
            </div>
          )}
          {hotel.welcome && (
            <div className="flex items-start gap-2">
              <span className="text-green-600 text-xs mt-0.5">&#10003;</span>
              <span className="text-warm-gray">{hotel.welcome}</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-sand/30 space-y-2 text-xs text-warm-gray">
          <p>
            <span className="font-medium text-navy">Booking code:</span>{" "}
            <span className="font-mono">{hotel.bookingCode}</span>
          </p>
          <p>
            <span className="font-medium text-navy">Address:</span> {hotel.address}
          </p>
          <p>
            <span className="font-medium text-navy">Phone:</span> {hotel.phone}
          </p>
          <p>
            <span className="font-medium text-navy">Payment:</span> {hotel.payment}
          </p>
          <p>
            <span className="font-medium text-navy">Cancellation:</span>{" "}
            {hotel.cancellation}
          </p>
          {hotel.parking && (
            <p>
              <span className="font-medium text-navy">Parking:</span> {hotel.parking}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function AirbnbCard({ airbnb }: { airbnb: Airbnb }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 shadow-sm overflow-hidden card-hover">
      <div className="bg-terracotta/10 px-5 py-3 flex items-center gap-2">
        <span className="text-lg">🏡</span>
        <span className="font-serif font-semibold text-navy">{airbnb.name}</span>
      </div>

      <div className="p-5 md:p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Check-in</p>
            <p className="font-medium">
              {new Date(airbnb.checkIn + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {airbnb.checkInTime}
            </p>
          </div>
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Check-out</p>
            <p className="font-medium">
              {new Date(airbnb.checkOut + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              at {airbnb.checkOutTime}
            </p>
          </div>
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Duration</p>
            <p className="font-medium">{airbnb.nights} nights</p>
          </div>
          <div>
            <p className="text-xs text-warm-gray uppercase tracking-wide mb-0.5">Guests</p>
            <p className="font-medium">{airbnb.guests}</p>
          </div>
        </div>
        {airbnb.notes && (
          <p className="mt-4 text-xs text-warm-gray">{airbnb.notes}</p>
        )}
      </div>
    </div>
  );
}

export default function AccommodationCard({
  hotel,
  airbnb,
}: {
  hotel?: Hotel;
  airbnb?: Airbnb;
}) {
  if (hotel) return <HotelCard hotel={hotel} />;
  if (airbnb) return <AirbnbCard airbnb={airbnb} />;
  return null;
}
