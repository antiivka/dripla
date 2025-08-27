'use client';
import { useState } from 'react';
import SearchSheet from '@/components/SearchSheet';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const user = useAuth();

  return (
    <>
      <header className="h-14 sticky top-0 z-20 bg-[var(--bg)]/90 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-5xl h-full px-4 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="block h-7">
            {/* add ?v=2 once to bust cache if needed */}
            <img src="/logo.png?v=2" alt="Dripla" className="h-7 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              aria-label="Pretraga"
              className="p-2 rounded-full hover:bg-black/5"
              onClick={() => setOpen(true)}
            >
              🔍
            </button>
            <Link href={user ? '/wishlist' : '/auth'} aria-label="Lista želja" className="p-2 rounded-full hover:bg-black/5">♡</Link>
            <Link href={user ? '/profil' : '/auth'} aria-label="Profil" className="p-2 rounded-full hover:bg-black/5">👤</Link>
          </div>
        </div>
      </header>

      <SearchSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
