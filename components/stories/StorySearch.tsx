'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, X, Building2, BookOpen, ArrowRight } from 'lucide-react';
import { MOCK_STORIES } from '@/lib/mock-data/stories';
import { MOCK_COMPANIES } from '@/lib/mock-data/companies';
import { FantiDetective } from '@/components/mascot/Fanti';

interface StorySearchProps {
  onSearchChange?: (term: string) => void;
}

export function StorySearch({ onSearchChange }: StorySearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const trimmed = searchTerm.trim().toLowerCase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onSearchChange) {
      onSearchChange('');
    }
  };

  // Matched Companies
  const matchingCompanies = useMemo(() => {
    if (!trimmed) return [];
    return MOCK_COMPANIES.filter(
      (c) =>
        c.commercialName.toLowerCase().includes(trimmed) ||
        (c.legalName && c.legalName.toLowerCase().includes(trimmed)) ||
        c.country.toLowerCase().includes(trimmed) ||
        (c.city && c.city.toLowerCase().includes(trimmed)) ||
        c.industry.toLowerCase().includes(trimmed)
    ).slice(0, 4);
  }, [trimmed]);

  // Matched Stories
  const matchingStories = useMemo(() => {
    if (!trimmed) return [];
    return MOCK_STORIES.filter(
      (s) =>
        s.title.toLowerCase().includes(trimmed) ||
        s.companyName.toLowerCase().includes(trimmed) ||
        s.excerpt.toLowerCase().includes(trimmed) ||
        s.country.toLowerCase().includes(trimmed) ||
        (s.city && s.city.toLowerCase().includes(trimmed)) ||
        s.serviceType.toLowerCase().includes(trimmed)
    ).slice(0, 5);
  }, [trimmed]);

  const hasSearched = trimmed.length > 0;
  const hasResults = matchingCompanies.length > 0 || matchingStories.length > 0;

  return (
    <div id="buscador" className="w-full max-w-3xl mx-auto my-8 relative">
      <div className="text-center mb-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#211B35]">
          ¿Con quién estás pensando hacer negocios? 🕵️‍♂️
        </h2>
        <p className="text-xs sm:text-sm text-[#777286]">
          Busca una empresa, un sector, un país o una palabra clave antes de firmar cualquier contrato.
        </p>
      </div>

      {/* Input Box */}
      <div className="relative">
        <div className="relative flex items-center bg-white rounded-2xl border-2 border-[#211B35]/15 focus-within:border-[#8B5CF6] transition-all shadow-sm focus-within:shadow-[0_8px_24px_rgba(139,92,246,0.15)]">
          <div className="pl-4 pr-2 text-[#777286]">
            <Search className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Busca una empresa (ej. Nebula, Montealto, retail, diseño)..."
            className="w-full py-3.5 pr-10 text-sm sm:text-base text-[#211B35] bg-transparent outline-none placeholder:text-[#777286]/70 font-medium"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-2 mr-2 text-[#777286] hover:text-[#211B35] hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown Overlay */}
        {hasSearched && isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#211B35]/15 shadow-2xl p-4 z-30 max-h-[460px] overflow-y-auto">
            {hasResults ? (
              <div className="space-y-4">
                {/* Companies Section */}
                {matchingCompanies.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#777286] mb-2 px-1">
                      <Building2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Empresas mencionadas ({matchingCompanies.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matchingCompanies.map((comp) => (
                        <Link
                          key={comp.id}
                          href={`/empresas/${comp.slug}`}
                          onClick={() => setIsFocused(false)}
                          className="p-2.5 rounded-xl bg-[#FAF9F6] hover:bg-[#8B5CF6]/10 border border-[#211B35]/5 hover:border-[#8B5CF6]/30 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <p className="font-bold text-sm text-[#211B35] group-hover:text-[#8B5CF6] transition-colors">
                              {comp.commercialName}
                            </p>
                            <p className="text-[11px] text-[#777286]">
                              {comp.city ? `${comp.city}, ` : ''}{comp.country} · {comp.totalStories} historias
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#777286] group-hover:text-[#8B5CF6] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stories Section */}
                {matchingStories.length > 0 && (
                  <div className="pt-2 border-t border-[#211B35]/10">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#777286] mb-2 px-1">
                      <BookOpen className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>Historias encontradas ({matchingStories.length})</span>
                    </div>
                    <div className="space-y-2">
                      {matchingStories.map((story) => (
                        <Link
                          key={story.id}
                          href={`/historias/${story.slug}`}
                          onClick={() => setIsFocused(false)}
                          className="p-2.5 rounded-xl hover:bg-[#8B5CF6]/10 transition-colors block group border border-transparent hover:border-[#8B5CF6]/20"
                        >
                          <p className="font-bold text-sm text-[#211B35] group-hover:text-[#8B5CF6] transition-colors leading-snug">
                            {story.title}
                          </p>
                          <p className="text-xs text-[#777286] mt-0.5 line-clamp-1">
                            🏢 {story.companyName} · {story.country} · {story.serviceType}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* No Results State with Fanti Detective */
              <div className="py-6 px-4 text-center">
                <FantiDetective size="md" className="mx-auto mb-2" />
                <h4 className="font-bold text-base text-[#211B35] mb-1">
                  Por aquí no encontramos fantasmas... todavía.
                </h4>
                <p className="text-xs text-[#777286] max-w-md mx-auto leading-relaxed mb-3">
                  No tenemos reportes registrados para &ldquo;<span className="font-bold text-[#211B35]">{searchTerm}</span>&rdquo;.
                </p>
                <div className="p-2.5 bg-[#FEF3C7] rounded-xl text-[11px] text-[#92400E] max-w-md mx-auto font-medium">
                  ⚠️ <strong>Recordatorio importante:</strong> Que una empresa no tenga historias publicadas no significa automáticamente que sea confiable. Solo significa que nadie ha confesado aún.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helpful Search Chips */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5 text-xs text-[#777286]">
        <span className="font-semibold">Prueba buscando:</span>
        {['Nebula', 'E-commerce', 'México', 'Constructora', 'Shopify', 'Auditoría'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => {
              setSearchTerm(tag);
              if (onSearchChange) onSearchChange(tag);
              setIsFocused(true);
            }}
            className="px-2.5 py-1 bg-white hover:bg-[#8B5CF6]/10 text-[#211B35] hover:text-[#8B5CF6] rounded-lg border border-[#211B35]/10 text-[11px] font-semibold transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
