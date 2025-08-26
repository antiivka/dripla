export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold">Dripla</h1>
        <p className="text-ink2 mt-2">
          Kupi, prodaj, uštedi. Second-hand moda za bolje sutra.
        </p>
      </header>

      <div className="flex items-center gap-3 mb-12">
        <a href="#" className="btn-cta">Dodaj novi predmet</a>
        <a href="#" className="btn-cta premium">Pogledaj dropove</a>
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="card p-4">
            <div className="aspect-[4/5] bg-[#eee] rounded-lg mb-3" />
            <div className="text-sm font-medium">Naziv predmeta #{i}</div>
            <div className="text-sm text-ink2">2.000 RSD · kao novo</div>
          </div>
        ))}
      </section>
    </main>
  );
}
