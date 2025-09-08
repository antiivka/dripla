// app/profil/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import FABs from '@/components/FABs';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuth();
  const [userListings, setUserListings] = useState([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Mock user data - replace with real data from Supabase
  const profileData = {
    name: 'Marija Petrović',
    username: '@marija_p',
    location: 'Beograd',
    bio: 'Ljubitelj vintage komada i streetwear-a. Uvek tražim jedinstvene delove.',
    listingsCount: 127,
    followersCount: 3,
    avatar: null // Will show placeholder
  };

  // Mock listings data
  const mockListings = [
    { id: 1, title: 'Nike Air Force 1', price: 8000, image: null, status: 'active' },
    { id: 2, title: 'Zara haljina', price: 3500, image: null, status: 'sold' },
    { id: 3, title: 'H&M džemper', price: 2000, image: null, status: 'active' },
    { id: 4, title: 'Vintage Levi\'s jakna', price: 5500, image: null, status: 'active' }
  ];

  useEffect(() => {
    // In production, fetch user's listings from Supabase
    setUserListings(mockListings);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderMobile />
      
      <main className="pb-20 pt-14">
        {/* Profile Header - Cleaner Design */}
        <div className="bg-white border-b">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt={profileData.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-2xl text-gray-400">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <h1 className="text-xl font-bold">{profileData.name}</h1>
                <p className="text-gray-500 text-sm">{profileData.username}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 font-semibold">👍 {profileData.listingsCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-red-500 font-semibold">👎 {profileData.followersCount}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{profileData.location}</span>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-700 mt-3">{profileData.bio}</p>
                
                {/* Edit Profile Button */}
                <button className="text-sm text-purple-600 hover:text-purple-700 mt-3 font-medium">
                  Izmeni profil
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <Link 
                href="/inbox"
                className="flex flex-col items-center justify-center py-3 bg-cyan-50 rounded-xl hover:bg-cyan-100 transition-colors"
              >
                <svg className="w-6 h-6 mb-1 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs font-medium">Poruke</span>
              </Link>

              <Link 
                href="/settings"
                className="flex flex-col items-center justify-center py-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
              >
                <svg className="w-6 h-6 mb-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-medium">Podešavanja</span>
              </Link>

              <Link 
                href="/wishlist"
                className="flex flex-col items-center justify-center py-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors"
              >
                <svg className="w-6 h-6 mb-1 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs font-medium">Lista želja</span>
              </Link>
            </div>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h2 className="text-lg font-bold mb-4">Moji oglasi</h2>
          
          {userListings.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {userListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  {/* Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    {listing.image ? (
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Action buttons */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      {listing.status === 'active' && (
                        <button className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Sold badge */}
                    {listing.status === 'sold' && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-bold">PRODATO</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate">{listing.title}</h3>
                    <p className="text-orange-500 font-bold text-sm mt-1">{listing.price.toLocaleString()} RSD</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Još uvek nemaš oglase</p>
              <Link href="/sell" className="text-purple-600 font-medium">
                Dodaj svoj prvi oglas
              </Link>
            </div>
          )}
        </div>
      </main>

      <FABs />
      <BottomNav />
    </div>
  );
}
