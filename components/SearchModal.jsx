// components/SearchModal.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/search?category=${encodeURIComponent(category)}`);
    onClose();
  };

  const handleAdvancedSearch = () => {
    router.push('/search');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-[90%] max-w-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Pretraga</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Šta tražiš?"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-full focus:outline-none focus:border-purple-400 text-lg"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Categories */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">Ili pretraži po kategoriji:</p>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleCategoryClick('Odeća')}
              className="py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-center font-medium"
            >
              Odeća
            </button>
            <button
              onClick={() => handleCategoryClick('Obuća')}
              className="py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-center font-medium"
            >
              Obuća
            </button>
            <button
              onClick={() => handleCategoryClick('Aksesoari')}
              className="py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-center font-medium"
            >
              Aksesoari
            </button>
          </div>
        </div>

        {/* Advanced Search Link */}
        <button
          onClick={handleAdvancedSearch}
          className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 transition-colors"
        >
          Napredna pretraga sa filterima 
          <span className="text-xl">→</span>
        </button>
      </div>
    </div>
  );
}
