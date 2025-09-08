// app/login/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/profil');
      }
    };
    checkUser();
  }, [router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Force redirect after successful login
        window.location.href = '/profil';
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            }
          }
        });
        
        if (error) throw error;
        
        // Force redirect after signup
        window.location.href = '/profil';
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png" alt="Dripla" className="h-12 mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-ink">
            {isLogin ? 'Dobrodošao nazad!' : 'Pridruži se Dripli'}
          </h1>
          <p className="text-ink2 mt-2">
            {isLogin ? 'Uloguj se na svoj Dripla nalog' : 'Napravi nalog i počni prodaju'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="bg-white rounded-2xl shadow-card p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Korisničko ime
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-black/10 rounded-xl focus:outline-none focus:border-purple"
                placeholder="@tvoje_ime"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-black/10 rounded-xl focus:outline-none focus:border-purple"
              placeholder="tvoj@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Lozinka
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-black/10 rounded-xl focus:outline-none focus:border-purple"
              placeholder="••••••••"
              required
              minLength={6}
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
            className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Molim sačekaj...' : (isLogin ? 'Prijavi se' : 'Napravi nalog')}
          </button>
        </form>

        {/* Switch mode */}
        <div className="text-center mt-6 text-sm">
          <span className="text-ink2">
            {isLogin ? 'Nemaš nalog?' : 'Već imaš nalog?'}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-purple-600 font-semibold ml-2 hover:underline"
          >
            {isLogin ? 'Registruj se' : 'Prijavi se'}
          </button>
        </div>

        {/* Back home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-ink2 text-sm hover:text-ink">
            ← Nazad na početnu
          </Link>
        </div>
      </div>
    </div>
  );
}
