import HeaderMobile from "@/components/HeaderMobile";
import BottomNav from "@/components/BottomNav";
import FABs from "@/components/FABs";

/* tiny inline icons just for this page */
function IconPencil({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}
function IconTrash({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
function IconCheck({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
function IconThumbUp({ size = 14, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 9V5a3 3 0 0 0-3-3l-1 6H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9.28a2 2 0 0 0 1.94-1.5l1.72-7A2 2 0 0 0 15 9h-1z" />
    </svg>
  );
}
function IconThumbDown({ size = 14, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 15v4a3 3 0 0 0 3 3l1-6h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H10.72a2 2 0 0 0-1.94 1.5L7.06 14A2 2 0 0 0 9 16h1z" />
    </svg>
  );
}

/* Reusable product card with edit/delete/publish actions */
function MyItemCard({ i }) {
  return (
    <article className="relative card p-4 overflow-hidden">
      <div className="aspect-square bg-[#eee] rounded-lg" />
      {/* top-right mini actions */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        <button className="h-7 w-7 rounded-full bg-white shadow border border-black/10 grid place-items-center hover:bg-black/5" aria-label="Uredi">
          <IconPencil />
        </button>
        <button className="h-7 w-7 rounded-full bg-white shadow border border-black/10 grid place-items-center hover:bg-black/5" aria-label="Obriši">
          <IconTrash />
        </button>
        <button className="h-7 w-7 rounded-full bg-white shadow border border-black/10 grid place-items-center hover:bg-black/5" aria-label="Objavi">
          <IconCheck />
        </button>
      </div>
    </article>
  );
}

export default function ProfilePage() {
  return (
    <>
      <HeaderMobile />

      <main className="mx-auto max-w-5xl px-4 pt-4 pb-24">
        <h1 className="text-2xl font-semibold mb-3">Moj profil</h1>

        {/* Profile header card */}
        <section className="rounded-2xl bg-white shadow-card border border-black/5 p-4 sm:p-5 mb-6">
          <div className="flex items-start justify-between gap-4">
            {/* left: avatar + info */}
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#eee]" />
              <div>
                <div className="text-base sm:text-lg font-semibold">Marija Petrović</div>
                <div className="text-sm text-ink2">@marija_p</div>
                <div className="mt-1.5 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-[#19c37d]">
                    <IconThumbUp /> <b>127</b>
                  </span>
                  <span className="flex items-center gap-1 text-[#e5484d]">
                    <IconThumbDown /> <b>3</b>
                  </span>
                  <span className="text-ink2">Beograd</span>
                </div>
                <p className="mt-2 text-sm text-ink">
                  Ljubitelj vintage komada i streetwear-a. Uvek tražim jedinstvene delove.
                </p>
                <div className="mt-3">
                  <a href="/profil/izmeni" className="px-3 py-1.5 rounded-pill border border-black/10 hover:bg-black/5 text-sm">
                    Izmeni profil
                  </a>
                </div>
              </div>
            </div>

            {/* right: quick actions */}
            <div className="hidden sm:flex flex-col gap-3">
              <a href="/inbox" className="rounded-2xl px-4 py-3 bg-white border border-black/10 shadow-sm hover:shadow text-sm flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2CD3A4]" /> Poruke
              </a>
              <a href="/settings" className="rounded-2xl px-4 py-3 bg-white border border-black/10 shadow-sm hover:shadow text-sm flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#5CC9E4]" /> Podešavanja
              </a>
              <a href="/wishlist" className="rounded-2xl px-4 py-3 bg-white border border-black/10 shadow-sm hover:shadow text-sm flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#FF8AA5]" /> Moja lista želja
              </a>
            </div>
          </div>
        </section>

        {/* My listings */}
        <h2 className="text-lg font-semibold mb-3">Moji oglasi</h2>
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <MyItemCard key={n} i={n} />
          ))}
        </section>
      </main>

      {/* Free user: show both FABs — drop will route to /upgrade in your FABs.jsx gating */}
      <FABs showDrop />

      <BottomNav />
    </>
  );
}
