// app/wishlist/page.jsx
'use client';

import { useState } from 'react';
import HeaderMobile from "@/components/HeaderMobile";
import BottomNav from "@/components/BottomNav";
import FABs from "@/components/FABs";
import { IconHeart } from "@/components/icons/Icons";

function WishlistItem({ item, onRemove }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleHeartClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmRemove = () => {
    onRemove(item.id);
    setShowConfirm(false);
  };

  const handleCancelRemove = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <article className={`card p-4 overflow-hidden relative ${item.sold ? 'opacity-60' : ''}`}>
        {/* Image */}
        <div className={`aspect-square bg-[#eee] rounded-lg mb-3 ${item.sold ? 'grayscale' : ''}`}>
          {item.sold && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                Prodato
              </span>
            </div>
          )}
        </div>
        
        {/* Heart icon - always filled for wishlisted items */}
        <button
          onClick={handleHeartClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur shadow-md hover:bg-white transition-colors"
          aria-label="Ukloni iz liste želja"
        >
          <IconHeart size={20} className="text-red-500 fill-red-500" />
        </button>

        {/* Item details */}
        <div className={item.sold ? 'grayscale' : ''}>
          <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
          <p className="text-sm text-ink2">{item.price} RSD</p>
          <p className="text-xs text-ink2 mt-1">{item.size} · {item.condition}</p>
        </div>
      </article>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Ukloni iz liste želja?</h3>
            <p className="text-sm text-ink2 mb-6">
              Da li stvarno želiš da ukloniš "{item.name}" iz svoje liste želja?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancelRemove}
                className="flex-1 px-4 py-2.5 rounded-full border border-black/10 hover:bg-black/5 transition-colors font-medium text-sm"
              >
                Otkaži
              </button>
              <button
                onClick={handleConfirmRemove}
                className="flex-1 px-4 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors font-medium text-sm"
              >
                Ukloni
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function WishlistPage() {
  // Dummy data - replace with real data from Supabase later
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Vintage Levi's 501", price: "3.500", size: "M", condition: "kao novo", sold: false },
    { id: 2, name: "Nike Air Max 90", price: "8.000", size: "42", condition: "odlično", sold: true },
    { id: 3, name: "Zara oversized blazer", price: "4.200", size: "L", condition: "vrlo dobro", sold: false },
    { id: 4, name: "Champion duks", price: "2.800", size: "S", condition: "kao novo", sold: false },
    { id: 5, name: "Dr. Martens čizme", price: "12.000", size: "40", condition: "odlično", sold: true },
    { id: 6, name: "Carhartt WIP jakna", price: "7.500", size: "XL", condition: "vrlo dobro", sold: false },
  ]);

  const handleRemoveItem = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  return (
    <>
      <HeaderMobile />
      
      <main className="mx-auto max-w-5xl px-4 pt-4 pb-20">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Moja lista želja</h1>
          <p className="text-sm text-ink2">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'artikal' : 'artikala'} u listi želja
          </p>
        </header>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {wishlistItems.map(item => (
              <WishlistItem 
                key={item.id} 
                item={item} 
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/5 mb-4">
              <IconHeart size={32} className="text-ink2" />
            </div>
            <h2 className="text-lg font-medium mb-2">Lista želja je prazna</h2>
            <p className="text-sm text-ink2 mb-6">
              Artikli koje označiš srcem će se pojaviti ovde
            </p>
            <a 
              href="/" 
              className="inline-block px-6 py-2.5 rounded-full bg-black text-white hover:bg-black/80 transition-colors text-sm font-medium"
            >
              Istraži artikle
            </a>
          </div>
        )}
      </main>

      <FABs showDrop />
      <BottomNav />
    </>
  );
}
