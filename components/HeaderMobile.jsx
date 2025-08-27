'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchSheet from '@/components/SearchSheet';
import { useAuth } from '@/hooks/useAuth';
import { IconSearch, IconHeart, IconUser } from '@/components/icons/Icons';

export default function HeaderMobile() {
  const [open, setOpen] = useState(false);
  const user = useAuth();

  return (
    <>
      <header className="h-14 sticky top-0 z-20 bg-[var(--bg)]/90 backdrop-blur border-b border-black/5">
        <div className="mx-auto max-w-5xl h-full px-4 flex items-center justify-between">
          {/* LOGO — smaller + responsive */}
          <Link href="/" className="block h-6 sm:h-7 md:h-8">
            <img src="/logo.png?v=3" alt="Dripla" className="h-full w-auto" />
          </Link>

          {/* Right-side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Pretraga */}
            <button
              aria-label="Pretraga"
              className="p-2 rounded-full hover:bg-black/5 text-ink"
              onClick={() => setOpen(true)}
            >
              <IconSearch />
            </button>

            {/* Lista želja */}
            <Link
              href={user ? '/wishlist' : '/auth'}
              aria-label="Lista želja"
              className="p-2 rounded-full hover:bg-black/5 text-ink"
            >
              <IconHeart />
            </Link>

            {/* Profil */}
            <Link
              href={user ? '/profil' : '/auth'}
              aria-label="Profil"
              className="p-2 rounded-full hover:bg-black/5 text-ink"
            >
              <IconUser />
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-over search panel */}
      <SearchSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
