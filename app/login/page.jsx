// app/profil/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import FABs from '@/components/FABs';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Učitavanje...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderMobile />
      
      <main className="pb-20 pt-14">
        <div className="bg-white border-b">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Moj profil</h1>
            <p className="text-gray-600">Dobrodošao/la!</p>
            <p className="text-sm text-gray-500 mt-2">Email: {user.email}</p>
            
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Odjavi se
            </button>
          </div>
        </div>
      </main>

      <FABs />
      <BottomNav />
    </div>
  );
}
