import type { Bar } from "@/lib/types";

export default function BarCard({ bar }: { bar: Bar }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 shadow-sm p-5 card-hover">
      <div className="flex items-center gap-2 mb-1.5">
        <h4 className="font-serif text-base font-semibold text-navy">{bar.name}</h4>
      </div>
      {bar.location && (
        <p className="text-xs text-warm-gray mb-2">{bar.location}</p>
      )}
      <p className="text-sm text-navy/80 leading-relaxed mb-3">{bar.vibe}</p>
      {bar.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {bar.tags.map((tag) => (
            <span key={tag} className="tag-pill bg-wine/10 text-wine/80">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
