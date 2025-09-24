// app/search/page.jsx
'use client';

import { useState } from 'react';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import { IconSearch } from '@/components/icons/Icons';
import { categories } from '@/lib/categories';

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
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
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

  // Get main categories from imported data
  const getMainCategories = () => {
    if (selectedGender === 'sve') {
      return [
        { value: 'sve', label: 'Sve kategorije' },
        { value: 'Odeća', label: 'Odeća' },
        { value: 'Obuća', label: 'Obuća' },
        { value: 'Aksesoari', label: 'Aksesoari' }
      ];
    }
    
    const genderCategory = categories.find(cat => cat.label === selectedGender);
    if (!genderCategory) return [{ value: 'sve', label: 'Sve kategorije' }];
    
    const mainCats = [{ value: 'sve', label: 'Sve kategorije' }];
    genderCategory.subcategories.forEach(subcat => {
      mainCats.push({ value: subcat.label, label: subcat.label });
    });
    return mainCats;
  };

  // Get subcategories based on main category and gender
  const getSubcategories = () => {
    if (selectedMainCategory === 'sve') return [];
    
    let subcats = [{ value: 'sve', label: `Svi ${selectedMainCategory.toLowerCase()}` }];
    
    if (selectedGender === 'sve') {
      // Combine subcategories from both genders
      categories.forEach(genderCat => {
        const mainCat = genderCat.subcategories.find(sub => sub.label === selectedMainCategory);
        if (mainCat) {
          mainCat.items.forEach(item => {
            // Avoid duplicates
            if (!subcats.find(s => s.value === item.slug)) {
              subcats.push({ value: item.slug, label: item.label });
            }
          });
        }
      });
    } else {
      // Get subcategories for specific gender
      const genderCategory = categories.find(cat => cat.label === selectedGender);
      if (genderCategory) {
        const mainCat = genderCategory.subcategories.find(sub => sub.label === selectedMainCategory);
        if (mainCat) {
          mainCat.items.forEach(item => {
            subcats.push({ value: item.slug, label: item.label });
          });
        }
      }
    }
    
    return subcats;
  };

  // Gender options for filter
  const genderOptions = [
    { value: 'sve', label: 'Sve' },
    { value: 'Žene', label: 'Žene' },
    { value: 'Muškarci', label: 'Muškarci' }
  ];

  // Size options based on category
  const getSizeOptions = () => {
    if (selectedMainCategory === 'Obuća') {
      return ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];
    } else {
      return ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    }
  };

  // Toggle size selection
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <>
      <HeaderMobile />
      
      <main className="mx-auto max-w-5xl px-4 pt-4 pb-24">
        {/* Gender Tabs */}
        <div className="flex gap-2 mb-4">
          {genderOptions.map(gender => (
            <button
              key={gender.value}
              onClick={() => {
                setSelectedGender(gender.value);
                setSelectedMainCategory('sve');
                setSelectedSubCategory('sve');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                selectedGender === gender.value
                  ? 'bg-gradient-to-r from-purple to-orange text-white'
                  : 'bg-white border border-black/10 hover:bg-black/5'
              }`}
            >
              {gender.label}
            </button>
          ))}
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
                  setSelectedSubCategory('sve');
                }}
                className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
              >
                {getMainCategories().map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            {selectedMainCategory !== 'sve' && getSubcategories().length > 1 && (
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

            {/* Size Filter - Multiple Selection */}
            {(selectedMainCategory === 'Odeća' || selectedMainCategory === 'Obuća' || selectedMainCategory === 'sve') && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Veličina {selectedSizes.length > 0 && `(${selectedSizes.length})`}
                </label>
                <div className="flex flex-wrap gap-2">
                  {getSizeOptions().map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 border rounded-lg text-sm transition ${
                        selectedSizes.includes(size)
                          ? 'border-purple bg-purple/10 text-purple' 
                          : 'border-black/10 hover:bg-black/5'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Stanje</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'novo', label: 'Novo sa etiketom' },
                  { value: 'kao-novo', label: 'Kao novo' },
                  { value: 'odlicno', label: 'Odlično' },
                  { value: 'vrlo-dobro', label: 'Vrlo dobro' },
                  { value: 'dobro', label: 'Dobro' }
                ].map(condition => (
                  <button
                    key={condition.value}
                    className="px-3 py-1 border border-black/10 rounded-lg text-sm hover:bg-black/5"
                  >
                    {condition.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Cena (RSD)</label>
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <label className="text-xs text-ink2 mb-1 block">Od</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
                  />
                </div>
                <span className="text-ink2 mt-5">-</span>
                <div className="flex-1">
                  <label className="text-xs text-ink2 mb-1 block">Do</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || 50000)}
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
                  />
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Brend</label>
              <input
                type="text"
                placeholder="npr. Zara, Nike, H&M..."
                className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:border-purple"
              />
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedMainCategory('sve');
                setSelectedSubCategory('sve');
                setSelectedSizes([]);
                setMinPrice(0);
                setMaxPrice(50000);
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
