'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Fanti } from '@/components/mascot/Fanti';
import { Search, X, PlusCircle, Sparkles } from 'lucide-react';

interface HeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function Hero({ searchTerm, onSearchChange }: HeroProps) {
  const quickTags = ['CDMX', 'Bogotá', 'Buenos Aires', 'Santiago', 'Lima', 'Shopify', 'Auditoría'];

  return (
    <section id="buscador" className="w-full pt-8 pb-6 px-4 sm:px-6 border-b border-[#211B35]/8 bg-white/70 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        {/* Unified Title + Cute Mini Mascot */}
        <div className="inline-flex items-center justify-center gap-3">
          <Fanti mood="writer" size="sm" animate={true} className="w-10 h-10" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#211B35] tracking-tight">
            Los fantasmas existen.{' '}
            <span className="text-[#8B5CF6]">Algunos tienen departamento de finanzas.</span>
          </h1>
        </div>

        {/* Dynamic Search Bar (Minimalist & Single-Row) */}
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center gap-2 bg-[#FAF9F6] border-2 border-[#211B35]/15 focus-within:border-[#8B5CF6] rounded-2xl px-3.5 py-1.5 transition-all shadow-sm focus-within:shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
            <Search className="w-4 h-4 text-[#8B5CF6] shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por empresa, ciudad o palabra clave..."
              className="w-full py-2 bg-transparent text-sm text-[#211B35] placeholder:text-[#777286]/70 outline-none font-medium"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="p-1 text-[#777286] hover:text-[#211B35] rounded-full"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <Link
              href="/contar-mi-historia"
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl transition-all active:scale-95 whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Contar chisme</span>
            </Link>
          </div>

          {/* Quick Dynamic Filter Pills */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5 flex-wrap text-xs text-[#777286]">
            <span className="text-[11px] font-semibold text-[#777286]">Tendencias:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => onSearchChange(searchTerm === tag ? '' : tag)}
                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  searchTerm.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#8B5CF6] text-white'
                    : 'bg-[#FAF9F6] hover:bg-[#8B5CF6]/10 text-[#211B35] border border-[#211B35]/10'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
