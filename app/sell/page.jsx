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
    category: '',
    subcategory: '',
    gender: '',
    size: '',
    condition: '',
    brand: '',
    price: '',
    location: 'Beograd'
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});

  // Categories structure
  const categories = {
    'Odeća': {
      subcategories: ['Majice', 'Košulje', 'Dukserice', 'Džemperi', 'Jakne', 'Pantalone', 'Farmerke', 'Šorcevi', 'Haljine', 'Suknje', 'Odela', 'Veš', 'Kupaći', 'Sportska odeća'],
      sizes: {
        clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        kids: ['86', '92', '98', '104', '110', '116', '122', '128', '134', '140', '146', '152']
      }
    },
    'Obuća': {
      subcategories: ['Patike', 'Cipele', 'Čizme', 'Sandale', 'Papuče'],
      sizes: {
        shoes: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46']
      }
    },
    'Aksesoari': {
      subcategories: ['Torbe', 'Novčanici', 'Kaiš', 'Nakit', 'Satovi', 'Naočare', 'Šeširi i kape', 'Šalovi i marame'],
      sizes: {
        default: ['Jedinstvena veličina']
      }
    }
  };

  const conditions = [
    { value: 'novo', label: 'Novo sa etiketom' },
    { value: 'kao-novo', label: 'Kao novo' },
    { value: 'odlicno', label: 'Odlično' },
    { value: 'dobro', label: 'Dobro' },
    { value: 'zadovoljavajuce', label: 'Zadovoljavajuće' }
  ];

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
    if (!formData.category) newErrors.category = 'Kategorija je obavezna';
    if (!formData.subcategory) newErrors.subcategory = 'Potkategorija je obavezna';
    if (!formData.gender) newErrors.gender = 'Pol je obavezan';
    if (!formData.size) newErrors.size = 'Veličina je obavezna';
    if (!formData.condition) newErrors.condition = 'Stanje je obavezno';
    if (!formData.price) newErrors.price = 'Cena je obavezna';
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
    if (!formData.category) return [];
    
    if (formData.category === 'Odeća') {
      return formData.gender === 'Deca' 
        ? categories['Odeća'].sizes.kids 
        : categories['Odeća'].sizes.clothing;
    } else if (formData.category === 'Obuća') {
      return categories['Obuća'].sizes.shoes;
    } else {
      return categories['Aksesoari'].sizes.default;
    }
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Kategorija <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: '', size: ''})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value="">Izaberi kategoriju</option>
                {Object.keys(categories).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Subcategory */}
            {formData.category && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Potkategorija <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value="">Izaberi potkategoriju</option>
                  {categories[formData.category].subcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>}
              </div>
            )}

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Za koga <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Žene', 'Muškarci', 'Deca'].map(gender => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData({...formData, gender, size: ''})}
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

            {/* Size */}
            {formData.category && formData.gender && (
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

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Brend
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                placeholder="npr. Zara, H&M, Nike..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              />
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
                Lokacija
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="npr. Beograd, Novi Sad..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-400"
              />
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
