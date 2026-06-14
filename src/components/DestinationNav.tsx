"use client";

import { useEffect, useState } from "react";
import type { Destination } from "@/lib/types";

export default function DestinationNav({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [active, setActive] = useState(destinations[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one closest to the top
          const topEntry = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr
          );
          setActive(topEntry.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    destinations.forEach((d) => {
      const el = document.getElementById(d.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [destinations]);

  return (
    <nav className="sticky top-0 z-50 bg-cream/92 backdrop-blur-md border-b border-sand/60">
      <div className="max-w-4xl mx-auto">
        <div className="flex overflow-x-auto gap-0 scrollbar-none">
          {destinations.map((d, i) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(d.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`
                group relative flex items-baseline gap-2.5 px-5 md:px-7 py-3.5 whitespace-nowrap flex-shrink-0
                transition-colors duration-200
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta focus-visible:outline-offset-2 rounded-sm
                ${
                  active === d.id
                    ? "text-terracotta"
                    : "text-warm-gray hover:text-navy"
                }
              `}
            >
              <span
                className={`folio text-[11px] tracking-wide ${
                  active === d.id ? "text-terracotta/85" : "text-warm-gray/55"
                }`}
                aria-hidden="true"
              >
                0{i + 1}
              </span>
              <span
                className="font-serif text-lg leading-none"
                style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
              >
                {d.name}
              </span>
              <span className="text-[13px] opacity-80" aria-hidden="true">
                {d.emoji}
              </span>
              {/* Underline indicator */}
              <span
                className={`pointer-events-none absolute left-5 right-5 md:left-7 md:right-7 bottom-0 h-[2px] transition-transform duration-300 origin-left ${
                  active === d.id
                    ? "bg-terracotta scale-x-100"
                    : "bg-sand scale-x-0 group-hover:scale-x-100"
                }`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
