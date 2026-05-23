import Header from "@/components/Header";
import DestinationNav from "@/components/DestinationNav";
import DestinationSection from "@/components/DestinationSection";
import OpenItems from "@/components/OpenItems";
import FlightCard from "@/components/cards/FlightCard";

import tripData from "../../data/trip.json";
import itineraryData from "../../data/itinerary.json";
import stockholmData from "../../data/destinations/stockholm.json";
import parisData from "../../data/destinations/paris.json";
import mallorcaData from "../../data/destinations/mallorca.json";
import creteData from "../../data/destinations/crete.json";

import type {
  Trip,
  Itinerary,
  Destination,
  Flight,
  Hotel,
  Airbnb,
  CarRental,
} from "@/lib/types";

const trip = tripData as Trip;
const itinerary = itineraryData as Itinerary;
const destinations = [
  stockholmData,
  parisData,
  mallorcaData,
  creteData,
] as Destination[];

// Map flights arriving at each destination
function getFlightsForDestination(destId: string): Flight[] {
  const destToAirport: Record<string, string[]> = {
    stockholm: ["ARN"],
    paris: ["CDG"],
    mallorca: ["PMI"],
    crete: ["CHQ"],
  };
  const airports = destToAirport[destId] || [];
  return itinerary.flights.filter((f) =>
    airports.includes(f.segments[f.segments.length - 1].to)
  );
}

function getHotelsForDestination(destId: string): Hotel[] {
  return itinerary.hotels.filter((h) => h.destination === destId);
}

function getAirbnbsForDestination(destId: string): Airbnb[] {
  return itinerary.airbnbs.filter((a) => a.destination === destId);
}

function getCarRentalsForDestination(destId: string): CarRental[] {
  return itinerary.carRentals.filter((c) => c.destination === destId);
}

export default function Home() {
  return (
    <main className="flex-1">
      <Header trip={trip} />
      <DestinationNav destinations={destinations} />

      {destinations.map((dest) => (
        <DestinationSection
          key={dest.id}
          destination={dest}
          flights={getFlightsForDestination(dest.id)}
          hotels={getHotelsForDestination(dest.id)}
          airbnbs={getAirbnbsForDestination(dest.id)}
          carRentals={getCarRentalsForDestination(dest.id)}
        />
      ))}

      {/* Departure flights */}
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
          Same-day connection: Crete (CHQ) 8:20 AM &rarr; Athens (ATH) 9:15 AM &rarr; Atlanta (ATL) 5:42 PM.
          Separate tickets &mdash; reclaim bags at ATH between domestic and international terminals.
        </p>
      </section>

      <div className="section-divider mx-4" />

      <OpenItems items={itinerary.openItems} />

      {/* Footer */}
      <footer className="bg-navy text-warm-gray-light py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-serif text-lg text-white/90 mb-1">
            Summer 2026 &mdash; Europe
          </p>
          <p className="text-xs text-warm-gray">
            Jun 18 &ndash; Jul 7 &middot; Atlanta &rarr; Stockholm &rarr; Paris
            &rarr; Mallorca &rarr; Crete &rarr; Athens &rarr; Atlanta
          </p>
          <p className="text-xs text-warm-gray/50 mt-4">
            Last updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>
      </footer>
    </main>
  );
}
