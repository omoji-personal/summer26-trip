import type { OpenItem } from "@/lib/types";

function priorityLabel(p: string) {
  switch (p) {
    case "high":
      return { className: "priority-high", label: "Urgent" };
    case "medium":
      return { className: "priority-medium", label: "Soon" };
    case "low":
      return { className: "priority-low", label: "Info" };
    default:
      return { className: "priority-low", label: p };
  }
}

export default function OpenItems({ items }: { items: OpenItem[] }) {
  const sorted = [...items].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 md:py-14">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📋</span>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy">
          Action Items
        </h2>
        <span className="text-xs text-warm-gray bg-sand/40 rounded-full px-2.5 py-0.5 font-medium">
          {items.length}
        </span>
      </div>
      <div className="space-y-3">
        {sorted.map((item) => {
          const p = priorityLabel(item.priority);
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-sand/40 shadow-sm p-5 card-hover"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`${p.className} text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded flex-shrink-0 mt-1`}
                >
                  {p.label}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-navy text-sm">
                      {item.title}
                    </h4>
                    {item.deadline && (
                      <span className="text-xs text-warm-gray bg-cream-dark rounded px-2 py-0.5 whitespace-nowrap flex-shrink-0">
                        {item.deadline}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-navy/70 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
