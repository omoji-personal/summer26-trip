import type { Activity } from "@/lib/types";

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="bg-white rounded-xl border border-sand/60 border-l-4 border-l-sea/45 shadow-sm overflow-hidden card-hover">
      {activity.imageUrl && (
        <img
          src={activity.imageUrl}
          alt={activity.name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-5 md:p-6">
        <h4
          className="font-serif text-lg md:text-xl font-medium text-navy mb-2 leading-tight"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
        >
          {activity.name}
        </h4>
        <p className="text-sm text-navy/85 leading-relaxed mb-3">
          {activity.description}
        </p>
        {activity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {activity.tags.map((tag) => (
              <span
                key={tag}
                className="tag-pill bg-sea/10 text-sea-dark border border-sea/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
