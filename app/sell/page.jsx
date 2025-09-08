// app/sell/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import { Camera, X, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function SellPage() {
  const router = useRouter();
  const user = useAuth();
  
  // Redirect to auth if not logged in
  if (!user) {
    router.push('/auth');
    return null;
  }

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
    location: 'Beograd' // Default location
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
    // Mock image upload - in production this would upload to Supabase
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages].slice(0, 5)); // Max 5 images
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
      // In production, this would save to Supabase
      console.log('Submitting:', { ...formData, images });
      
      // Show success message and redirect
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
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 transition-colors">
                    <Camera className="w-8 h-8 text-gray-400 mb-2" />
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
                onChange={(e) => setFormData({...formData, d
