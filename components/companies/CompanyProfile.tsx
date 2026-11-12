'use client';

import React from 'react';
import Link from 'next/link';
import { Company, Story } from '@/lib/types';
import { StoryCard } from '@/components/stories/StoryCard';
import { FantiHappy, FantiDetective } from '@/components/mascot/Fanti';
import {
  ArrowLeft,
  Building2,
  Globe,
  MapPin,
  Briefcase,
  PlusCircle,
  ShieldAlert,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface CompanyProfileProps {
  company: Company;
  stories: Story[];
}

export function CompanyProfile({ company, stories }: CompanyProfileProps) {
  const resolvedCount = stories.filter((s) => s.status === 'pagado' || s.status === 'acuerdo').length;
  const pendingCount = stories.filter((s) => s.status === 'pendiente').length;
  const disputedCount = stories.filter((s) => s.status === 'en-disputa').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/#buscador"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al buscador de empresas</span>
        </Link>
      </div>

      {/* Company Header Card */}
      <div className="bg-white rounded-3xl border border-[#211B35]/10 p-6 sm:p-10 shadow-sm mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#211B35]/10">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FAF5FF] border border-[#8B5CF6]/30 flex items-center justify-center text-3xl shrink-0 shadow-sm">
              🏢
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#211B35]">
                  {company.commercialName}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#211B35]/10 text-[#777286]">
                  {company.city ? `${company.city}, ` : ''}{company.country}
                </span>
              </div>
              {company.legalName && (
                <p className="text-xs text-[#777286] font-medium">
                  Razón social: <span className="text-[#211B35] font-semibold">{company.legalName}</span>
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#777286] pt-1">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  {company.industry}
                </span>
                {company.website && (
                  <>
                    <span aria-hidden="true">·</span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#8B5CF6] hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Sitio web
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action CTA: Report your own experience */}
          <div className="shrink-0">
            <Link
              href={`/contar-mi-historia?empresa=${encodeURIComponent(company.commercialName)}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>¿También trabajaste con ellos? Confiesa aquí 👻</span>
            </Link>
          </div>
        </div>

        {/* Objective Case Counters (No fake scoreboards, purely countable cases) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#211B35]/8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#777286] block">
              Historias registradas
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#211B35] mt-1 block">
              {stories.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Pendientes de pago
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-1 block">
              {pendingCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              En disputa
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-900 mt-1 block">
              {disputedCount}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Casos resueltos / acuerdos
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-1 block">
              {resolvedCount}
            </span>
          </div>
        </div>

        {/* Ethical Disclaimer */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FAF9F6] border border-[#211B35]/10 text-xs text-[#777286] leading-relaxed">
          <strong>Principios de neutralidad:</strong> Empresa Deudora no asigna calificaciones de &ldquo;fraude&rdquo; ni certificaciones de confianza. El propósito de este perfil es visibilizar testimonios de buena fe para fomentar la resolución de controversias y el respeto a los compromisos de pago.
        </div>
      </div>

      {/* Stories Feed for this company */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#211B35] flex items-center gap-2">
            <span>Historias sobre {company.commercialName}</span>
            <span>🍿</span>
          </h2>
        </div>

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#211B35]/10 p-10 text-center max-w-md mx-auto">
            <FantiDetective size="md" className="mx-auto mb-2" />
            <h3 className="font-bold text-lg text-[#211B35] mb-1">
              Aún no hay historias públicas sobre esta empresa
            </h3>
            <p className="text-xs text-[#777286] mb-4">
              Si trabajaste con ellos y tuviste una experiencia que compartir, puedes ser el primero.
            </p>
            <Link
              href={`/contar-mi-historia?empresa=${encodeURIComponent(company.commercialName)}`}
              className="px-4 py-2 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl"
            >
              Publicar primera historia 👻
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
