import type { SpecialNote as SpecialNoteType } from "@/lib/types";

export default function SpecialNote({ note }: { note: SpecialNoteType }) {
  return (
    <div className="relative bg-gold/8 border border-gold/30 rounded-xl p-5 md:p-7 overflow-hidden">
      {/* Decorative side rule */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-5 bottom-5 w-[3px] bg-gold/55 rounded-r"
      />
      <div className="flex items-baseline gap-3 mb-2.5">
        <span
          aria-hidden="true"
          className="font-serif italic text-gold text-base shrink-0"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 100' }}
        >
          ★
        </span>
        <h3
          className="font-serif text-lg md:text-xl font-medium text-navy leading-tight"
          style={{ fontVariationSettings: '"opsz" 60, "SOFT" 50' }}
        >
          {note.title}
        </h3>
      </div>
      <p className="text-sm md:text-[15px] text-navy/85 leading-relaxed">
        {note.body}
      </p>
    </div>
  );
}
