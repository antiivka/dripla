'use client';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Page() {
  return (
    <main style={{ padding: 24, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>Dripla</h1>
      <p>It works 🎉</p>
      <p>Supabase URL set: {String(!!process.env.NEXT_PUBLIC_SUPABASE_URL)}</p>
    </main>
  );
}
