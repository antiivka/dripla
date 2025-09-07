// app/search/page.jsx
'use client';

import { useState } from 'react';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import { IconSearch } from '@/components/icons/Icons';

function SearchResultCard({ item }) {
  return (
    <div className="card p-4">
      <div className="aspect-square bg-[#eee] rounded-lg mb-3" />
      <div className="text-sm font-medium">{item.name}</div>
      <div className="text-sm text-ink2">{item.price} RSD</div>
      <div className="text-xs text-ink2 mt-1">{item.condition} · {item.size}</div>
    </div>
  );
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('sve');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState('sve');
  const [showFilters, setShowFilters] = useState(false);

  // Mock search results
  const mockResults = [
    { id: 1, name: 'Adidas majica', price: '1.500', condition: 'Kao novo', size: 'M' },
    { id: 2, name: 'Levis 501 farmerke', price: '4.000', condition: 'Odlično', size: '32' },
    { id: 3, name: 'Nike patike', price: '6.500', condition: 'Novo', size: '42' },
    { id: 4, name: 'Zara jakna', price: '3.200', condition: 'Dobro', size: 'L' },
    { id: 5, name: 'H&M haljina', price: '2.000', condition: 'Kao novo', size: 'S' },
    { id: 6, name: 'Converse All Star', price: '5.000', condition: 'Odlično', size: '41' },
  ];

  const categories = [
    { value: 'sve', label: 'Sve kategorije' },
    { value: 'muska', label: 'Muška odeća' },
    { value: 'zenska', label: 'Ženska odeća' },
    { value: 'obuca', label: 'Obuća' },
    { value: 'torbe', label: 'Torbe i aksesoari' },
  ];

  const priceRanges = [
    { value: 'sve', label: 'Svi opsezi' },
    { value: '0-2000', label: 'Do 2.000 RSD' },
    { value: '2000-5000', label: '2.000 - 5.000 RSD' },
    { value: '5000-10000', label: '5.000 - 10.000 RSD' },
    { value: '10000+', label: 'Preko 10.000 RSD' },
  ];

  return (
    <>
      <HeaderMobile />
      
      <main className="mx-auto max-w-5xl px-4 pt-4 pb-24">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-ink2" size={20} />
            <input
              type="text"
              placeholder="Pretraži artikle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-purple"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 px-4 py-2 border border-black/10 rounded-pill text-sm hover:bg-black/5 transition"
        >
          {showFilters ? 'Sakrij filtere' : 'Prikaži filtere'} 
        </button>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-card p-4 mb-6 space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Kategorija</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Veličina</label>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                    className={`px-3 py-1 border rounded-lg text-sm transition ${
                      selectedSize === size 
                        ? 'border-purple bg-purple/10 text-purple' 
                        : 'border-black/10 hover:bg-black/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Cena</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategory('sve');
                setSelectedSize('');
                setPriceRange('sve');
              }}
              className="text-sm text-purple hover:underline"
            >
              Obriši sve filtere
            </button>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-ink2 mb-4">
          Pronađeno {mockResults.length} artikala
        </p>

        {/* Search Results Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {mockResults.map(item => (
            <SearchResultCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <BottomNav />
    </>
  );
}
