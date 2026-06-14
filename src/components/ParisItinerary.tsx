import type { Itinerary, ItineraryStop } from "@/lib/types";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function StopCard({ stop, isLast }: { stop: ItineraryStop; isLast: boolean }) {
  const hero = stop.hero;
  return (
    <article
      className={`relative grid gap-6 md:gap-10 md:grid-cols-12 ${
        isLast ? "" : "pb-12 md:pb-16"
      }`}
    >
      {/* Number column — folio numeral + vertical rail */}
      <aside className="md:col-span-2 md:pt-2 flex md:block items-baseline gap-4">
        <div
          className={`folio leading-none ${
            hero ? "text-terracotta" : "text-warm-gray/70"
          }`}
          style={{ fontSize: hero ? "3.5rem" : "2.75rem" }}
          aria-hidden="true"
        >
          <sup>Nº</sup>
          {String(stop.num).padStart(2, "0")}
        </div>
        <div className="md:mt-3">
          <p
            className={`eyebrow text-[0.7rem] ${
              hero ? "text-terracotta-dark" : "text-warm-gray"
            }`}
          >
            {stop.time}
          </p>
          {!isLast && (
            <span
              aria-hidden="true"
              className="hidden md:block w-px h-24 mt-4 bg-gradient-to-b from-sand to-transparent"
            />
          )}
        </div>
      </aside>

      {/* Image column */}
      <div className="md:col-span-5">
        {stop.imageUrl ? (
          <div
            className={`relative aspect-[4/3] overflow-hidden rounded-xl border ${
              hero
                ? "border-terracotta/40 shadow-lg shadow-terracotta/10"
                : "border-sand/60 shadow-sm"
            }`}
          >
            <img
              src={stop.imageUrl}
              alt={stop.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {hero && (
              <span
                aria-hidden="true"
                className="absolute top-3 left-3 folio text-terracotta-light text-xs bg-cream/85 backdrop-blur-sm px-2 py-1 rounded"
              >
                ★ the heart of the day
              </span>
            )}
          </div>
        ) : (
          <div className="aspect-[4/3] rounded-xl bg-cream-dark/60 border border-sand/60" />
        )}
      </div>

      {/* Text column */}
      <div className="md:col-span-5">
        <h3
          className={`font-serif leading-tight ${
            hero ? "text-3xl md:text-4xl text-navy" : "text-2xl md:text-3xl text-navy"
          }`}
          style={{
            fontVariationSettings: hero
              ? '"opsz" 144, "SOFT" 50'
              : '"opsz" 144, "SOFT" 50',
          }}
        >
          {stop.name}
          {hero && (
            <span
              className="ml-2 font-serif italic text-terracotta"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
              aria-hidden="true"
            >
              ★
            </span>
          )}
        </h3>
        {stop.location && (
          <p
            className="mt-1 font-serif italic text-warm-gray text-sm"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {stop.location}
          </p>
        )}
        <p className="mt-4 text-navy/85 leading-relaxed text-[15px] md:text-base">
          {stop.description}
        </p>
        {stop.tags && stop.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stop.tags.map((t) => (
              <span
                key={t}
                className={`tag-pill ${
                  hero
                    ? "bg-terracotta/10 text-terracotta-dark border border-terracotta/25"
                    : "bg-cream-dark/70 text-warm-gray border border-sand/60"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function ParisItinerary({ itinerary }: { itinerary: Itinerary }) {
  const heroes = itinerary.stops.filter((s) => s.hero);

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Masthead — folio number + tagline + date */}
      <header className="text-center pt-2">
        <p
          className="folio italic text-terracotta-light text-base md:text-lg"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
        >
          {itinerary.tagline || ""}
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 flex-wrap">
          <span className="eyebrow text-[0.7rem] text-warm-gray">
            {formatDate(itinerary.date)}
          </span>
          <span className="text-warm-gray/40" aria-hidden="true">·</span>
          <span className="eyebrow text-[0.7rem] text-warm-gray">
            {itinerary.stops.length} stops
          </span>
        </div>
        {itinerary.pacingNote && (
          <p
            className="mt-5 font-serif italic text-warm-gray text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {itinerary.pacingNote}
          </p>
        )}
      </header>

      {/* Hero summary chips — quick scan of the day's anchors */}
      {heroes.length > 0 && (
        <div className="bg-cream-dark/40 border border-sand/60 rounded-xl p-5 md:p-7">
          <div className="flex items-baseline gap-3 mb-4">
            <span
              aria-hidden="true"
              className="font-serif italic text-terracotta text-base"
              style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
            >
              ★
            </span>
            <h3
              className="font-serif text-lg md:text-xl font-medium text-navy"
              style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
            >
              The day's anchors
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {heroes.map((h) => (
              <div
                key={h.num}
                className="bg-white/85 rounded-lg p-3.5 border border-terracotta/15 flex items-start gap-3"
              >
                <span
                  className="folio text-terracotta-light text-sm shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  {String(h.num).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-serif text-base text-navy font-medium leading-tight">
                    {h.name}
                  </p>
                  <p className="text-xs text-warm-gray mt-0.5">
                    {h.time} · {h.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Itinerary fleuron */}
      <div className="section-divider mx-auto max-w-md opacity-70">
        <span className="fleuron" aria-hidden="true">✦ ✦ ✦</span>
      </div>

      {/* Stops */}
      <div className="space-y-12 md:space-y-16">
        {itinerary.stops.map((stop, i) => (
          <StopCard
            key={stop.num}
            stop={stop}
            isLast={i === itinerary.stops.length - 1}
          />
        ))}
      </div>

      {/* Closer */}
      <div className="section-divider mx-auto max-w-md opacity-70 pt-4">
        <span className="fleuron" aria-hidden="true">✦</span>
      </div>
      <p
        className="text-center font-serif italic text-terracotta-light text-lg md:text-xl"
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
      >
        Paris est toujours une fête.
      </p>
    </div>
  );
}
