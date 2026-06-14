import type { Trip } from "@/lib/types";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const cityCodes: Record<string, string> = {
  Atlanta: "ATL",
  Stockholm: "ARN",
  Paris: "CDG",
  Mallorca: "PMI",
  Crete: "CHQ",
  Athens: "ATH",
};

/**
 * Split a title like "Summer 2026 — Europe" into a head + italic tail
 * so the trailing word gets a Fraunces italic flourish.
 */
function splitTitle(title: string): { head: string; tail: string | null } {
  // Find last em-dash or " — "; tail is whatever follows
  const m = title.match(/^(.*?[—-])\s*(.+)$/);
  if (m) return { head: m[1].trim(), tail: m[2].trim() };
  // Otherwise italicize the final word
  const parts = title.split(" ");
  if (parts.length < 2) return { head: title, tail: null };
  return { head: parts.slice(0, -1).join(" "), tail: parts[parts.length - 1] };
}

export default function Header({
  trip,
  subtitle,
}: {
  trip: Trip;
  subtitle?: string;
}) {
  const { head, tail } = splitTitle(trip.title);
  const dateLabel = subtitle
    ? subtitle
    : `${formatDate(trip.dates.start)} — ${formatDate(trip.dates.end)} · ${trip.totalDays} days`;

  return (
    <header className="relative overflow-hidden bg-navy text-cream pt-14 pb-16 md:pt-20 md:pb-24 px-4">
      {/* Atmosphere: hero photo OR layered radial wash */}
      {trip.heroImage ? (
        <>
          <img
            src={trip.heroImage}
            alt={trip.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/55 to-navy/85" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(120% 80% at 25% 0%, rgba(196,96,60,0.18), transparent 55%), radial-gradient(120% 80% at 85% 100%, rgba(46,134,171,0.22), transparent 55%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.05]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "44px 44px",
              }}
            />
          </div>
        </>
      )}

      {/* Hairline frame inside the hero — editorial folio look */}
      <div className="pointer-events-none absolute inset-4 md:inset-7 border border-cream/12" />

      <div className="relative max-w-5xl mx-auto">
        {/* Top folio row — Nº and date */}
        <div className="flex items-baseline justify-between mb-12 md:mb-16 hero-rise hero-rise-1">
          <p className="folio text-cream/95 text-sm md:text-base">
            <sup>Nº</sup>26
            <span className="text-cream/45 mx-2 not-italic">/</span>
            <span className="not-italic eyebrow text-cream/85">
              Carnet d&apos;Été
            </span>
          </p>
          <p className="eyebrow text-terracotta-light text-[0.65rem] md:text-xs">
            {dateLabel}
          </p>
        </div>

        {/* Title — asymmetric, italic tail flourish */}
        <div className="text-center mb-10 md:mb-14 hero-rise hero-rise-2">
          <h1 className="font-serif text-white tracking-tight leading-[0.95]">
            <span className="block text-4xl md:text-6xl lg:text-7xl font-medium">
              {head}
            </span>
            {tail && (
              <span
                className="block italic text-5xl md:text-7xl lg:text-8xl font-normal mt-1 md:mt-2"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
              >
                {tail}
              </span>
            )}
          </h1>

          {/* Travelers — serif italic, refined */}
          <p className="mt-7 md:mt-9 text-warm-gray-light text-sm md:text-base flex items-center justify-center gap-3 flex-wrap">
            {trip.travelers.map((t, i) => (
              <span key={t.name} className="flex items-center gap-3">
                <span
                  className="font-serif italic"
                  style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
                >
                  {t.name}
                </span>
                {i < trip.travelers.length - 1 && (
                  <span className="text-cream/45" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Route ribbon — typographic, hairline rule, terracotta nodes */}
        <div className="hero-rise hero-rise-3 max-w-3xl mx-auto px-2">
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
            {trip.route.map((city, i) => (
              <div key={`${city}-${i}`} className="flex items-center">
                <div className="flex flex-col items-center gap-2 min-w-0">
                  <div
                    className={`route-dot ${
                      i === 0 || i === trip.route.length - 1 ? "" : "active"
                    }`}
                  />
                  <span className="text-[10px] md:text-[11px] text-warm-gray-light whitespace-nowrap font-semibold tracking-[0.12em] uppercase">
                    {city}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-warm-gray-light/70 whitespace-nowrap tracking-[0.2em] -mt-1">
                    {cityCodes[city] || ""}
                  </span>
                </div>
                {i < trip.route.length - 1 && (
                  <div className="route-line mx-1.5 md:mx-3 mb-7" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pacing note — italic flourish, bottom-aligned */}
        {trip.pacing && (
          <p
            className="text-center text-warm-gray-light text-sm md:text-base mt-10 md:mt-14 max-w-xl mx-auto leading-relaxed italic font-serif hero-rise hero-rise-4"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {trip.pacing}
          </p>
        )}
      </div>
    </header>
  );
}
