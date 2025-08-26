# Dripla (MVP)

Modern • Trustworthy • Fun  
Gen-Z second-hand marketplace for Serbia.

**Stack:** Next.js (App Router) · Tailwind · Supabase (Auth/DB/Storage) · Vercel · Sentry

---

## Quick Start

1. **Repo & Hosting**
   - This repo is the code home.
   - We’ll deploy with **Vercel** (auto-builds from this repo).

2. **Environment Variables (in Vercel → Project → Settings → Environment Variables)**
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
   - (We’ll get these from Supabase when we create the DB.)

3. **Local (optional)**
   ```bash
   npm i
   npm run dev
