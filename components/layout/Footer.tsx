'use client';

import React from 'react';
import Link from 'next/link';
import { Fanti } from '@/components/mascot/Fanti';
import { useHowItWorks } from '@/components/modals/HowItWorksContext';
import { ShieldCheck, Heart, AlertCircle, Sparkles } from 'lucide-react';

export function Footer() {
  const { openHowItWorks } = useHowItWorks();

  return (
    <footer className="bg-white border-t border-[#211B35]/10 pt-12 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <Fanti mood="default" size="sm" animate={false} className="w-8 h-8" />
              <span className="font-extrabold text-xl tracking-tight text-[#211B35]">
                Empresa Deudora
              </span>
            </div>
            <p className="text-sm font-medium text-[#211B35] italic">
              &ldquo;Los fantasmas existen. Algunos tienen departamento de finanzas.&rdquo;
            </p>
            <p className="text-xs text-[#777286] leading-relaxed max-w-sm">
              Plataforma comunitaria independiente donde emprendedores, agencias y freelancers comparten historias de cobranza, previenen el ghosting corporativo y aprenden a blindar sus contratos.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#777286]">
              Plataforma
            </h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <Link href="/#muro-historias" className="text-[#211B35] hover:text-[#8B5CF6] transition-colors">
                  Muro de historias 🍿
                </Link>
              </li>
              <li>
                <Link href="/#buscador" className="text-[#211B35] hover:text-[#8B5CF6] transition-colors">
                  Buscador de empresas
                </Link>
              </li>
              <li>
                <Link href="/contar-mi-historia" className="text-[#211B35] hover:text-[#8B5CF6] transition-colors">
                  Confesar mi historia 👻
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openHowItWorks}
                  className="text-[#211B35] hover:text-[#8B5CF6] transition-colors cursor-pointer text-left"
                >
                  Cómo funciona & Reglas
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#777286]">
              Confidencialidad & Ética
            </h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <Link href="/privacidad" className="text-[#211B35] hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                  Aviso de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-[#211B35] hover:text-[#8B5CF6] transition-colors flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-[#FFD166]" />
                  Términos de Publicación
                </Link>
              </li>
            </ul>
            <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#211B35]/5 text-[11px] text-[#777286] leading-relaxed">
              <span className="font-bold text-[#211B35]">Aviso de demostración:</span> Los testimonios y nombres en este prototipo son ficciones inspiradas en la realidad comercial de América Latina. No representan imputaciones legales directas.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#211B35]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777286]">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>por la comunidad de emprendedores YLAI y freelancers de LatAm.</span>
          </p>
          <p className="text-center sm:text-right font-medium">
            © {new Date().getFullYear()} Empresa Deudora. Cero deudas sin aclarar.
          </p>
        </div>
      </div>
    </footer>
  );
}
