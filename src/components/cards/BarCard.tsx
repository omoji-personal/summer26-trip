import type { Bar } from "@/lib/types";

export default function BarCard({ bar }: { bar: Bar }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 border-l-4 border-l-wine/40 shadow-sm overflow-hidden card-hover">
      {bar.imageUrl && (
        <img
          src={bar.imageUrl}
          alt={bar.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5 md:p-6">
        <h4
          className="font-serif text-lg md:text-xl font-medium text-navy leading-tight"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
        >
          {bar.name}
        </h4>
        {bar.location && (
          <p
            className="text-xs text-warm-gray italic mt-0.5 mb-2 font-serif"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {bar.location}
          </p>
        )}
        <p className="text-sm text-navy/85 leading-relaxed mb-3">{bar.vibe}</p>
        {bar.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {bar.tags.map((tag) => (
              <span
                key={tag}
                className="tag-pill bg-wine/8 text-wine border border-wine/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
