'use client';
import { useState } from 'react';

export default function SearchSheet({ open, onClose }) {
  return (
    <div className={`fixed inset-0 z-30 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* sheet (slides from right) */}
      <aside className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-xl p-4
                         transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Pretraga</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5" aria-label="Zatvori">✕</button>
        </div>

        <input
          type="text"
          placeholder="Pronađi po ključnoj reči..."
          className="w-full h-11 px-4 rounded-pill bg-[var(--bg)] outline-none"
        />

        <div className="mt-6 space-y-4 text-sm">
          <div>
            <div className="font-medium mb-2">Prema kategoriji</div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {["Odeća","Obuća","Aksesoari"].map(x=>(
                <button key={x} className="px-4 py-2 rounded-pill bg-[var(--bg)] whitespace-nowrap">{x}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">Novo</div>
            <ul className="grid grid-cols-2 gap-2">
              {["Danas","Ove nedelje","Ovaj mesec","Sniženja"].map(x=>(
                <li key={x}><button className="w-full px-3 py-2 rounded-lg bg-[var(--bg)] text-left">{x}</button></li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
