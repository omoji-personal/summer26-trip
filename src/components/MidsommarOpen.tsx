import type { MidsommarOpen as MidsommarOpenType } from "@/lib/types";

export default function MidsommarOpen({
  venues,
}: {
  venues: MidsommarOpenType[];
}) {
  return (
    <div className="bg-sea/5 border border-sea/20 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🌸</span>
        <h3 className="font-serif text-lg font-semibold text-navy">
          Confirmed Open During Midsommar (Jun 19-20)
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {venues.map((v, i) => (
          <div key={i} className="bg-white/60 rounded-lg p-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-sea flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-navy">{v.venue}</p>
              <p className="text-xs text-warm-gray">{v.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
