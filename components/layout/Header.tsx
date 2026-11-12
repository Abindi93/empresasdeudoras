'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fanti } from '@/components/mascot/Fanti';
import { useHowItWorks } from '@/components/modals/HowItWorksContext';
import { Menu, X, PlusCircle, Search, BookOpen, Sparkles } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openHowItWorks } = useHowItWorks();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#211B35]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark + Mascot */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[#211B35] group transition-transform active:scale-95 shrink-0"
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

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#777286]">
          <Link
            href="/#muro-historias"
            className="transition-colors hover:text-[#8B5CF6] py-1 whitespace-nowrap shrink-0"
          >
            Explorar historias
          </Link>
          <Link
            href="/#buscador"
            className="transition-colors hover:text-[#8B5CF6] py-1 whitespace-nowrap shrink-0"
          >
            Buscar empresas
          </Link>
          <button
            type="button"
            onClick={openHowItWorks}
            className="transition-colors hover:text-[#8B5CF6] py-1 whitespace-nowrap shrink-0 font-semibold cursor-pointer"
          >
            Cómo funciona
          </button>
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/contar-mi-historia"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-95 transition-all duration-150 rounded-xl shadow-[0_4px_14px_rgba(139,92,246,0.35)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.45)] whitespace-nowrap"
          >
            <span>👻</span>
            <span>Contar mi historia</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#211B35] hover:bg-[#211B35]/5 rounded-lg transition-colors"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#211B35]/10 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <Link
              href="/#muro-historias"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-[#211B35] hover:bg-[#FAF9F6] rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              Explorar historias
            </Link>
            <Link
              href="/#buscador"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-[#211B35] hover:bg-[#FAF9F6] rounded-lg transition-colors"
            >
              <Search className="w-4 h-4 text-[#8B5CF6]" />
              Buscar empresas
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openHowItWorks();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-bold text-[#211B35] hover:bg-[#FAF9F6] rounded-lg transition-colors text-left"
            >
              <BookOpen className="w-4 h-4 text-[#8B5CF6]" />
              Cómo funciona
            </button>
          </div>

          <div className="pt-2 border-t border-[#211B35]/10">
            <Link
              href="/contar-mi-historia"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#8B5CF6] rounded-xl shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Contar mi historia 👻
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
