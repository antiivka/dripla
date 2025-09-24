// app/sell/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { categories } from '@/lib/categories';

export default function SellPage() {
  const router = useRouter();
  const user = useAuth();

  // Account type and limits
  const [isPremium, setIsPremium] = useState(false); // TODO: Get from user profile in database
  const [activeListingsCount, setActiveListingsCount] = useState(3); // TODO: Get actual count from database
  const freeAccountLimit = 25;
  const remainingFreeListings = Math.max(0, freeAccountLimit - activeListingsCount);

  // Listing type selection
  const [listingType, setListingType] = useState(''); // 'oglas' or 'drop'

  // Single listing (oglas) form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    gender: '',
    mainCategory: '',
    category: '',
    subcategory: '',
    detailedSubcategory: '',
    size: '',
    condition: '',
    brand: '',
    price: '',
    location: '',
    color: [],
    material: []
  });

  // Drop specific data
  const [dropData, setDropData] = useState({
    dropTitle: '',
    dropDescription: '',
    launchDate: '',
    launchTime: '',
    items: []
  });

  const [currentDropItem, setCurrentDropItem] = useState({
    title: '',
    description: '',
    price: '',
    size: '',
    brand: '',
    condition: 'kao-novo',
    images: []
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Get categories structure from imported categories
  const categoriesStructure = {};
  categories.forEach(cat => {
    categoriesStructure[cat.label] = {};
    cat.subcategories.forEach(subcat => {
      categoriesStructure[cat.label][subcat.label] = {};
      subcat.items.forEach(item => {
        categoriesStructure[cat.label][subcat.label][item.label] = item.variants || [];
      });
    });
  });

  // Serbian cities list
  const cities = [
    'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pančevo', 'Čačak', 'Kraljevo', 'Smederevo',
    'Ada', 'Aleksandrovac', 'Aleksinac', 'Alibunar', 'Apatin', 'Aranđelovac', 'Arilje',
    'Babušnica', 'Bač', 'Bačka Palanka', 'Bačka Topola', 'Bački Petrovac', 'Bajina Bašta', 'Batočina',
    'Bečej', 'Bela Crkva', 'Bela Palanka', 'Beočin', 'Blace', 'Bogatić', 'Bojnik', 'Boljevac', 'Bor',
    'Bosilegrad', 'Brus', 'Bujanovac', 'Čajetina', 'Čoka', 'Ćićevac', 'Ćuprija', 'Crna Trava', 'Crveni krst',
    'Despotovac', 'Dimitrovgrad', 'Doljevac', 'Gadžin Han', 'Golubac', 'Gornji Milanovac', 
    'Inđija', 'Irig', 'Ivanjica', 'Jagodina', 'Kanjiža', 'Kikinda', 'Kladovo', 'Knić', 'Knjaževac', 
    'Koceljeva', 'Kosjerić', 'Kosovska Kamenica', 'Kovačica', 'Kovin', 'Krupanj', 'Kruševac', 
    'Kučevo', 'Kula', 'Kuršumlija', 'Lajkovac', 'Lapovo', 'Lebane', 'Leskovac', 'Ljig', 'Ljubovija', 
    'Loznica', 'Lučani', 'Majdanpek', 'Mali Iđoš', 'Mali Zvornik', 'Malo Crniće', 'Medveđa', 
    'Merošina', 'Mionica', 'Negotin', 'Nova Crnja', 'Nova Varoš', 'Novi Bečej', 'Novi Kneževac', 
    'Novi Pazar', 'Odžaci', 'Opovo', 'Osečina', 'Palilula', 'Paraćin', 'Pećinci', 'Petrovac na Mlavi', 
    'Pirot', 'Plandište', 'Požarevac', 'Požega', 'Preševo', 'Priboj', 'Prijepolje', 'Prokuplje', 
    'Rača', 'Raška', 'Ražanj', 'Rekovac', 'Ruma', 'Šabac', 'Sečanj', 'Senta', 'Sevojno', 'Šid', 
    'Sjenica', 'Smederevska Palanka', 'Sokobanja', 'Sombor', 'Srbobran', 'Sremska Mitrovica', 
    'Sremski Karlovci', 'Stara Pazova', 'Surdulica', 'Svilajnac', 'Svrljig', 'Temerin', 'Titel', 
    'Topola', 'Trgovište', 'Trstenik', 'Tutin', 'Ub', 'Užice', 'Valjevo', 'Varvarin', 'Velika Plana', 
    'Veliko Gradište', 'Vladičin Han', 'Vladimirci', 'Vlasotince', 'Vrbas', 'Vranje', 'Vranjska Banja', 
    'Vrnjačka Banja', 'Vršac', 'Zaječar', 'Žabalj', 'Žabari', 'Žagubica', 'Žitište', 'Žitorađa'
  ].sort();

  const conditions = [
    { value: 'novo', label: 'Novo sa etiketom' },
    { value: 'kao-novo', label: 'Kao novo' },
    { value: 'odlicno', label: 'Odlično' },
    { value: 'vrlo-dobro', label: 'Vrlo dobro' },
    { value: 'dobro', label: 'Dobro' },
    { value: 'osteceno', label: 'Oštećeno' },
    { value: 'reparirano', label: 'Reparirano' }
  ];

  const colors = ['Crna', 'Bela', 'Smeđa', 'Srebrna', 'Zlatna', 'Žuta', 'Zelena', 'Plava', 'Ljubičasta', 'Roze', 'Crvena', 'Šarena'];
  
  const sizes = {
    clothing: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    clothingEU: ['32', '34', '36', '38', '40', '42', '44', '46', '48'],
    shoes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'],
    kids: ['86', '92', '98', '104', '110', '116', '122', '128', '134', '140', '146', '152']
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages].slice(0, 5));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Naslov je obavezan';
    if (!formData.description) newErrors.description = 'Opis je obavezan';
    if (!formData.gender) newErrors.gender = 'Pol je obavezan';
    if (!formData.mainCategory) newErrors.mainCategory = 'Glavna kategorija je obavezna';
    if (!formData.category) newErrors.category = 'Kategorija je obavezna';
    
    const hasSubcategories = categoriesStructure[formData.gender]?.[formData.mainCategory]?.[formData.category]?.length > 0;
    if (hasSubcategories && !formData.detailedSubcategory) {
      newErrors.detailedSubcategory = 'Tip je obavezan';
    }
    
    if (!formData.brand) newErrors.brand = 'Brend je obavezan';
    if (!formData.size) newErrors.size = 'Veličina je obavezna';
    if (!formData.condition) newErrors.condition = 'Stanje je obavezno';
    if (!formData.price) newErrors.price = 'Cena je obavezna';
    if (!formData.location) newErrors.location = 'Lokacija je obavezna';
    if (images.length === 0) newErrors.images = 'Dodajte bar jednu sliku';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Submitting:', { ...formData, images });
      alert('Oglas je uspešno objavljen!');
      router.push('/profil');
    }
  };

  const handleDropSubmit = (e) => {
    e.preventDefault();
    
    // Validate drop
    const newErrors = {};
    if (!dropData.dropTitle) newErrors.dropTitle = 'Naziv dropa je obavezan';
    if (!dropData.launchDate) newErrors.launchDate = 'Datum lansiranja je obavezan';
    if (!dropData.launchTime) newErrors.launchTime = 'Vreme lansiranja je obavezno';
    if (dropData.items.length === 0) newErrors.items = 'Dodajte bar jedan artikal u drop';
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log('Submitting drop:', dropData);
      alert('Drop je uspešno kreiran!');
      router.push('/profil');
    }
  };

  const addItemToDrop = () => {
    if (!currentDropItem.title || !currentDropItem.price) {
      alert('Molimo unesite naziv i cenu artikla');
      return;
    }
    
    setDropData({
      ...dropData,
      items: [...dropData.items, { ...currentDropItem, id: Date.now() }]
    });
    
    setCurrentDropItem({
      title: '',
      description: '',
      price: '',
      size: '',
      brand: '',
      condition: 'kao-novo',
      images: []
    });
  };

  const removeItemFromDrop = (itemId) => {
    setDropData({
      ...dropData,
      items: dropData.items.filter(item => item.id !== itemId)
    });
  };

  const getSizes = () => {
    if (formData.mainCategory === 'Obuća') {
      return sizes.shoes;
    }
    return sizes.clothing;
  };

  const getCategorySubcategories = () => {
    if (!formData.gender || !formData.mainCategory || !formData.category) return [];
    
    let subcats = categoriesStructure[formData.gender][formData.mainCategory][formData.category];
    
    if (!subcats || subcats.length === 0) {
      return [formData.category];
    }
    
    return subcats;
  };

  // If no listing type selected, show selection screen with IMPROVED STYLING
  if (!listingType) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderMobile />
        
        <main className="pb-20 pt-14">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Šta želiš da objaviš?</h1>
            
            {/* Account status card - IMPROVED */}
            <div className={`mb-6 p-4 rounded-2xl shadow-sm ${
              isPremium 
                ? 'bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200' 
                : 'bg-white border border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {isPremium && <span className="text-2xl">👑</span>}
                    <span className="font-semibold text-lg">
                      {isPremium ? 'Premium nalog' : 'Besplatan nalog'}
                    </span>
                  </div>
                  {!isPremium && (
                    <p className="text-sm text-gray-600 mt-1">
                      Preostalo oglasa: <span className="font-semibold text-purple-600">{remainingFreeListings}/{freeAccountLimit}</span>
                    </p>
                  )}
                </div>
                {!isPremium && (
                  <button 
                    onClick={() => alert('Premium upgrade će biti dostupan uskoro!')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Nadogradi
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Single listing option - IMPROVED */}
              <button
                onClick={() => {
                  if (!isPremium && remainingFreeListings === 0) {
                    alert('Dostigli ste limit besplatnih oglasa. Nadogradite na Premium za neograničene oglase.');
                    return;
                  }
                  setListingType('oglas');
                }}
                className="w-full p-6 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-purple-400 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Pojedinačni oglas</h3>
                    <p className="text-gray-600">Objavi jedan artikal odmah</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Drop option - IMPROVED */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!isPremium) {
                      return;
                    }
                    setListingType('drop');
                  }}
                  className={`w-full p-6 bg-white rounded-2xl shadow-sm border-2 ${
                    isPremium 
                      ? 'border-transparent hover:border-purple-400 hover:shadow-md cursor-pointer' 
                      : 'border-gray-200 opacity-75 cursor-not-allowed'
                  } transition-all text-left group`}
                  disabled={!isPremium}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-xl mb-2">Drop kolekciju</h3>
                        {!isPremium && <span className="text-2xl">🔒</span>}
                      </div>
                      <p className="text-gray-600">
                        Objavi više artikala sa datumom lansiranja
                      </p>
                    </div>
                    {isPremium && (
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                        <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
                
                {!isPremium && (
                  {!isPremium && (
  <div className="absolute top-2 right-2">
    <span className="bg-gradient-to-r from-purple-600 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
      Samo Premium
    </span>
  </div>
)}
              </div>
            </div>
          </div>
        </main>
        
        <BottomNav />
      </div>
    );
  }

  // Show drop form if drop type selected
  if (listingType === 'drop') {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderMobile />
        
        <main className="pb-20 pt-14">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setListingType('')} className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">Kreiraj Drop</h1>
            </div>

            <form onSubmit={handleDropSubmit} className="space-y-6">
              {/* Drop Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Naziv dropa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={dropData.dropTitle}
                  onChange={(e) => setDropData({...dropData, dropTitle: e.target.value})}
                  placeholder="npr. Letnja kolekcija, Vintage drop..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                />
                {errors.dropTitle && <p className="text-red-500 text-sm mt-1">{errors.dropTitle}</p>}
              </div>

              {/* Drop Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Opis dropa
                </label>
                <textarea
                  value={dropData.dropDescription}
                  onChange={(e) => setDropData({...dropData, dropDescription: e.target.value})}
                  placeholder="Opiši svoju kolekciju..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Launch Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Datum lansiranja <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">📅</span>
                    <input
                      type="date"
                      value={dropData.launchDate}
                      onChange={(e) => setDropData({...dropData, launchDate: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  {errors.launchDate && <p className="text-red-500 text-sm mt-1">{errors.launchDate}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Vreme lansiranja <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">🕐</span>
                    <input
                      type="time"
                      value={dropData.launchTime}
                      onChange={(e) => setDropData({...dropData, launchTime: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  {errors.launchTime && <p className="text-red-500 text-sm mt-1">{errors.launchTime}</p>}
                </div>
              </div>

              {/* Drop Items */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Artikli u dropu <span className="text-red-500">*</span>
                </label>
                
                {/* Current items list */}
                {dropData.items.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {dropData.items.map((item) => (
                      <div key={item.id} className="p-3 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.price} RSD • Veličina: {item.size || 'N/A'}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItemFromDrop(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add new item form */}
                <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <h4 className="font-medium">Dodaj artikal</h4>
                  
                  <input
                    type="text"
                    value={currentDropItem.title}
                    onChange={(e) => setCurrentDropItem({...currentDropItem, title: e.target.value})}
                    placeholder="Naziv artikla"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={currentDropItem.price}
                      onChange={(e) => setCurrentDropItem({...currentDropItem, price: e.target.value})}
                      placeholder="Cena (RSD)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    />
                    
                    <input
                      type="text"
                      value={currentDropItem.size}
                      onChange={(e) => setCurrentDropItem({...currentDropItem, size: e.target.value})}
                      placeholder="Veličina"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                    />
                  </div>
                  
                  <input
                    type="text"
                    value={currentDropItem.brand}
                    onChange={(e) => setCurrentDropItem({...currentDropItem, brand: e.target.value})}
                    placeholder="Brend"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                  />
                  
                  <button
                    type="button"
                    onClick={addItemToDrop}
                    className="w-full py-2 border-2 border-dashed border-purple-400 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Dodaj u drop
                  </button>
                </div>
                {errors.items && <p className="text-red-500 text-sm mt-1">{errors.items}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                Kreiraj Drop
              </button>
            </form>
          </div>
        </main>
        
        <BottomNav />
      </div>
    );
  }

  // Original single listing form (with back button) - ALL THE REST STAYS THE SAME
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderMobile />
      
      <main className="pb-20 pt-14">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setListingType('')} className="p-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Dodaj oglas</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Fotografije <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square">
                    <img 
                      src={img} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors">
                    <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs text-gray-500">Dodaj sliku</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
              <p className="text-xs text-gray-500 mt-2">Možete dodati do 5 slika</p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Naslov oglasa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="npr. Zara haljina nova sa etiketom"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Opis <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Opišite artikal detaljno - materijal, stanje, razlog prodaje..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Za koga <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Žene', 'Muškarci'].map(gender => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData({
                      ...formData, 
                      gender, 
                      mainCategory: '', 
                      category: '', 
                      subcategory: '',
                      detailedSubcategory: ''
                    })}
                    className={`py-2 px-4 border rounded-lg transition-colors ${
                      formData.gender === gender
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Main Category */}
            {formData.gender && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Glavna kategorija <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.mainCategory}
                  onChange={(e) => setFormData({
                    ...formData, 
                    mainCategory: e.target.value, 
                    category: '', 
                    subcategory: '',
                    detailedSubcategory: ''
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value="">Izaberi glavnu kategoriju</option>
                  {Object.keys(categoriesStructure[formData.gender]).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.mainCategory && <p className="text-red-500 text-sm mt-1">{errors.mainCategory}</p>}
              </div>
            )}

            {/* Category */}
            {formData.mainCategory && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kategorija <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({
                    ...formData, 
                    category: e.target.value, 
                    subcategory: '',
                    detailedSubcategory: ''
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value="">Izaberi kategoriju</option>
                  {Object.keys(categoriesStructure[formData.gender][formData.mainCategory]).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>
            )}

            {/* Detailed Subcategory */}
            {formData.category && getCategorySubcategories().length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tip <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.detailedSubcategory}
                  onChange={(e) => setFormData({...formData, detailedSubcategory: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value="">Izaberi tip</option>
                  {getCategorySubcategories().map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                {errors.detailedSubcategory && <p className="text-red-500 text-sm mt-1">{errors.detailedSubcategory}</p>}
              </div>
            )}

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Brend <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                placeholder="npr. Zara, H&M, Nike..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              />
              {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
            </div>

            {/* Size */}
            {formData.mainCategory && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Veličina <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value="">Izaberi veličinu</option>
                  {getSizes().map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
              </div>
            )}

            {/* Color */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Boja
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <label key={color} className="flex items-center">
                    <input
                      type="checkbox"
                      value={color}
                      checked={formData.color.includes(color)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, color: [...formData.color, color]});
                        } else {
                          setFormData({...formData, color: formData.color.filter(c => c !== color)});
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Stanje <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {conditions.map(condition => (
                  <label key={condition.value} className="flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      value={condition.value}
                      checked={formData.condition === condition.value}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="mr-3 text-purple-600"
                    />
                    <span>{condition.label}</span>
                  </label>
                ))}
              </div>
              {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Cena (RSD) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="npr. 2500"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Lokacija <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value="">Izaberi grad</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              Objavi oglas
            </button>
          </form>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
