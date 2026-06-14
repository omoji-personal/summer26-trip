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
import ParisItinerary from "./ParisItinerary";
import ReservationsHighlight from "./ReservationsHighlight";

/** Why-this-pick rationale shown under each confirmed Mallorca dinner. */
const MALLORCA_RATIONALE: Record<string, string> = {
  "Ca'n Boqueta":
    "The local bib gourmand inside Sóller itself — walking distance from Pure Salt. Sat 27 was the spot the trip lost when Bens d'Avall closed and Sauerschell's never replied; this is the close-to-home pick that wins the night without a Tramuntana drive at midnight.",
  "Sebastián":
    "The Deià village benchmark — same family running it since 1994, lemon-garden setting, à la carte (so the parents stay clear of any 10-course marathon). The dinner the parents will tell their friends about.",
  "Marc Fosh ⭐":
    "The trip's destination dinner — 1 Michelin star in the 2026 Guide, inside a 17th-century converted seminary in Palma. Tasting-menus only by design; smart-casual; this is the one we built the Palma evening around.",
  "Randemar":
    "The last-night, walk-back-to-your-room dinner. Bay-facing terrace, à la carte, no big drive at the end of a long week. The trip closes here.",
};

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
  /** 1-indexed folio number for the destination (No. 01, 02, ...). */
  index: number;
}

function SectionHeading({ emoji, title, count }: { emoji: string; title: string; count?: number }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div className="flex items-baseline gap-3 min-w-0">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-cream-dark text-base shrink-0 self-center"
            aria-hidden="true"
          >
            {emoji}
          </span>
          <h3
            className="font-serif text-2xl md:text-3xl font-medium text-navy leading-none truncate"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
          >
            {title}
          </h3>
        </div>
        {count !== undefined && count > 0 && (
          <span
            className="font-serif italic text-warm-gray/85 text-base shrink-0"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {count}
          </span>
        )}
      </div>
      <div className="mb-7 h-px bg-gradient-to-r from-sand via-sand/50 to-transparent" />
    </>
  );
}

/* Per-destination color anchoring: top border + dot accent */
const destinationAccent: Record<
  string,
  { border: string; eyebrow: string; folio: string }
> = {
  stockholm: {
    border: "border-t-4 border-t-sea",
    eyebrow: "text-sea-light",
    folio: "text-sea-light/85",
  },
  paris: {
    border: "border-t-4 border-t-terracotta",
    eyebrow: "text-terracotta-light",
    folio: "text-terracotta-light/85",
  },
  mallorca: {
    border: "border-t-4 border-t-olive",
    eyebrow: "text-olive-light",
    folio: "text-olive-light/85",
  },
  crete: {
    border: "border-t-4 border-t-wine",
    eyebrow: "text-terracotta-light",
    folio: "text-terracotta-light/85",
  },
};

export default function DestinationSection({
  destination,
  flights,
  hotels,
  airbnbs,
  carRentals,
  index,
}: Props) {
  const d = destination;
  const accent = destinationAccent[d.id] || destinationAccent.paris;
  const folioNum = String(index).padStart(2, "0");

  return (
    <section id={d.id} className="scroll-mt-20">
      {/* Hero */}
      <div
        className={`relative text-white py-12 md:py-16 px-4 overflow-hidden ${accent.border} ${
          d.heroImage ? "min-h-[340px] md:min-h-[420px]" : "bg-navy"
        }`}
      >
        {d.heroImage ? (
          <>
            <img
              src={d.heroImage}
              alt={d.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/45 to-navy/80" />
          </>
        ) : (
          <div className="absolute inset-0 opacity-[0.04]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>
        )}

        {/* Hairline frame */}
        <div className="pointer-events-none absolute inset-3 md:inset-5 border border-cream/10" />

        <div className="relative max-w-5xl mx-auto">
          {/* Folio strip — Nº + country + nights, top-aligned */}
          <div className="flex items-baseline justify-between gap-3 flex-wrap mb-6 md:mb-10">
            <p className={`folio text-base md:text-lg ${accent.folio}`}>
              <sup>Nº</sup>
              {folioNum}
              <span className="mx-2 text-cream/45 not-italic" aria-hidden="true">
                /
              </span>
              <span className="not-italic eyebrow text-cream/90">
                {d.country} {d.emoji}
              </span>
              <span className="mx-2 text-cream/45 not-italic" aria-hidden="true">
                ·
              </span>
              <span className="not-italic eyebrow text-cream/80">
                {d.nights} {d.nights === 1 ? "night" : "nights"}
              </span>
            </p>
            <div className="flex items-center gap-1.5">
              {d.travelers.map((name) => (
                <span
                  key={name}
                  className="bg-white/15 text-white text-[11px] tracking-wide px-2.5 py-1 rounded-full backdrop-blur-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Title + region — asymmetric, italic flourish on region */}
          <div className="flex items-baseline gap-4 flex-wrap leading-none">
            <h2
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
            >
              {d.name}
            </h2>
            {d.region && (
              <span
                className="font-serif italic text-warm-gray-light text-xl md:text-3xl font-normal"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
              >
                {d.region}
              </span>
            )}
          </div>

          {/* Date + weather meta row */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-warm-gray-light text-sm">
            <span className="eyebrow text-[0.65rem] text-cream/90">
              {formatDateRange(d.dates.arrive, d.dates.depart)}
            </span>
            {d.weather && (
              <>
                <span className="text-cream/40" aria-hidden="true">·</span>
                <span className="text-xs md:text-sm">
                  ☀ {d.weather.highF}°F / {d.weather.highC}°C
                </span>
                <span className="text-cream/40" aria-hidden="true">·</span>
                <span className="text-xs md:text-sm">
                  Sunset {d.weather.sunset}
                </span>
              </>
            )}
          </div>
          {d.weather && (
            <p className="mt-2 text-warm-gray-light/80 text-xs">
              {d.weather.conditions}
              {d.weather.note && (
                <span className="ml-1.5 italic">— {d.weather.note}</span>
              )}
            </p>
          )}

          {/* Vibe — italic serif pullquote */}
          {d.vibe && (
            <p
              className="mt-7 md:mt-9 text-warm-gray-light text-base md:text-lg leading-relaxed max-w-2xl font-serif italic"
              style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
            >
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

        {/* PARIS: single-day itinerary REPLACES the restaurant/bar/activity dump. */}
        {d.itinerary && (
          <ParisItinerary itinerary={d.itinerary} />
        )}

        {/* For itinerary destinations (Paris), skip everything below — the day IS the page. */}
        {!d.itinerary && (
          <>
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

        {/* Restaurants — confirmed reservations always lead, others below */}
        {d.restaurants.length > 0 && (() => {
          const confirmed = d.restaurants.filter((r) => r.confirmed);
          const others = d.restaurants.filter((r) => !r.confirmed);
          const isMallorca = d.id === "mallorca";
          return (
            <>
              {/* Confirmed: editorial-card highlight on Mallorca, regular cards otherwise */}
              {confirmed.length > 0 && isMallorca && (
                <ReservationsHighlight
                  restaurants={confirmed}
                  rationale={MALLORCA_RATIONALE}
                />
              )}
              {confirmed.length > 0 && !isMallorca && (
                <div>
                  <SectionHeading
                    emoji="✓"
                    title="Reservations locked in"
                    count={confirmed.length}
                  />
                  <div className="space-y-4">
                    {confirmed.map((r, i) => (
                      <RestaurantCard key={i} restaurant={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other restaurants — the menu of options */}
              {others.length > 0 && (
                <div>
                  <SectionHeading
                    emoji="🍽️"
                    title={
                      confirmed.length > 0
                        ? isMallorca
                          ? "More to eat — walk-in & flex picks"
                          : "More restaurants"
                        : "Restaurants"
                    }
                    count={others.length}
                  />
                  <div className="space-y-4">
                    {others.map((r, i) => (
                      <RestaurantCard key={i} restaurant={r} />
                    ))}
                  </div>
                </div>
              )}
            </>
          );
        })()}

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
          </>
        )}
      </div>

      {/* Destination divider — fleuron ornament */}
      <div className="section-divider mx-4 my-6">
        <span className="fleuron" aria-hidden="true">
          ✦ ✦ ✦
        </span>
      </div>
    </section>
  );
}
