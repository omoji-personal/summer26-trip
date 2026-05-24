import type { Beach } from "@/lib/types";

export default function BeachCard({ beach }: { beach: Beach }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 shadow-sm overflow-hidden card-hover group">
      {beach.imageUrl && (
        <img
          src={beach.imageUrl}
          alt={beach.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-serif text-base font-semibold text-navy">{beach.name}</h4>
          <span className="text-xs text-sea bg-sea/10 rounded-full px-2.5 py-0.5 whitespace-nowrap flex-shrink-0">
            {beach.driveTime}
          </span>
        </div>
        <p className="text-sm text-navy/80 leading-relaxed">{beach.vibe}</p>
      </div>
    </div>
  );
}
