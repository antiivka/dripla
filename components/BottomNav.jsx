'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const items = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/search', label: 'Search', icon: '🔍' },
  { href: '/inbox', label: 'Inbox', icon: '💬' },
  { href: '/wishlist', label: 'Wishlist', icon: '♡' },
  { href: '/profil', label: 'Profile', icon: '👤' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const user = useAuth();

  function gate(href) {
    if (href === '/inbox' || href === '/wishlist' || href === '/profil') {
      return user ? href : '/auth';
    }
    return href;
  }

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl h-14 grid grid-cols-5 text-xs">
        {items.map(it => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={gate(it.href)}
              className={`flex flex-col items-center justify-center ${active ? 'text-ink' : 'text-ink2'}`}
            >
              <span>{it.icon}</span>
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
