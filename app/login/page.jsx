// app/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // Redirect after successful login
      window.location.href = '/profil';
    } catch (error) {
      setError(error.message || 'Greška pri prijavi');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png" alt="Dripla" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold">Dobrodošao nazad!</h1>
          <p className="text-gray-600 mt-2">Uloguj se na svoj Dripla nalog</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-600"
              placeholder="tvoj@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-600"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #B97EFF 0%, #FFA949 100%)'
            }}
          >
            {loading ? 'Prijavljivanje...' : 'Prijavi se'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Nemaš nalog?{' '}
            <Link href="/register" className="text-purple-600 font-medium">
              Registruj se
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="text-gray-500 text-sm">
            ← Nazad na početnu
          </Link>
        </div>
      </div>
    </div>
  );
}
