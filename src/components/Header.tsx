import type { Trip } from "@/lib/types";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const cityEmojis: Record<string, string> = {
  Atlanta: "🇺🇸",
  Stockholm: "🇸🇪",
  Paris: "🇫🇷",
  Mallorca: "🇪🇸",
  Crete: "🇬🇷",
  Athens: "🇬🇷",
};

export default function Header({ trip }: { trip: Trip }) {
  return (
    <header className="relative overflow-hidden bg-navy text-cream pt-12 pb-14 md:pt-16 md:pb-20 px-4">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-terracotta-light text-sm font-medium tracking-[0.2em] uppercase mb-3">
            {formatDate(trip.dates.start)} &mdash; {formatDate(trip.dates.end)}{" "}
            &middot; {trip.totalDays} days
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-3">
            {trip.title}
          </h1>
          <p className="text-warm-gray-light text-base md:text-lg">
            {trip.travelers.map((t) => t.name).join(" + ")}
          </p>
        </div>

        {/* Route visualization */}
        <div className="flex items-center justify-center gap-0 overflow-x-auto pb-2 px-2">
          {trip.route.map((city, i) => (
            <div key={`${city}-${i}`} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5 min-w-0">
                <div
                  className={`route-dot ${
                    i === 0 || i === trip.route.length - 1 ? "" : "active"
                  }`}
                />
                <span className="text-[10px] md:text-xs text-warm-gray-light whitespace-nowrap flex items-center gap-1">
                  <span>{cityEmojis[city] || ""}</span>
                  <span>{city}</span>
                </span>
              </div>
              {i < trip.route.length - 1 && <div className="route-line mx-1 md:mx-2" />}
            </div>
          ))}
        </div>

        {/* Pacing note */}
        {trip.pacing && (
          <p className="text-center text-warm-gray-light/70 text-xs md:text-sm mt-6 md:mt-8 italic max-w-lg mx-auto">
            {trip.pacing}
          </p>
        )}
      </div>
    </header>
  );
}
