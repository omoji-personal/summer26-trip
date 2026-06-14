import type { Beach } from "@/lib/types";

export default function BeachCard({ beach }: { beach: Beach }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 border-l-4 border-l-sea/35 shadow-sm overflow-hidden card-hover group">
      {beach.imageUrl && (
        <img
          src={beach.imageUrl}
          alt={beach.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4
            className="font-serif text-lg md:text-xl font-medium text-navy leading-tight"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
          >
            {beach.name}
          </h4>
          <span
            className="text-[11px] text-sea-dark bg-sea/10 border border-sea/20 rounded-full px-2.5 py-0.5 whitespace-nowrap shrink-0 italic font-serif tracking-wide"
            style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
          >
            {beach.driveTime}
          </span>
        </div>
        <p className="text-sm text-navy/85 leading-relaxed">{beach.vibe}</p>
      </div>
    </div>
  );
}
