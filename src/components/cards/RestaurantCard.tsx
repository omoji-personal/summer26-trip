import type { Restaurant } from "@/lib/types";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const r = restaurant;
  return (
    <div className="bg-white rounded-xl border border-sand/60 border-l-4 border-l-terracotta/30 shadow-sm p-5 md:p-6 card-hover">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-serif text-lg font-semibold text-navy">{r.name}</h4>
            {r.bookRequired && (
              <span className="tag-pill bg-terracotta/10 text-terracotta border border-terracotta/20">
                book ahead
              </span>
            )}
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

      {r.bookHow && (
        <p className="text-xs text-warm-gray bg-cream/60 rounded-lg px-3 py-2 mb-3 border-l-2 border-terracotta/30">
          <span className="font-medium text-navy">Booking:</span> {r.bookHow}
        </p>
      )}

      {r.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {r.tags.map((tag) => (
            <span key={tag} className="tag-pill bg-cream-dark/60 text-warm-gray">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
