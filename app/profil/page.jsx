import HeaderMobile from "@/components/HeaderMobile";
import BottomNav from "@/components/BottomNav";
import FABs from "@/components/FABs";
import { IconMessage, IconHeart, IconSettings } from "@/components/icons/Icons";

/* Pastel quick-action card */
function QuickActionCard({ href, label, Icon, theme }) {
  const themes = {
    messages: { bg: "#E7F7FF", border: "#BEEBFF", icon: "#5CC9E4" },
    settings: { bg: "#EFFFF6", border: "#C8F7E6", icon: "#2CD3A4" },
    wishlist: { bg: "#FFE9F0", border: "#FFC4D1", icon: "#FF8AA5" },
  };
  const t = themes[theme];

  return (
    <a
      href={href}
      className="block rounded-[20px] px-5 py-5 text-center shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow border"
      style={{ backgroundColor: t.bg, borderColor: t.border }}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon size={24} style={{ color: t.icon }} />
        <div className="font-semibold">{label}</div>
      </div>
    </a>
  );
}

/* Mini action icons for product cards */
function IconPencil({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
  );
}
function IconTrash({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
  );
}
function IconCheck({ size = 16, className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6L9 17l-5-5"/></svg>
  );
}

function MyItemCard({ i }) {
  return (
    <article className="relative card p-4 overflow-hidden">
      <div className="aspect-square bg-[#eee] rounded-lg" />
      <div className="absolute top-3 right-3 flex gap-1.5">
        <button className="h-7 w-7 rounded-full bg-white shadow border border-black/10 grid place-items-center hover:bg-black/5" aria-label="Uredi"><IconPencil /></button>
        <button className="h-7 w-7 rounded-full bg-white shadow border border-black/10 grid place-items-center hover:bg-black/5" aria-label="Obriši"><IconTrash /></button>
        <button className="h-7 w-7 rounded-full bg-white shadow border border-black/10 grid place-items-center hover:bg-black/5" aria-label="Objavi"><IconCheck /></button>
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

        {/* Profile header with right-side pastel cards */}
        <section className="rounded-2xl bg-white shadow-card border border-black/5 p-4 sm:p-5 mb-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
            {/* LEFT: avatar + bio */}
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#eee]" />
              <div>
                <div className="text-base sm:text-lg font-semibold">Marija Petrović</div>
                <div className="text-sm text-ink2">@marija_p</div>
                <div className="mt-1.5 flex items-center gap-3 text-xs">
                  <span className="text-[#19c37d] font-semibold">127</span>
                  <span className="text-[#e5484d] font-semibold">3</span>
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

            {/* RIGHT: pastel action cards (stacked) */}
            <div className="flex flex-col gap-3">
              <QuickActionCard href="/inbox" label="Poruke" Icon={IconMessage} theme="messages" />
              <QuickActionCard href="/settings" label="Podešavanja" Icon={IconSettings} theme="settings" />
              <QuickActionCard href="/wishlist" label="Moja lista želja" Icon={IconHeart} theme="wishlist" />
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

      <FABs showDrop />
      <BottomNav />
    </>
  );
}
