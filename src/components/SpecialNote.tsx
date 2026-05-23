import type { SpecialNote as SpecialNoteType } from "@/lib/types";

export default function SpecialNote({ note }: { note: SpecialNoteType }) {
  return (
    <div className="bg-gold/10 border border-gold/25 rounded-xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">✨</span>
        <h3 className="font-serif text-lg font-semibold text-navy">{note.title}</h3>
      </div>
      <p className="text-sm text-navy/80 leading-relaxed">{note.body}</p>
    </div>
  );
}
