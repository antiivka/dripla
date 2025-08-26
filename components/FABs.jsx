'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function FABs({ showDrop = true }) {
  const user = useAuth();
  const isPremium = false; // replace with profile.is_premium when ready

  const toAdd = user ? "/sell" : "/auth";
  const toDrop = !user ? "/auth" : (isPremium ? "/drops/create" : "/upgrade");

  return (
    <div className="fixed right-4 bottom-20 flex flex-col items-end gap-3">
      {showDrop && (
        <Link href={toDrop} className="btn-cta premium shadow-lg text-sm px-4 py-2">
          Dodaj drop
        </Link>
      )}
      <Link href={toAdd} className="btn-cta shadow-lg px-5 py-3">
        + Dodaj oglas
      </Link>
    </div>
  );
}
