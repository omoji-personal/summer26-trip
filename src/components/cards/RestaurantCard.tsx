import type { Restaurant } from "@/lib/types";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const r = restaurant;
  const borderClass = r.confirmed
    ? "border-l-4 border-l-olive"
    : "border-l-4 border-l-terracotta/30";
  return (
    <div
      className={`bg-white rounded-xl border border-sand/60 ${borderClass} shadow-sm overflow-hidden card-hover`}
    >
      {r.imageUrl && (
        <img
          src={r.imageUrl}
          alt={r.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-serif text-lg font-semibold text-navy">{r.name}</h4>
              {r.confirmed ? (
                <span className="tag-pill bg-olive/15 text-olive border border-olive/25">
                  ✓ confirmed
                </span>
              ) : r.bookRequired ? (
                <span className="tag-pill bg-terracotta/10 text-terracotta border border-terracotta/20">
                  book ahead
                </span>
              ) : null}
            </div>
            {r.location && (
              <p className="text-xs text-warm-gray mt-0.5">{r.location}</p>
            )}
          </div>
          {r.price && (
            <span className="text-sm font-medium text-olive whitespace-nowrap flex-shrink-0">
              {r.price}
            </span>
          )}
        </div>

        <p className="text-sm text-navy/80 leading-relaxed mb-3">{r.vibe}</p>

        {r.confirmed && r.confirmation && (
          <p className="text-xs text-olive bg-olive/5 rounded-lg px-3 py-2 mb-3 border-l-2 border-olive/40">
            <span className="font-medium">Reservation:</span> {r.confirmation}
          </p>
        )}

        {!r.confirmed && r.bookHow && (
          <p className="text-xs text-warm-gray bg-cream/60 rounded-lg px-3 py-2 mb-3 border-l-2 border-terracotta/30">
            <span className="font-medium text-navy">Booking:</span> {r.bookHow}
          </p>
        )}

        {r.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {r.tags.map((tag) => (
              <span
                key={tag}
                className={
                  tag === "locals-favorite"
                    ? "tag-pill bg-olive/15 text-olive border border-olive/25"
                    : tag === "special-dinner"
                    ? "tag-pill bg-gold/15 text-gold border border-gold/25"
                    : "tag-pill bg-cream-dark/60 text-warm-gray"
                }
              >
                {tag === "locals-favorite" ? "locals’ favorite" : tag === "special-dinner" ? "✨ the special dinner" : tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
