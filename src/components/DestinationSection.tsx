import type { Destination, Flight, Hotel, Airbnb, CarRental } from "@/lib/types";
import FlightCard from "./cards/FlightCard";
import AccommodationCard from "./cards/AccommodationCard";
import CarRentalCard from "./cards/CarRentalCard";
import RestaurantCard from "./cards/RestaurantCard";
import BarCard from "./cards/BarCard";
import ActivityCard from "./cards/ActivityCard";
import BeachCard from "./cards/BeachCard";
import DayTripCard from "./cards/DayTripCard";
import CoffeeCard from "./cards/CoffeeCard";
import BookingPriorities from "./BookingPriorities";
import SpecialNote from "./SpecialNote";
import CookingNight from "./CookingNight";
import WineSection from "./WineSection";
import MarketSection from "./MarketSection";
import MidsommarOpen from "./MidsommarOpen";

function formatDateRange(arrive: string, depart: string): string {
  const a = new Date(arrive + "T00:00:00");
  const d = new Date(depart + "T00:00:00");
  const aStr = a.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const dStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${aStr} – ${dStr}`;
}

interface Props {
  destination: Destination;
  flights: Flight[];
  hotels: Hotel[];
  airbnbs: Airbnb[];
  carRentals: CarRental[];
}

function SectionHeading({ emoji, title, count }: { emoji: string; title: string; count?: number }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{emoji}</span>
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-navy">
          {title}
        </h3>
        {count !== undefined && count > 0 && (
          <span className="text-xs text-warm-gray bg-sand/40 rounded-full px-2 py-0.5 font-medium">
            {count}
          </span>
        )}
      </div>
      <div className="mt-2 mb-6 h-px bg-gradient-to-r from-sand/80 to-transparent" />
    </>
  );
}

const heroTopBorder: Record<string, string> = {
  stockholm: "border-t-4 border-t-sea",
  paris: "border-t-4 border-t-terracotta",
  mallorca: "border-t-4 border-t-olive",
  crete: "border-t-4 border-t-wine",
};

export default function DestinationSection({
  destination,
  flights,
  hotels,
  airbnbs,
  carRentals,
}: Props) {
  const d = destination;

  return (
    <section id={d.id} className="scroll-mt-20">
      {/* Hero */}
      <div className={`bg-navy text-white py-10 md:py-14 px-4 relative overflow-hidden ${heroTopBorder[d.id] || ""}`}>
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <p className="text-terracotta-light text-sm font-medium tracking-[0.15em] uppercase mb-2">
                {d.country} {d.emoji} &middot; {d.nights} nights
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight mb-3">
                {d.name}
                {d.region && (
                  <span className="text-warm-gray-light text-lg md:text-2xl font-normal ml-3">
                    {d.region}
                  </span>
                )}
              </h2>
              <p className="text-warm-gray-light text-sm md:text-base">
                {formatDateRange(d.dates.arrive, d.dates.depart)}
              </p>
              {d.weather && (
                <div className="mt-2 space-y-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-warm-gray-light/80 text-xs md:text-sm">
                    <span>
                      ☀️ {d.weather.highF}°F / {d.weather.highC}°C highs
                    </span>
                    <span className="text-warm-gray-light/40">·</span>
                    <span>
                      {d.weather.lowF}°F / {d.weather.lowC}°C lows
                    </span>
                    <span className="text-warm-gray-light/40">·</span>
                    <span>Sunset {d.weather.sunset}</span>
                  </div>
                  <p className="text-warm-gray-light/60 text-xs">
                    {d.weather.conditions}
                    {d.weather.note && (
                      <span className="ml-1">— {d.weather.note}</span>
                    )}
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {d.travelers.map((name) => (
                <span
                  key={name}
                  className="bg-white/10 text-white/90 text-xs px-2.5 py-1 rounded-full"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
          {d.vibe && (
            <p className="mt-5 text-warm-gray-light/80 text-sm md:text-base leading-relaxed max-w-2xl italic">
              {d.vibe}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-10 md:space-y-14">
        {/* Special Notes */}
        {d.specialNotes.length > 0 && (
          <div className="space-y-4">
            {d.specialNotes.map((note, i) => (
              <SpecialNote key={i} note={note} />
            ))}
          </div>
        )}

        {/* Midsommar open venues */}
        {d.confirmedOpenMidsommar && d.confirmedOpenMidsommar.length > 0 && (
          <MidsommarOpen venues={d.confirmedOpenMidsommar} />
        )}

        {/* Flights into this destination */}
        {flights.length > 0 && (
          <div>
            <SectionHeading emoji="✈️" title="Getting There" />
            <div className="space-y-4">
              {flights.map((f) => (
                <FlightCard key={f.leg} flight={f} />
              ))}
            </div>
          </div>
        )}

        {/* Accommodation */}
        {(d.accommodation.type !== "family" || hotels.length > 0 || airbnbs.length > 0) && (
          <div>
            <SectionHeading emoji="🏨" title="Where You're Staying" />
            {d.accommodation.type === "family" && (
              <div className="bg-white rounded-xl p-5 md:p-6 border border-sand/60 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-serif text-lg font-semibold">{d.accommodation.name}</p>
                    {d.accommodation.details && (
                      <p className="text-warm-gray text-sm mt-1">{d.accommodation.details}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {hotels.map((h) => (
              <AccommodationCard key={h.id} hotel={h} />
            ))}
            {airbnbs.map((a) => (
              <AccommodationCard key={a.id} airbnb={a} />
            ))}
          </div>
        )}

        {/* Car Rental */}
        {carRentals.length > 0 && (
          <div>
            <SectionHeading emoji="🚗" title="Your Ride" />
            <div className="space-y-4">
              {carRentals.map((cr) => (
                <CarRentalCard key={cr.id} rental={cr} />
              ))}
            </div>
          </div>
        )}

        {/* Weekly Markets */}
        {d.weeklyMarkets && d.weeklyMarkets.length > 0 && (
          <MarketSection markets={d.weeklyMarkets} />
        )}

        {/* Activities */}
        {d.activities.length > 0 && (
          <div>
            <SectionHeading emoji="🗺️" title="Things to Do" count={d.activities.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.activities.map((a, i) => (
                <ActivityCard key={i} activity={a} />
              ))}
            </div>
          </div>
        )}

        {/* Day Trips */}
        {d.dayTrips.length > 0 && (
          <div>
            <SectionHeading emoji="🚙" title="Day Trips & Drives" count={d.dayTrips.length} />
            <div className="space-y-4">
              {d.dayTrips.map((dt, i) => (
                <DayTripCard key={i} trip={dt} />
              ))}
            </div>
          </div>
        )}

        {/* Beaches */}
        {d.beaches.length > 0 && (
          <div>
            <SectionHeading emoji="🏖️" title="Beaches" count={d.beaches.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.beaches.map((b, i) => (
                <BeachCard key={i} beach={b} />
              ))}
            </div>
          </div>
        )}

        {/* Cooking Night */}
        {d.cookingNight && <CookingNight cooking={d.cookingNight} />}

        {/* Wines */}
        {d.wines && d.wines.length > 0 && <WineSection wines={d.wines} />}

        {/* Restaurants */}
        {d.restaurants.length > 0 && (
          <div>
            <SectionHeading emoji="🍽️" title="Restaurants" count={d.restaurants.length} />
            <div className="space-y-4">
              {d.restaurants.map((r, i) => (
                <RestaurantCard key={i} restaurant={r} />
              ))}
            </div>
          </div>
        )}

        {/* Bars */}
        {d.bars.length > 0 && (
          <div>
            <SectionHeading emoji="🍸" title="Bars & Wine" count={d.bars.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.bars.map((b, i) => (
                <BarCard key={i} bar={b} />
              ))}
            </div>
          </div>
        )}

        {/* Coffee */}
        {d.coffee.length > 0 && (
          <div>
            <SectionHeading emoji="☕" title="Coffee & Fika" count={d.coffee.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {d.coffee.map((c, i) => (
                <CoffeeCard key={i} coffee={c} />
              ))}
            </div>
          </div>
        )}

        {/* Booking Priorities */}
        {d.bookingPriorities.length > 0 && (
          <BookingPriorities priorities={d.bookingPriorities} />
        )}
      </div>

      {/* Destination divider */}
      <div className="section-divider mx-4" />
    </section>
  );
}
