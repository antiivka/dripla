// components/DropCarousel.jsx
const drops = [
  { id: 1, title: "Retro Summer Vibes", user: "@mila_vintage", date: "2. maj" },
  { id: 2, title: "Minimalist Capsule", user: "@sara_minimal", date: "5. maj" },
  { id: 3, title: "Streetwear Picks", user: "@nik_sa", date: "8. maj" }
];

export default function DropCarousel() {
  const visible = drops.slice(0, 3); // always take 3 drops

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-3">Predstojeći dropovi</h2>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-3 pr-6 snap-x snap-mandatory">
          {visible.map(d => (
            <article
              key={d.id}
              className="min-w-[240px] snap-start rounded-2xl p-4 bg-white shadow-card"
            >
              <div className="rounded-xl bg-[#eee] aspect-[4/3] mb-3" />
              <div className="text-sm font-medium">{d.title}</div>
              <div className="text-xs text-ink2">{d.user} · {d.date}</div>
            </article>
          ))}

          {/* 4th card = browse more */}
          <a
            href="/drops"
            className="min-w-[240px] snap-start rounded-2xl p-4 bg-white shadow-card flex items-center justify-center"
          >
            <div className="text-center">
              <div className="text-2xl mb-1">→</div>
              <div className="text-sm font-semibold">Pogledaj ostale dropove</div>
              <div className="text-xs text-ink2">Otkrij još kolekcija</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
