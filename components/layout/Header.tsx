'use client';

import React from 'react';
import Link from 'next/link';
import { Fanti } from '@/components/mascot/Fanti';
import { Search } from 'lucide-react';
import { useSiteSearch } from '@/components/search/SearchContext';

export function Header() {
  const { isSearchOpen, toggleSearch } = useSiteSearch();

  return (
    <header className="sticky top-0 z-40 border-b border-[#211B35]/10 bg-[#FAF9F6]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-[#211B35] transition-transform active:scale-95"
        >
          <div className="relative">
            <Fanti mood="default" size="sm" animate={false} className="w-9 h-9" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8F28B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B8F28B]"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#211B35] group-hover:text-[#8B5CF6] transition-colors leading-none">
              Empresa Deudora
            </span>
            <span className="text-[11px] font-semibold text-[#777286] hidden sm:inline tracking-normal">
              El chismecito empresarial 🍿
            </span>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleSearch}
            className={`rounded-xl p-2.5 transition-colors ${
              isSearchOpen
                ? 'bg-[#8B5CF6]/10 text-[#8B5CF6]'
                : 'text-[#211B35] hover:bg-[#211B35]/5 hover:text-[#8B5CF6]'
            }`}
            aria-label={isSearchOpen ? 'Cerrar buscador' : 'Abrir buscador'}
            aria-expanded={isSearchOpen}
            aria-controls="buscador"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="/contar-mi-historia"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 transition-all duration-150 rounded-xl shadow-[0_4px_14px_rgba(139,92,246,0.35)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.45)] whitespace-nowrap"
          >
            <span>👻</span>
            <span>Contar mi historia</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
