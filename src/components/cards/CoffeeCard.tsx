import type { Coffee } from "@/lib/types";

export default function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 border-l-4 border-l-gold/40 shadow-sm overflow-hidden card-hover">
      {coffee.imageUrl && (
        <img
          src={coffee.imageUrl}
          alt={coffee.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5 md:p-6">
        <h4
          className="font-serif text-lg md:text-xl font-medium text-navy mb-2 leading-tight"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
        >
          {coffee.name}
        </h4>
        <p className="text-sm text-navy/85 leading-relaxed">{coffee.vibe}</p>
      </div>
    </div>
  );
}
