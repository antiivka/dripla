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
  const [selectedGender, setSelectedGender] = useState('sve');
  const [selectedMainCategory, setSelectedMainCategory] = useState('sve');
  const [selectedSubCategory, setSelectedSubCategory] = useState('sve');
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

  // Main categories
  const mainCategories = [
    { value: 'sve', label: 'Sve kategorije' },
    { value: 'odeca', label: 'Odeća' },
    { value: 'obuca', label: 'Obuća' },
    { value: 'aksesoari', label: 'Aksesoari' }
  ];

  // Get subcategories based on main category and gender
  const getSubcategories = () => {
    if (selectedMainCategory === 'odeca') {
      if (selectedGender === 'zene') {
        return [
          { value: 'sve', label: 'Sva odeća' },
          { value: 'majice', label: 'Majice' },
          { value: 'kosulje', label: 'Košulje' },
          { value: 'duksevi', label: 'Duksevi' },
          { value: 'dzemperi', label: 'Džemperi' },
          { value: 'jakne', label: 'Jakne i prsluci' },
          { value: 'pantalone', label: 'Pantalone' },
          { value: 'farmerke', label: 'Farmerke' },
          { value: 'suknje', label: 'Suknje' },
          { value: 'haljine', label: 'Haljine' },
          { value: 'sortsevi', label: 'Šortsevi i bermude' },
          { value: 'helanke', label: 'Helanke' },
          { value: 'trenerke', label: 'Trenerke' },
          { value: 'kombinezoni', label: 'Kombinezoni' }
        ];
      } else if (selectedGender === 'muskarci') {
        return [
          { value: 'sve', label: 'Sva odeća' },
          { value: 'majice', label: 'Majice' },
          { value: 'kosulje', label: 'Košulje' },
          { value: 'duksevi', label: 'Duksevi' },
          { value: 'dzemperi', label: 'Džemperi' },
          { value: 'jakne', label: 'Jakne i prsluci' },
          { value: 'pantalone', label: 'Pantalone' },
          { value: 'farmerke', label: 'Farmerke' },
          { value: 'odela', label: 'Odela i sakoi' },
          { value: 'sortsevi', label: 'Šortsevi i bermude' },
          { value: 'trenerke', label: 'Trenerke' }
        ];
      }
      // Mixed gender clothing
      return [
        { value: 'sve', label: 'Sva odeća' },
        { value: 'majice', label: 'Majice' },
        { value: 'kosulje', label: 'Košulje' },
        { value: 'duksevi', label: 'Duksevi' },
        { value: 'dzemperi', label: 'Džemperi' },
        { value: 'jakne', label: 'Jakne i prsluci' },
        { value: 'pantalone', label: 'Pantalone' },
        { value: 'farmerke', label: 'Farmerke' }
      ];
    } else if (selectedMainCategory === 'obuca') {
      if (selectedGender === 'zene') {
        return [
          { value: 'sve', label: 'Sva obuća' },
          { value: 'patike', label: 'Patike' },
          { value: 'cipele-stikla', label: 'Cipele na štiklu' },
          { value: 'ravne-cipele', label: 'Ravne cipele' },
          { value: 'cizme', label: 'Čizme' },
          { value: 'sandale', label: 'Sandale' }
        ];
      } else if (selectedGender === 'muskarci') {
        return [
          { value: 'sve', label: 'Sva obuća' },
          { value: 'patike', label: 'Patike' },
          { value: 'cipele', label: 'Cipele' },
          { value: 'cizme', label: 'Čizme' },
          { value: 'sandale', label: 'Sandale' }
        ];
      }
      return [
        { value: 'sve', label: 'Sva obuća' },
        { value: 'patike', label: 'Patike' },
        { value: 'cipele', label: 'Cipele' },
        { value: 'cizme', label: 'Čizme' },
        { value: 'sandale', label: 'Sandale' }
      ];
    } else if (selectedMainCategory === 'aksesoari') {
      return [
        { value: 'sve', label: 'Svi aksesoari' },
        { value: 'torbe', label: 'Torbe i rančevi' },
        { value: 'kaisevi', label: 'Kaisevi' },
        { value: 'novcanci', label: 'Novčanici' },
        { value: 'satovi', label: 'Satovi' },
        { value: 'nakit', label: 'Nakit' },
        { value: 'naocare', label: 'Naočare' },
        { value: 'kape', label: 'Kape i šeširi' }
      ];
    }
    return [];
  };

  // Define priceRanges to prevent reference error
  const priceRanges = [];

  return (
    <>
      <HeaderMobile />
      
      <main className="mx-auto max-w-5xl px-4 pt-4 pb-24">
        {/* Gender Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedGender('sve')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              selectedGender === 'sve'
                ? 'bg-gradient-to-r from-purple to-orange text-white'
                : 'bg-white border border-black/10 hover:bg-black/5'
            }`}
          >
            Sve
          </button>
          <button
            onClick={() => setSelectedGender('zene')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              selectedGender === 'zene'
                ? 'bg-gradient-to-r from-purple to-orange text-white'
                : 'bg-white border border-black/10 hover:bg-black/5'
            }`}
          >
            Žene
          </button>
          <button
            onClick={() => setSelectedGender('muskarci')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              selectedGender === 'muskarci'
                ? 'bg-gradient-to-r from-purple to-orange text-white'
                : 'bg-white border border-black/10 hover:bg-black/5'
            }`}
          >
            Muškarci
          </button>
        </div>

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
            {/* Main Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Kategorija</label>
              <select
                value={selectedMainCategory}
                onChange={(e) => {
                  setSelectedMainCategory(e.target.value);
                  setSelectedSubCategory('sve'); // Reset subcategory when main changes
                }}
                className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
              >
                {mainCategories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter - Only shows if a main category is selected */}
            {selectedMainCategory !== 'sve' && (
              <div>
                <label className="block text-sm font-medium mb-2">Tip</label>
                <select
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
                >
                  {getSubcategories().map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            )}

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
                setSelectedMainCategory('sve');
                setSelectedSubCategory('sve');
                setSelectedSize('');
                setPriceRange('sve');
                setSelectedGender('sve');
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
