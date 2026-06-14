import type { MidsommarOpen as MidsommarOpenType } from "@/lib/types";

export default function MidsommarOpen({
  venues,
}: {
  venues: MidsommarOpenType[];
}) {
  return (
    <div className="bg-sea/5 border border-sea/25 rounded-xl p-5 md:p-7">
      <div className="flex items-baseline gap-3 mb-4">
        <span
          aria-hidden="true"
          className="font-serif italic text-sea-dark text-base shrink-0"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
        >
          ✦
        </span>
        <h3
          className="font-serif text-lg md:text-xl font-medium text-navy leading-tight"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
        >
          Confirmed Open During Midsommar{" "}
          <span
            className="italic font-normal text-warm-gray"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            (Jun 19–20)
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {venues.map((v, i) => (
          <div
            key={i}
            className="bg-white/75 rounded-lg p-3.5 border border-sea/15 flex items-start gap-3"
          >
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-sea-dark mt-1.5 shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-navy leading-tight">
                {v.venue}
              </p>
              <p className="text-xs text-warm-gray mt-0.5">{v.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
