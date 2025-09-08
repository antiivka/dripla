// app/sell/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';

export default function SellPage() {
  const router = useRouter();
  const user = useAuth();

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

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Detailed categories for SELLING
  const categoriesStructure = {
    'Žene': {
      'Odeća': {
        'Majice': ['Majice kratkih rukava', 'Majice dugih rukava', 'Majice na bretele', 'Tube top majice', 'Tunike', 'Bluze'],
        'Džemperi': ['Rolke', 'Kardigani', 'Ponco', 'Ostali džemperi'],
        'Prsluci': ['Prsluci'],
        'Jakne': ['Kaputi', 'Mantili', 'Bunde', 'Ostale jakne'],
        'Pantalone': ['Pantalone', 'Šorcevi', 'Trenerke'],
        'Farmerke': ['Farmerke'],
        'Suknje': ['Mini', 'Midi', 'Maksi', 'Denim'],
        'Haljine': ['Mini', 'Midi', 'Maksi', 'Svečane'],
        'Kombinezoni': ['Kombinezoni'],
        'Setovi': ['Setovi'],
        'Odela i sakoi': ['Sakoi', 'Odela'],
        'Donji veš i pidžame': ['Gaćice', 'Grudnjaci', 'Shapewear', 'Bodiji', 'Setovi', 'Čarape', 'Najlonke i hulahopke', 'Bademantili', 'Pidžame'],
        'Kupaći': ['Kupaći'],
        'Kostimi i uniforme': ['Kostimi i uniforme']
      },
      'Obuća': {
        'Patike': ['Patike za trčanje', 'Patike za šetnju', 'Patike za planinarenje', 'Cipele patike', 'Sportske patike'],
        'Cipele': ['Cipele na štiklu', 'Ravne cipele', 'Oksfordice', 'Mokasine', 'Espadrile'],
        'Čizme': ['Iznad kolena', 'Do kolena', 'Chelsea čizme', 'Gležnjače', 'Kaubojke', 'Ravne čizme', 'Čizme sa štiklom'],
        'Sandale': ['Ravne sandale', 'Sandale sa štiklom'],
        'Baletanke': ['Baletanke'],
        'Papuče i japanke': ['Papuče', 'Japanke', 'Klompe']
      },
      'Aksesoari': {
        'Torbe i rančevi': ['Torbice i pismo torbe', 'Torbe za rame', 'Poštar torbe', 'Tašne', 'Velike torbe', 'Rančevi', 'Torbe za plažu', 'Cegeri', 'Torbice oko struka', 'Torbe za laptop', 'Sportske torbe', 'Vikend torbe', 'Koferi', 'Neseseri'],
        'Kaiš': ['Kaiš'],
        'Novčanici': ['Novčanici'],
        'Satovi': ['Satovi'],
        'Nakit': ['Prstenje', 'Narukvice', 'Ogrlice', 'Privešci', 'Minđuše'],
        'Naočare': ['Naočare za sunce', 'Naočare za vid'],
        'Kape i šeširi': ['Kačketi', 'Šeširi', 'Kape'],
        'Šalovi': ['Šalovi'],
        'Rukavice': ['Rukavice'],
        'Ostalo': ['Kisobrani', 'Privešci za ključeve', 'Maske za telefon', 'Ostalo']
      }
    },
    'Muškarci': {
      'Odeća': {
        'Majice': ['Majice kratkih rukava', 'Majice dugih rukava', 'Majice bez rukava'],
        'Košulje': ['Košulje'],
        'Džemperi': ['Rolke', 'Kardigani', 'Džemperi'],
        'Prsluci': ['Prsluci'],
        'Jakne': ['Kaputi', 'Mantili', 'Jakne'],
        'Pantalone': ['Farmerke', 'Pantalone', 'Šorcevi', 'Bermude', 'Trenerke'],
        'Odela i sakoi': ['Odela', 'Sakoi'],
        'Donji veš': ['Bokserice', 'Duge gaće', 'Čarape'],
        'Pidžame': ['Pidžame'],
        'Bademantili': ['Bademantili'],
        'Kupaći': ['Kupaći'],
        'Kostimi i uniforme': ['Kostimi i uniforme']
      },
      'Obuća': {
        'Patike': ['Patike za trčanje', 'Patike za šetnju', 'Patike za planinarenje', 'Cipele patike', 'Sportske patike'],
        'Cipele': ['Oksfordice', 'Mokasine', 'Espadrile', 'Kanadjanke', 'Radne cipele'],
        'Čizme': ['Chelsea čizme', 'Kaubojke', 'Ostale čizme'],
        'Sandale': ['Sandale'],
        'Papuče i japanke': ['Papuče', 'Japanke']
      },
      'Aksesoari': {
        'Torbe i rančevi': ['Torbe za rame', 'Poštar torbe', 'Velike torbe', 'Rančevi', 'Torbe za laptop', 'Sportske torbe', 'Vikend torbe', 'Koferi'],
        'Kaiš': ['Kaiš'],
        'Novčanici': ['Novčanici'],
        'Satovi': ['Satovi'],
        'Nakit': ['Prstenje', 'Narukvice', 'Ogrlice', 'Privešci'],
        'Naočare': ['Naočare za sunce', 'Naočare za vid'],
        'Kape i šeširi': ['Kačketi', 'Šeširi', 'Kape'],
        'Kravate': ['Kravate'],
        'Šalovi': ['Šalovi'],
        'Rukavice': ['Rukavice'],
        'Ostalo': ['Kisobrani', 'Privešci za ključeve', 'Ostalo']
      }
    }
  };

  // Serbian cities list
  const cities = [
    'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pančevo', 'Čačak', 'Kraljevo', 'Smederevo',
    'Ada', 'Aleksandrovac', 'Aleksinac', 'Alibunar', 'Apatin', 'Aranđelovac', 'Arilje',
    'Babušnica', 'Bač', 'Bačka Palanka', 'Bačka Topola', 'Bački Petrovac', 'Bajina Bašta', 'Batočina',
    'Bečej', 'Bela Crkva', 'Bela Palanka', 'Beočin', 'Blace', 'Bogatić', 'Bojnik', 'Boljevac', 'Bor',
    'Bosilegrad', 'Brus', 'Bujanovac', 'Čajetina', 'Čoka', 'Ćićevac', 'Ćuprija', 'Crna Trava', 'Crveni krst',
    'Dečani', 'Despotovac', 'Dimitrovgrad', 'Doljevac', 'Đakovica', 'Gadžin Han', 'Glogovac', 'Gnjilane',
    'Golubac', 'Gora', 'Gornji Milanovac', 'Inđija', 'Irig', 'Istok', 'Ivanjica', 'Jagodina', 'Kačanik',
    'Kanjiža', 'Kikinda', 'Kladovo', 'Klina', 'Knić', 'Knjaževac', 'Koceljeva', 'Kosjerić', 'Kosovo Polje',
    'Kosovska Kamenica', 'Kosovska Mitrovica', 'Kovačica', 'Kovin', 'Kragujevac', 'Kraljevo', 'Krupanj',
    'Kruševac', 'Kučevo', 'Kula', 'Kuršumlija', 'Lajkovac', 'Lapovo', 'Lebane', 'Leposavić', 'Leskovac',
    'Lipljan', 'Ljig', 'Ljubovija', 'Loznica', 'Lučani', 'Majdanpek', 'Mali Iđoš', 'Mali Zvornik',
    'Malo Crniće', 'Medveđa', 'Merošina', 'Mionica', 'Negotin', 'Niška Banja', 'Nova Crnja', 'Nova Varoš',
    'Novi Bečej', 'Novi Kneževac', 'Novi Pazar', 'Novo Brdo', 'Obilić', 'Odžaci', 'Opovo', 'Orahovac',
    'Osečina', 'Palilula', 'Pantelej', 'Paraćin', 'Peć', 'Pećinci', 'Petrovac na Mlavi', 'Pirot',
    'Plandište', 'Podujevo', 'Požarevac', 'Požega', 'Preševo', 'Priboj', 'Prijepolje', 'Priština',
    'Prizren', 'Prokuplje', 'Rača', 'Raška', 'Ražanj', 'Rekovac', 'Ruma', 'Šabac', 'Sečanj', 'Senta',
    'Sevojno', 'Šid', 'Sjenica', 'Smederevska Palanka', 'Sokobanja', 'Sombor', 'Srbica', 'Srbobran',
    'Sremska Mitrovica', 'Sremski Karlovci', 'Stara Pazova', 'Štimlje', 'Štrpce', 'Surdulica', 'Suva Reka',
    'Svilajnac', 'Svrljig', 'Temerin', 'Titel', 'Topola', 'Trgovište', 'Trstenik', 'Tutin', 'Ub', 'Uroševac',
    'Užice', 'Valjevo', 'Varvarin', 'Velika Plana', 'Veliko Gradište', 'Vitina', 'Vladičin Han', 'Vladimirci',
    'Vlasotince', 'Vrbas', 'Vranje', 'Vranjska Banja', 'Vrnjačka Banja', 'Vršac', 'Vučitrn', 'Zaječar',
    'Žabalj', 'Žabari', 'Žagubica', 'Žitište', 'Žitorađa', 'Zvečan', 'Zubin Potok'
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
  
  const materials = ['Pamuk', 'Poliester', 'Vuna', 'Svila', 'Lan', 'Kašmir', 'Viskoza', 'Koža', 'Eko koža', 'Krzno', 'Denim', 'Neopren', 'Gore-Tex', 'Ostalo'];

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
    
    // Check if subcategory is required (when category has subcategories)
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

  const getSizes = () => {
    if (formData.mainCategory === 'Obuća') {
      return sizes.shoes;
    }
    return sizes.clothing;
  };

  // Fix for categories that should appear as single-item arrays
  const getCategorySubcategories = () => {
    if (!formData.gender || !formData.mainCategory || !formData.category) return [];
    
    let subcats = categoriesStructure[formData.gender][formData.mainCategory][formData.category];
    
    // If it's an empty array, add the category name as the only option
    if (subcats.length === 0) {
      return [formData.category];
    }
    
    return subcats;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderMobile />
      
      <main className="pb-20 pt-14">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Dodaj oglas</h1>
          
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

            {/* Main Category (Odeća/Obuća/Aksesoari) */}
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

            {/* Detailed Subcategory (Tip) - Now REQUIRED when available */}
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

            {/* Brand - Now REQUIRED */}
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

            {/* Color - Multi-select */}
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

            {/* Location - Now DROPDOWN with Serbian cities */}
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
