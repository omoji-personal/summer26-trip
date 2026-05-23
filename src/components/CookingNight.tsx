import type { CookingNight as CookingNightType } from "@/lib/types";

export default function CookingNight({ cooking }: { cooking: CookingNightType }) {
  return (
    <div className="bg-olive/5 border border-olive/20 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">👨‍🍳</span>
        <h3 className="font-serif text-xl font-semibold text-navy">{cooking.title}</h3>
      </div>

      <p className="text-sm text-warm-gray mb-4">
        Shop at the <span className="font-medium text-navy">{cooking.market}</span>
      </p>

      <div className="mb-4">
        <p className="text-xs text-warm-gray uppercase tracking-wide mb-2 font-medium">
          Shopping List
        </p>
        <ul className="space-y-1.5">
          {cooking.shoppingList.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-navy/80">
              <span className="text-olive mt-0.5 flex-shrink-0">&#8226;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-olive/10 rounded-lg p-3 border-l-2 border-olive/40">
        <p className="text-sm text-navy/80 italic">{cooking.instructions}</p>
      </div>
    </div>
  );
}
