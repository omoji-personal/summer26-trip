import Header from "@/components/Header";
import DestinationNav from "@/components/DestinationNav";
import DestinationSection from "@/components/DestinationSection";
import OpenItems from "@/components/OpenItems";
import FlightCard from "@/components/cards/FlightCard";
import SpecialNote from "@/components/SpecialNote";

import tripData from "../../data/trip.json";
import itineraryData from "../../data/itinerary.json";
import stockholmData from "../../data/destinations/stockholm.json";
import parisData from "../../data/destinations/paris.json";
import mallorcaData from "../../data/destinations/mallorca.json";
import creteData from "../../data/destinations/crete.json";
import athensData from "../../data/destinations/athens.json";

import type {
  Trip,
  Itinerary,
  Destination,
  Flight,
  Hotel,
  CarRental,
  PageConfig,
} from "@/lib/types";

const allDestinations: Record<string, Destination> = {
  stockholm: stockholmData as unknown as Destination,
  paris: parisData as unknown as Destination,
  mallorca: mallorcaData as unknown as Destination,
  crete: creteData as unknown as Destination,
};

const itinerary = itineraryData as Itinerary;

function stripFlight(f: Flight): Flight {
  return {
    ...f,
    confirmation: "",
    price: null,
    passengers: [],
    notes: undefined,
    seat: undefined,
    seats: undefined,
  };
}

function stripHotel(h: Hotel): Hotel {
  return {
    ...h,
    bookingCode: "",
    totalPrice: "",
    payment: "",
    nightlyBreakdown: undefined,
  };
}

function stripCarRental(c: CarRental): CarRental {
  return {
    ...c,
    confirmation: "",
    totalPrice: "",
    priceBreakdown: "",
    paymentNote: "",
  };
}

function getFlightsForDest(destId: string): Flight[] {
  const map: Record<string, string[]> = {
    stockholm: ["ARN"],
    paris: ["CDG"],
    mallorca: ["PMI"],
    crete: ["CHQ"],
  };
  return itinerary.flights.filter((f) =>
    (map[destId] || []).includes(f.segments[f.segments.length - 1].to)
  );
}

export default function TripPage({ config }: { config: PageConfig }) {
  const destinations = config.destinationIds.map((id) => allDestinations[id]);

  const tripOverride: Trip = {
    ...(tripData as Trip),
    title: config.title,
    route: config.route,
    travelers: config.travelers.map((name) => ({
      name,
      legs: ["all"],
    })),
    pacing: config.pacing,
  };

  const openItems = config.openItemFilter
    ? itinerary.openItems.filter(config.openItemFilter)
    : itinerary.openItems;

  return (
    <main className="flex-1">
      <Header trip={tripOverride} subtitle={config.subtitle} />
      <DestinationNav destinations={destinations} />

      {destinations.map((dest) => {
        let flights = config.showFlights ? getFlightsForDest(dest.id) : [];
        if (config.flightFilter) {
          flights = flights.filter((f) => config.flightFilter!(f.leg));
        }
        if (config.stripPersonalDetails) {
          flights = flights.map(stripFlight);
        }

        let hotels = itinerary.hotels.filter(
          (h) => h.destination === dest.id
        );
        if (config.stripPersonalDetails) {
          hotels = hotels.map(stripHotel);
        }

        const airbnbs = itinerary.airbnbs.filter(
          (a) => a.destination === dest.id
        );

        let carRentals = itinerary.carRentals.filter(
          (c) => c.destination === dest.id
        );
        if (config.stripPersonalDetails) {
          carRentals = carRentals.map(stripCarRental);
        }

        return (
          <DestinationSection
            key={dest.id}
            destination={dest}
            flights={flights}
            hotels={hotels}
            airbnbs={airbnbs}
            carRentals={carRentals}
          />
        );
      })}

      {/* Departure flights - full page only */}
      {config.showDepartureFlights && (
        <section className="max-w-4xl mx-auto px-4 py-10 md:py-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">🏠</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
              Getting Home
            </h2>
          </div>
          <div className="space-y-4">
            {itinerary.flights
              .filter((f) => {
                const lastTo = f.segments[f.segments.length - 1].to;
                return lastTo === "ATH" || lastTo === "ATL";
              })
              .map((f) => (
                <FlightCard key={f.leg} flight={f} />
              ))}
          </div>
          <p className="mt-4 text-sm text-warm-gray italic">
            Same-day connection: Crete (CHQ) 8:20 AM &rarr; Athens (ATH) 9:15
            AM &rarr; Atlanta (ATL) 5:42 PM. Separate tickets &mdash; reclaim
            bags at ATH between domestic and international terminals.
          </p>
        </section>
      )}

      {/* Athens transit - full page only */}
      {config.showAthensTransit && (
        <section className="max-w-4xl mx-auto px-4 py-8 md:py-10">
          <div className="bg-cream-dark/50 rounded-xl border border-sand/60 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🇬🇷</span>
              <h3 className="font-serif text-lg md:text-xl font-semibold text-navy">
                Athens &mdash; Airport Transit
              </h3>
              <span className="text-xs text-warm-gray bg-sand/40 rounded-full px-2 py-0.5 font-medium">
                ~3 hrs
              </span>
            </div>
            <p className="text-sm text-navy/70 leading-relaxed mb-4 italic">
              {(athensData as { vibe: string }).vibe}
            </p>
            {(athensData as { specialNotes: { title: string; body: string }[] }).specialNotes.map(
              (note, i) => (
                <SpecialNote key={i} note={note} />
              )
            )}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                athensData as {
                  activities: { name: string; description: string }[];
                }
              ).activities.map((a, i) => (
                <div
                  key={i}
                  className="bg-white/60 rounded-lg p-3 border border-sand/60"
                >
                  <p className="font-semibold text-sm text-navy">{a.name}</p>
                  <p className="text-xs text-navy/70 mt-1 leading-relaxed">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="section-divider mx-4" />

      {openItems.length > 0 && <OpenItems items={openItems} />}

      {/* Footer */}
      <footer className="bg-navy text-warm-gray-light py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-lg text-white/90 mb-1">
            {config.title}
          </p>
          <p className="text-xs text-warm-gray">{config.subtitle}</p>
          <p className="text-xs text-warm-gray/50 mt-4">
            Last updated{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </footer>
    </main>
  );
}
