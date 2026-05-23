import type { CretanWine } from "@/lib/types";

export default function WineSection({ wines }: { wines: CretanWine[] }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">🍷</span>
        <h3 className="font-serif text-xl md:text-2xl font-semibold text-navy">
          Cretan Wines
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wines.map((w, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-sand/40 shadow-sm p-5 card-hover"
          >
            <h4 className="font-serif text-base font-semibold text-wine mb-1">
              {w.winery}
            </h4>
            <p className="text-sm font-medium text-navy/70 mb-2">{w.signature}</p>
            <p className="text-sm text-navy/80 leading-relaxed">{w.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
