import HeaderMobile from "@/components/HeaderMobile";
import BottomNav from "@/components/BottomNav";
import FABs from "@/components/FABs";
import DropCarousel from "@/components/DropCarousel";

function ItemCard({ i }) {
  return (
    <div className="card p-4 overflow-hidden">
      {/* Square image area */}
      <div className="aspect-square bg-[#eee] rounded-lg mb-3" />
      {/* For real images later:
         <img src="..." alt="" className="w-full aspect-square object-cover rounded-lg mb-3" />
      */}
      <div className="text-sm font-medium">Naziv predmeta #{i}</div>
      <div className="text-sm text-ink2">3.500 RSD · kao novo</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <HeaderMobile />
      <main className="mx-auto max-w-5xl px-4 pt-4 pb-20">
        <header className="text-center my-4">
          <h1 className="text-2xl font-semibold">Kupi, prodaj, uštedi.</h1>
          <p className="text-ink2">Second-hand moda za bolje sutra.</p>
          <div className="mt-4 flex justify-center">
            <a href="/sell" className="btn-cta">Podeli svoj drip</a>
          </div>
        </header>

        <h2 className="text-lg font-semibold mb-3">Najnoviji komadi</h2>
        <div className="grid grid-cols-2 gap-3">
          {[1,2,3,4,5,6,7,8].map(n => <ItemCard key={n} i={n} />)}
        </div>

        <DropCarousel />
      </main>

      <FABs showDrop />

      <BottomNav />
    </>
  );
}
