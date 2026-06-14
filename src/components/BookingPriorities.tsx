import type { BookingPriority } from "@/lib/types";

export default function BookingPriorities({
  priorities,
}: {
  priorities: BookingPriority[];
}) {
  return (
    <div className="bg-terracotta/5 border border-terracotta/25 rounded-xl p-5 md:p-7">
      <div className="flex items-baseline gap-3 mb-5">
        <span
          aria-hidden="true"
          className="font-serif italic text-terracotta text-base shrink-0"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
        >
          ✎
        </span>
        <h3
          className="font-serif text-lg md:text-xl font-medium text-terracotta-dark leading-tight"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
        >
          Still to book
        </h3>
      </div>
      <ol className="space-y-4">
        {priorities.map((p, i) => (
          <li key={i} className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="folio text-terracotta/85 text-sm leading-none mt-1 shrink-0 w-6"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-base text-navy font-medium leading-snug">
                {p.restaurant}
              </p>
              <p className="text-sm text-navy/85 mt-0.5">
                <span className="text-warm-gray">{p.how}</span>
              </p>
              <p className="text-xs text-terracotta-dark/85 mt-1 italic">
                {p.why}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
