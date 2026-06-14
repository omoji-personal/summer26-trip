import type { Restaurant } from "@/lib/types";

interface Props {
  restaurants: Restaurant[];
  /** Optional rationale strings keyed by restaurant name. */
  rationale?: Record<string, string>;
}

function ReservationCard({
  r,
  rationale,
}: {
  r: Restaurant;
  rationale?: string;
}) {
  return (
    <article className="relative bg-white rounded-xl border border-sand/60 border-l-4 border-l-olive shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-12 gap-0">
        {/* Image */}
        <div className="md:col-span-5 relative">
          {r.imageUrl ? (
            <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
              <img
                src={r.imageUrl}
                alt={r.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="aspect-[4/3] md:h-full bg-cream-dark/60" />
          )}
          <span
            aria-hidden="true"
            className="absolute top-3 left-3 tag-pill bg-olive/15 text-olive border border-olive/30 backdrop-blur-sm bg-cream/85"
          >
            ✓ confirmed
          </span>
        </div>

        {/* Body */}
        <div className="md:col-span-7 p-5 md:p-7">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
            <h3
              className="font-serif text-2xl md:text-3xl font-medium text-navy leading-tight"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
            >
              {r.name}
            </h3>
            {r.price && (
              <span className="font-serif italic text-olive text-base whitespace-nowrap mt-2 shrink-0">
                {r.price}
              </span>
            )}
          </div>
          {r.location && (
            <p
              className="font-serif italic text-warm-gray text-sm mb-4"
              style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
            >
              {r.location}
            </p>
          )}
          {r.confirmation && (
            <p className="text-xs text-olive bg-olive/8 rounded-lg px-3 py-2 mb-4 border-l-2 border-olive/45 font-medium">
              <span className="eyebrow text-[0.6rem] tracking-[0.18em] mr-1.5">
                Reservation
              </span>
              {r.confirmation}
            </p>
          )}
          <p className="text-sm md:text-[15px] text-navy/85 leading-relaxed">
            {r.vibe}
          </p>
          {rationale && (
            <div className="mt-4 pt-4 border-t border-sand/60">
              <p className="eyebrow text-[0.62rem] text-terracotta mb-1.5">
                Why this pick
              </p>
              <p
                className="font-serif italic text-navy/90 text-[15px] leading-relaxed"
                style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
              >
                {rationale}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ReservationsHighlight({ restaurants, rationale = {} }: Props) {
  if (restaurants.length === 0) return null;
  return (
    <section>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <div className="flex items-baseline gap-3 min-w-0">
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-olive/15 text-base shrink-0 self-center"
            aria-hidden="true"
          >
            ✓
          </span>
          <h3
            className="font-serif text-2xl md:text-3xl font-medium text-navy leading-none"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
          >
            Reservations locked in
          </h3>
        </div>
        <span
          className="font-serif italic text-warm-gray/85 text-base shrink-0"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
        >
          {restaurants.length}
        </span>
      </div>
      <div className="mb-3 h-px bg-gradient-to-r from-olive/45 via-olive/20 to-transparent" />
      <p
        className="text-sm text-warm-gray italic font-serif mb-7 max-w-2xl"
        style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
      >
        The week's four dinners are the bones of the trip — each chosen for a different reason. The rest of the island sits underneath them.
      </p>
      <div className="space-y-5 md:space-y-6">
        {restaurants.map((r) => (
          <ReservationCard
            key={r.name}
            r={r}
            rationale={rationale[r.name]}
          />
        ))}
      </div>
    </section>
  );
}
