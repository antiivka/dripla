// components/SearchSheet.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchSheet({ open, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    // Navigate to search page with query
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
      setSearchQuery('');
    }
  };

  const quickCategories = [
    { value: 'odeca', label: 'Odeća' },
    { value: 'obuca', label: 'Obuća' },
    { value: 'aksesoari', label: 'Aksesoari' }
  ];

  const handleCategoryClick = (category) => {
    router.push(`/search?category=${category}`);
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
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl">
        {/* Header */}
        <div className="bg-white border-b border-black/10 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Pretraga</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-black/5 rounded-full transition"
              aria-label="Zatvori"
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
              placeholder="Šta tražiš?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-3 pr-12 border border-black/10 rounded-xl focus:outline-none focus:border-purple"
              autoFocus
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-black/5 rounded-lg"
              aria-label="Pretraži"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Quick Category Access */}
          <div>
            <p className="text-sm text-ink2 mb-3">Ili pretraži po kategoriji:</p>
            <div className="grid grid-cols-3 gap-2">
              {quickCategories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryClick(cat.value)}
                  className="px-4 py-3 border border-black/10 rounded-lg hover:bg-black/5 transition text-sm font-medium"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Link to Advanced Search */}
          <div className="mt-6 pt-6 border-t border-black/10">
            <button
              onClick={() => {
                router.push('/search');
                onClose();
              }}
              className="text-purple text-sm hover:underline"
            >
              Napredna pretraga sa filterima →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
