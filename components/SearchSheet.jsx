// components/SearchSheet.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchSheet({ open, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // Navigate to search page with query
    router.push(`/search?q=${searchQuery}&category=${selectedCategory}`);
    onClose();
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Navigate to search page with category
    router.push(`/search?category=${category}`);
    onClose();
  };

  const handleQuickFilter = (filter) => {
    // Navigate to search page with filter
    router.push(`/search?filter=${filter}`);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Slide-over panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-black/10 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pretraga</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-full transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Pronađi po ključnoj reči..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-3 pr-12 border border-black/10 rounded-xl focus:outline-none focus:border-purple"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-black/5 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium mb-3">Prema kategoriji</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryClick('odeca')}
                className="px-4 py-2 border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Odeća
              </button>
              <button
                onClick={() => handleCategoryClick('obuca')}
                className="px-4 py-2 border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Obuća
              </button>
              <button
                onClick={() => handleCategoryClick('aksesoari')}
                className="px-4 py-2 border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Aksesoari
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div>
            <h3 className="text-sm font-medium mb-3">Novo</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickFilter('danas')}
                className="px-4 py-3 text-left border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Danas
              </button>
              <button
                onClick={() => handleQuickFilter('ove-nedelje')}
                className="px-4 py-3 text-left border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Ove nedelje
              </button>
              <button
                onClick={() => handleQuickFilter('ovaj-mesec')}
                className="px-4 py-3 text-left border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Ovaj mesec
              </button>
              <button
                onClick={() => handleQuickFilter('snizenja')}
                className="px-4 py-3 text-left border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Sniženja
              </button>
            </div>
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="text-sm font-medium mb-3">Popularno</h3>
            <div className="flex flex-wrap gap-2">
              {['Nike', 'Adidas', 'Zara', 'H&M', 'Vintage', 'Farmerke', 'Patike'].map(term => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch();
                  }}
                  className="px-3 py-1 bg-black/5 rounded-pill text-sm hover:bg-black/10 transition"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Za koga tražiš?</h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  router.push('/search?gender=zene');
                  onClose();
                }}
                className="px-4 py-3 border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Žene
              </button>
              <button
                onClick={() => {
                  router.push('/search?gender=muskarci');
                  onClose();
                }}
                className="px-4 py-3 border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Muškarci
              </button>
              <button
                onClick={() => {
                  router.push('/search?gender=deca');
                  onClose();
                }}
                className="px-4 py-3 border border-black/10 rounded-lg hover:bg-black/5 transition"
              >
                Deca
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
