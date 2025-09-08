{/* My Listings Section */}
<div className="max-w-2xl mx-auto px-4 py-6">
  <h2 className="text-lg font-bold mb-4">Moji oglasi</h2>
  
  {userListings.length > 0 ? (
    <div className="grid grid-cols-2 gap-3">
      {userListings.map((listing) => (
        <div key={listing.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="aspect-square bg-gray-50 relative">
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            {/* Action buttons */}
            <div className="absolute top-2 right-2 flex gap-1">
              <button 
                className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                title="Izmeni"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                title="Obriši"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              {listing.status === 'active' ? (
                <button 
                  className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  title="Označi kao prodato"
                  onClick={() => {
                    // In production, update status in Supabase
                    console.log('Mark as sold:', listing.id);
                  }}
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              ) : (
                <button 
                  className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  title="Vrati u prodaju"
                  onClick={() => {
                    // In production, update status in Supabase
                    console.log('Mark as active:', listing.id);
                  }}
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Sold badge */}
            {listing.status === 'sold' && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-white px-4 py-1.5 rounded-full text-sm font-semibold">PRODATO</span>
              </div>
            )}
          </div>

          <div className="p-3">
            <h3 className="font-medium text-sm text-gray-900">{listing.title}</h3>
            <p className="text-orange-500 font-bold mt-1">{listing.price.toLocaleString()} RSD</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-12 bg-white rounded-lg">
      <p className="text-gray-500 mb-4">Još uvek nemaš oglase</p>
      <Link href="/sell" className="text-purple-600 font-medium">
        Dodaj svoj prvi oglas
      </Link>
    </div>
  )}
</div>
