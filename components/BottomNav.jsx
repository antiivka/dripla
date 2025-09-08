// components/BottomNav.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  IconHome,
  IconSearch,
  IconMessage,
  IconHeart,
  IconUser,
} from '@/components/icons/Icons';

const items = [
  { href: '/',         label: 'Početna',   Icon: IconHome },
  { href: '/search',   label: 'Pretraga',  Icon: IconSearch },
  { href: '/inbox',    label: 'Poruke',    Icon: IconMessage },
  { href: '/wishlist', label: 'Lista želja', Icon: IconHeart },
  { href: '/profil',   label: 'Profil',    Icon: IconUser },
];

export default function BottomNav() {
  const pathname = usePathname();
  const user = useAuth();
  
  const gate = (href) =>
    ['/inbox', '/wishlist', '/profil'].includes(href) ? (user ? href : '/login') : href;
  
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl h-14 grid grid-cols-5 text-xs">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={gate(href)}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center transition-colors ${
                active ? 'text-ink' : 'text-ink2 hover:text-ink'
              }`}
            >
              {/* slight upward nudge so the icon baseline looks centered */}
              <Icon size={22} className="-translate-y-[1px]" />
              <span className="mt-0.5">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
