// components/SearchSheet.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SearchSheet({ open, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [results, setResults] = useState([]);
  const router = useRouter();

  // Mock data - replace with real data later
  const mockProducts = [
    { id: 1, name: 'Vintage Levi\'s jakna', price: 3500, category: 'odeća', image: '/api/placeholder/200/250', size: 'M' },
    { id: 2, name: 'Nike Air Max 90', price: 8000, category: 'obuća', image: '/api/placeholder/200/250', size: '42' },
    { id: 3, name: 'Zara haljina', price: 2500, category: 'odeća', image: '/api/placeholder/200/250', size: 'S' },
    { id: 4, name: 'Adidas Superstar', price: 6500, category: 'obuća', image: '/api/placeholder/200/250', size: '40' },
    { id: 5, name: 'Kožna torba', price: 4500, category: 'aksesoari', image: '/api/placeholder/200/250', size: 'OS' },
    { id: 6, name: 'Ray-Ban naočare', price: 9000, category: 'aksesoari', image: '/api/placeholder/200/250', size: 'OS' },
    { id: 7, name: 'Džemper H&M', price: 1800, category: 'odeća', image: '/api/placeholder/200/250', size: 'L' },
    { id: 8, name: 'Converse patike', price: 5500, category: 'obuća', image: '/api/placeholder/200/250', size: '41' },
  ];

  const quickCategories = [
    { value: 'odeća', label: 'Odeća' },
    { value: 'obuća', label: 'Obuća' },
    { value: 'aksesoari', label: 'Aksesoari' }
  ];

  // Filter products based on search and category
  useEffect(() => {
    let filtered = mockProducts;
    
    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setResults(filtered);
  }, [searchQuery, selectedCategory]);

  const handleCategoryClick = (category) => {
    // Toggle category selection
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleAdvancedSearch = () => {
    router.push('/search');
    onClose();
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
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
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-black/10 p-4 flex-shrink-0">
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
              className="w-full px-4 py-3 pr-12 border border-black/10 rounded-xl focus:outline-none focus:border-purple"
              autoFocus
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-black/5 rounded-lg"
              aria-label="Pretraži"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 border-b border-black/10 flex-shrink-0">
          <p className="text-sm text-ink2 mb-3">Ili pretraži po kategoriji:</p>
          <div className="grid grid-cols-3 gap-2">
            {quickCategories.map(cat => (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className={`px-4 py-3 border rounded-lg transition text-sm font-medium ${
                  selectedCategory === cat.value 
                    ? 'bg-purple text-white border-purple' 
                    : 'border-black/10 hover:bg-black/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          {/* Active filters */}
          {(selectedCategory || searchQuery) && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-ink2">Aktivni filteri:</span>
              {selectedCategory && (
                <span className="px-2 py-1 bg-purple/10 text-purple rounded-full text-xs">
                  {quickCategories.find(c => c.value === selectedCategory)?.label}
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-1 bg-purple/10 text-purple rounded-full text-xs">
                  "{searchQuery}"
                </span>
              )}
              <button 
                onClick={clearFilters}
                className="text-xs text-ink2 hover:text-purple ml-auto"
              >
                Obriši sve
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {results.length > 0 ? (
            <>
              <p className="text-sm text-ink2 mb-3">
                Pronađeno {results.length} artikala
              </p>
              <div
