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
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand/60">
      <div className="max-w-4xl mx-auto">
        <div className="flex overflow-x-auto gap-0 scrollbar-none">
          {destinations.map((d) => (
            <a
              key={d.id}
              href={`#${d.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(d.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`
                flex items-center gap-1.5 px-4 md:px-6 py-3.5 text-sm font-medium whitespace-nowrap
                transition-colors duration-200 border-b-2 flex-shrink-0
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta focus-visible:outline-offset-2 rounded-sm
                ${
                  active === d.id
                    ? "border-terracotta text-terracotta"
                    : "border-transparent text-warm-gray hover:text-navy hover:border-sand"
                }
              `}
            >
              <span>{d.emoji}</span>
              <span>{d.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
