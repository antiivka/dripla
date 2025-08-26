const drops = [
  { id: 1, title: "Retro Summer Vibes", user: "@mila_vintage", date: "May 2" },
  { id: 2, title: "Minimalist Capsule", user: "@sara_minimal", date: "May 5" }
];

export default function DropCarousel() {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Predstojeći dropovi</h2>
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-3 pr-6">
          {drops.map(d => (
            <article key={d.id} className="min-w-[240px] rounded-2xl p-4 bg-white shadow-card">
              <div className="rounded-xl bg-[#eee] aspect-[4/3] mb-3" />
              <div className="text-sm font-medium">{d.title}</div>
              <div className="text-xs text-ink2">{d.user} · {d.date}</div>
            </article>
          ))}
          {/* 4th card = Browse All */}
          <article className="min-w-[240px] rounded-2xl p-4 bg-white shadow-card flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">→</div>
              <div className="text-sm font-medium">Vidi sve droppove</div>
              <div className="text-xs text-ink2">Otkrij još kolekcija</div>
            </div>
          </article>
          <div className="w-2 shrink-0" />
        </div>
      </div>
    </section>
  );
}
