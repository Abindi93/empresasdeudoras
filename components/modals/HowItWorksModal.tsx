'use client';

import React, { useState, useEffect } from 'react';
import { Fanti } from '@/components/mascot/Fanti';
import { ShieldCheck, Eye, Scale, Sparkles } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowItWorksModal({ isOpen, onClose }: HowItWorksModalProps) {
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAcceptAndGo = () => {
    onClose();
    // Smooth scroll to story feed
    const feed = document.getElementById('muro-historias');
    if (feed) {
      feed.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rules = [
    {
      icon: Eye,
      title: '1. Cero fricción para leer',
      desc: 'Explora testimonios y busca empresas de forma inmediata. No te pediremos contraseña ni crear cuentas.',
      color: '#8B5CF6',
    },
    {
      icon: ShieldCheck,
      title: '2. Tu identidad queda 100% blindada',
      desc: 'Si decides confesar una experiencia, tu nombre real y correo se resguardan en privado para evitar represalias.',
      color: '#10B981',
    },
    {
      icon: Scale,
      title: '3. Experiencias reales y de buena fe',
      desc: 'No permitimos campañas de difamación ni inventar fantasmas falsos. Todo testimonio debe ser verídico.',
      color: '#F59E0B',
    },
    {
      icon: Sparkles,
      title: '4. Derecho a réplica y Final Feliz',
      desc: 'Las empresas pueden presentar su postura. Y si pagan la deuda... ¡lo celebramos con mariachis y final feliz!',
      color: '#EC4899',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#211B35]/60 backdrop-blur-sm animate-fadeIn"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border border-[#211B35]/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-[#211B35] animate-scaleUp"
      >
        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="shrink-0">
            <Fanti mood="writer" size="sm" animate={true} className="w-12 h-12" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full inline-block mb-0.5">
              Aviso de entrada
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#211B35] tracking-tight">
              Antes de entrar a Empresa Deudora 👻
            </h2>
          </div>
        </div>

        {/* Short Rules List */}
        <div className="space-y-3 mb-6">
          {rules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#211B35]/8 flex items-start gap-3 text-xs"
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-white"
                  style={{ backgroundColor: rule.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[#211B35] text-xs">
                    {rule.title}
                  </h4>
                  <p className="text-[#777286] leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Checkbox agreement */}
        <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 mb-5 cursor-pointer text-xs font-semibold text-amber-950 select-none">
          <input
            type="checkbox"
            checked={hasAgreed}
            onChange={(e) => setHasAgreed(e.target.checked)}
            className="w-4 h-4 rounded text-[#8B5CF6] focus:ring-[#8B5CF6] border-amber-300"
          />
          <span>Confirmo que soy mayor de 18 años y que entiendo las reglas de la comunidad.</span>
        </label>

        {/* Action Button: Required exact copy */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleAcceptAndGo}
            disabled={!hasAgreed}
            className="w-full py-3.5 px-5 bg-[#8B5CF6] hover:bg-[#7C3AED] active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-[0_4px_16px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2"
          >
            <span>Acepto las reglas y soy mayor de 18 años</span>
            <span>🍿</span>
          </button>

          <p className="text-[11px] text-center text-[#777286]">
            Marca la casilla para continuar
          </p>
        </div>
      </div>
    </div>
  );
}
