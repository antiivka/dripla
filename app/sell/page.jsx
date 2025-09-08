// app/sell/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderMobile from '@/components/HeaderMobile';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/hooks/useAuth';

export default function SellPage() {
  const router = useRouter();
  const user = useAuth();
  
  // Remove this block - it's causing the redirect issue
  // if (!user) {
  //   router.push('/auth');
  //   return null;
  // }

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    gender: '',
    size: '',
    condition: '',
    brand: '',
    price: '',
    location: 'Beograd'
  });

  // ... rest of your code stays the same
