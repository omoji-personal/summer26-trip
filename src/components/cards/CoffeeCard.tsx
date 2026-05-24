import type { Coffee } from "@/lib/types";

export default function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 shadow-sm p-5 card-hover">
      <h4 className="font-serif text-base font-semibold text-navy mb-2">
        {coffee.name}
      </h4>
      <p className="text-sm text-navy/80 leading-relaxed">{coffee.vibe}</p>
    </div>
  );
}
