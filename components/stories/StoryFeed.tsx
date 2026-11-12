'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Story, StoryCategory, CATEGORIES } from '@/lib/types';
import { StoryCard } from '@/components/stories/StoryCard';
import { FantiWaiting } from '@/components/mascot/Fanti';
import { ArrowUpDown, Filter, Globe2, RotateCcw, MapPin, Loader2, X } from 'lucide-react';

interface StoryFeedProps {
  initialStories: Story[];
  searchFilter?: string;
}

type SortOption = 'recientes' | 'comentadas' | 'resueltas' | 'pendientes';

function FilterGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <span className="flex items-center gap-1 text-xs font-bold text-[#211B35]">
        {icon}
        {label}
      </span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? 'bg-[#211B35] text-white shadow-sm'
          : 'bg-[#FAF9F6] text-[#777286] hover:text-[#211B35]'
      }`}
    >
      {children}
    </button>
  );
}

export function StoryFeed({ initialStories, searchFilter = '' }: StoryFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'all'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('recientes');
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // Available unique countries
  const countries = useMemo(() => {
    const set = new Set<string>();
    initialStories.forEach((s) => set.add(s.country));
    return Array.from(set).sort();
  }, [initialStories]);

  // Available cities based on selected country
  const cities = useMemo(() => {
    const set = new Set<string>();
    initialStories.forEach((s) => {
      if (selectedCountry === 'all' || s.country === selectedCountry) {
        if (s.city) set.add(s.city);
      }
    });
    return Array.from(set).sort();
  }, [initialStories, selectedCountry]);

  // When country changes, reset city if it's no longer valid
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity('all');
  };

  // Filtered stories logic
  const filteredStories = useMemo(() => {
    return initialStories.filter((story) => {
      // Search filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matches =
          story.title.toLowerCase().includes(q) ||
          story.companyName.toLowerCase().includes(q) ||
          story.excerpt.toLowerCase().includes(q) ||
          story.country.toLowerCase().includes(q) ||
          (story.city && story.city.toLowerCase().includes(q)) ||
          story.serviceType.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && story.category !== selectedCategory) {
        return false;
      }

      // Country filter
      if (selectedCountry !== 'all' && story.country !== selectedCountry) {
        return false;
      }

      // City filter
      if (selectedCity !== 'all' && story.city !== selectedCity) {
        return false;
      }

      // Status sub-filtering from sort if selected
      if (sortBy === 'resueltas' && story.status !== 'pagado' && story.status !== 'acuerdo') {
        return false;
      }
      if (sortBy === 'pendientes' && story.status !== 'pendiente' && story.status !== 'en-disputa') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'comentadas') {
        return b.commentsCount - a.commentsCount;
      }
      // Default: más recientes
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [initialStories, searchFilter, selectedCategory, selectedCountry, selectedCity, sortBy]);

  const displayedStories = filteredStories.slice(0, visibleCount);
  const hasMore = visibleCount < filteredStories.length;

  // Infinite Scroll IntersectionObserver
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 5);
            setIsLoadingMore(false);
          }, 350);
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    );

    const currentTarget = observerRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoadingMore]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCountry('all');
    setSelectedCity('all');
    setSortBy('recientes');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCountry !== 'all' ||
    selectedCity !== 'all' ||
    sortBy !== 'recientes';

  return (
    <section id="muro-historias" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Minimal Top Control Strip */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#211B35]">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
          <span>Muro en Vivo</span>
          <span className="text-[#777286] font-semibold text-[11px]">({filteredStories.length} testimonios)</span>
        </div>

        <button
          type="button"
          onClick={() => setIsFiltersOpen((open) => !open)}
          aria-expanded={isFiltersOpen}
          aria-controls="story-filters"
          className={`relative inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold shadow-xs transition-colors ${
            hasActiveFilters
              ? 'border-[#8B5CF6] bg-[#F5F0FF] text-[#6D28D9]'
              : 'border-[#211B35]/12 bg-white text-[#211B35] hover:border-[#8B5CF6]/50'
          }`}
        >
          <Filter className="h-3.5 w-3.5" />
          <span>Filtros</span>
          {hasActiveFilters && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#8B5CF6] px-1 text-[10px] text-white">
              !
            </span>
          )}
        </button>
      </div>

      {isFiltersOpen && (
        <div
          id="story-filters"
          className="mb-6 rounded-2xl border border-[#211B35]/10 bg-white p-4 shadow-sm space-y-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-extrabold text-[#211B35]">Filtra el muro</h2>
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs font-bold text-[#8B5CF6] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" />
                  Restablecer
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsFiltersOpen(false)}
                className="rounded-lg p-1 text-[#777286] hover:bg-[#FAF9F6] hover:text-[#211B35]"
                aria-label="Cerrar filtros"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <span className="flex items-center gap-1 text-xs font-bold text-[#211B35]">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#8B5CF6]" />
              Ordenar por
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full rounded-xl border border-[#211B35]/12 bg-[#FAF9F6] px-3 py-2 text-xs font-bold text-[#211B35] outline-none focus:border-[#8B5CF6]"
            >
              <option value="recientes">Más recientes</option>
              <option value="comentadas">Más comentadas</option>
              <option value="pendientes">Solo pendientes</option>
              <option value="resueltas">Solo resueltas 🎉</option>
            </select>
          </div>

          <FilterGroup label="Tema">
            <FilterPill active={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')}>
              Todos los chismes ({initialStories.length})
            </FilterPill>
            {Object.values(CATEGORIES).map((cat) => (
              <FilterPill key={cat.id} active={selectedCategory === cat.id} onClick={() => setSelectedCategory(cat.id)}>
                {cat.emoji} {cat.name} ({initialStories.filter((s) => s.category === cat.id).length})
              </FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="País" icon={<Globe2 className="h-3.5 w-3.5 text-[#8B5CF6]" />}>
            <FilterPill active={selectedCountry === 'all'} onClick={() => handleCountryChange('all')}>
              Todos
            </FilterPill>
            {countries.map((country) => (
              <FilterPill key={country} active={selectedCountry === country} onClick={() => handleCountryChange(country)}>
                {country}
              </FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="Ciudad" icon={<MapPin className="h-3.5 w-3.5 text-[#8B5CF6]" />}>
            <FilterPill active={selectedCity === 'all'} onClick={() => setSelectedCity('all')}>
              Todas las ciudades ({cities.length})
            </FilterPill>
            {cities.map((city) => (
              <FilterPill key={city} active={selectedCity === city} onClick={() => setSelectedCity(city)}>
                {city}
              </FilterPill>
            ))}
          </FilterGroup>
        </div>
      )}

      {/* Result Count Status Bar */}
      <div className="flex items-center justify-between text-xs text-[#777286] mb-4 px-1">
        <span>
          Mostrando <strong>{displayedStories.length}</strong> de <strong>{filteredStories.length}</strong> chismes empresariales
        </span>
        <span className="font-medium text-[11px]">
          💡 Haz clic en las reacciones o escribe un comentario directamente
        </span>
      </div>

      {/* FEED AS FULL ROWS (Una fila completa) */}
      {displayedStories.length > 0 ? (
        <div className="flex flex-col space-y-5">
          {displayedStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-[#211B35]/10 p-10 text-center max-w-lg mx-auto">
          <FantiWaiting size="lg" className="mx-auto mb-3" />
          <h3 className="text-xl font-bold text-[#211B35] mb-2">
            No hay historias con estos filtros
          </h3>
          <p className="text-xs sm:text-sm text-[#777286] mb-5 leading-relaxed">
            Parece que no hay testimonios para la combinación seleccionada de país, ciudad o categoría.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#7C3AED] transition-colors"
          >
            Ver todos los chismes
          </button>
        </div>
      )}

      {/* INFINITE SCROLL SENTINEL & SPINNER */}
      {hasMore && (
        <div ref={observerRef} className="py-8 text-center flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B5CF6]">
            <Loader2 className="w-4 h-4 animate-spin text-[#8B5CF6]" />
            <span>Cargando más historias automáticamente... 🍿</span>
          </div>
          <span className="text-[11px] text-[#777286]">
            Quedan {filteredStories.length - displayedStories.length} testimonios por ver
          </span>
        </div>
      )}

      {!hasMore && displayedStories.length > 0 && (
        <div className="text-center py-10 text-xs font-semibold text-[#777286]">
          ✨ ¡Has llegado al final de todos los chismes disponibles por ahora! ✨
        </div>
      )}
    </section>
  );
}
