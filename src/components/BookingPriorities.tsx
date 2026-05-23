import type { BookingPriority } from "@/lib/types";

export default function BookingPriorities({
  priorities,
}: {
  priorities: BookingPriority[];
}) {
  return (
    <div className="bg-terracotta/5 border border-terracotta/20 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📞</span>
        <h3 className="font-serif text-lg font-semibold text-terracotta-dark">
          Book Now
        </h3>
      </div>
      <div className="space-y-3">
        {priorities.map((p, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <span className="w-5 h-5 rounded-full bg-terracotta text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">
              {i + 1}
            </span>
            <div>
              <span className="font-semibold text-navy">{p.restaurant}</span>
              <span className="text-warm-gray mx-1.5">&mdash;</span>
              <span className="text-warm-gray">{p.how}</span>
              <p className="text-xs text-terracotta/80 mt-0.5">{p.why}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
