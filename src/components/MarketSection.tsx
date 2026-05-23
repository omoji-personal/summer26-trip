import type { WeeklyMarket } from "@/lib/types";

export default function MarketSection({ markets }: { markets: WeeklyMarket[] }) {
  return (
    <div className="bg-olive/5 border border-olive/20 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🛒</span>
        <h3 className="font-serif text-lg font-semibold text-navy">
          Weekly Markets During Your Stay
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {markets.map((m, i) => (
          <div key={i} className="bg-white/60 rounded-lg p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-olive/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-olive">{m.day.slice(0, 3)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-navy">{m.market}</p>
              <p className="text-xs text-warm-gray">{m.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
