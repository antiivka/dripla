// app/wishlist/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import useAuthUser from '@/hooks/useAuth';
import { IconHeart } from '@/components/icons/Icons';

function WishlistItemCard({ item, onRemove }) {
  return (
    <div className="card p-4 relative">
      {/* Square image placeholder */}
      <div className="aspect-square bg-[#eee] rounded-lg mb-3" />
      
      {/* Remove from wishlist button */}
      <button 
        onClick={() => onRemove(item.id)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-red-50 transition-colors"
      >
        <IconHeart size={18} className="text-red-500 fill-current" />
      </button>
      
      <div className="text-sm font-medium">{item.name}</div>
      <div className="text-sm text-ink2">{item.price} RSD</div>
      <div className="text-xs text-ink2 mt-1">{item.seller}</div>
    </div>
  );
}

export default function WishlistPage() {
  const router = useRouter();
const user = useAuthUser();
const [loading, setLoading] = useState(true);

useEffect(() => {
  // Simple loading check
  setLoading(false);
}, []);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Temporary mock data - later we'll fetch from Supabase
  useEffect(() => {
    if (user) {
      setWishlistItems([
        { id: 1, name: 'Vintage Levis 501', price: '4.500', seller: '@marko_style' },
        { id: 2, name: 'Nike Air Max 90', price: '8.000', seller: '@sneaker_shop' },
        { id: 3, name: 'Zara jakna', price: '3.200', seller: '@fashion_girl' },
      ]);
    }
  }, [user]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <div className="text-ink2">Učitavanje...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <HeaderMobile />
      
      <main className="mx-auto max-w-5xl px-4 pt-4 pb-24">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Moja lista želja</h1>
          <p className="text-ink2 text-sm">
            {wishlistItems.length > 0 
              ? `Imaš ${wishlistItems.length} sačuvanih artikala`
              : 'Nemaš sačuvane artikle'}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card p-8 text-center">
            <IconHeart size={48} className="mx-auto mb-4 text-ink2" />
            <h2 className="text-lg font-medium mb-2">Lista želja je prazna</h2>
            <p className="text-ink2 mb-6">
              Kada pronađeš artikle koji ti se sviđaju, dodaj ih u listu želja klikom na srce.
            </p>
            <Link 
              href="/"
              className="inline-block px-6 py-2 bg-gradient-to-r from-purple to-orange text-white rounded-pill font-medium hover:opacity-90 transition"
            >
              Istraži artikle
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {wishlistItems.map(item => (
              <WishlistItemCard 
                key={item.id} 
                item={item} 
                onRemove={removeFromWishlist}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
