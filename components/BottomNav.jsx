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
  { href: '/',        label: 'Home',     Icon: IconHome },
  { href: '/search',  label: 'Search',   Icon: IconSearch },
  { href: '/inbox',   label: 'Inbox',    Icon: IconMessage },
  { href: '/wishlist',label: 'Wishlist', Icon: IconHeart },
  { href: '/profil',  label: 'Profile',  Icon: IconUser },
];

export default function BottomNav() {
  const pathname = usePathname();
  const user = useAuth();

  const gate = (href) =>
    ['/inbox', '/wishlist', '/profil'].includes(href) ? (user ? href : '/auth') : href;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-5xl h-14 grid grid-cols-5 text-xs">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={gate(href)}
              className={`flex flex-col items-center justify-center transition-colors ${
                active ? 'text-[#2CD3A4]' : 'text-ink2 hover:text-ink'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={22} />
              <span className="mt-0.5">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
