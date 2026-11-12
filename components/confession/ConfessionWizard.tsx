'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ConfessionFormData, StoryCategory, CATEGORIES } from '@/lib/types';
import { submitStory } from '@/lib/api';
import { Fanti, FantiMood, FantiHappy, FantiWorried, FantiWriter, FantiDetective } from '@/components/mascot/Fanti';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  FileText,
  Upload,
  Trash2,
  Eye,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  HelpCircle,
  AlertCircle,
  Home,
} from 'lucide-react';

const INITIAL_FORM: ConfessionFormData = {
  fullName: '',
  email: '',
  ylaiGeneration: '',
  country: 'México',
  city: '',
  companyName: '',
  companyLegalName: '',
  companyCountry: 'México',
  companyCity: '',
  companyWebsite: '',
  serviceType: '',
  amount: undefined,
  currency: 'USD',
  agreementDate: '',
  expectedPaymentDate: '',
  category: 'manana-te-pago',
  title: '',
  storyBeginning: '',
  storyAgreement: '',
  storyWhatHappened: '',
  storyCollectionAttempt: '',
  storyCurrentSituation: '',
  evidenceFiles: [],
  hasConfirmedTruth: false,
  acceptedTerms: false,
  acceptedPrivacy: false,
  signatureFullName: '',
};

export function ConfessionWizard() {
  const searchParams = useSearchParams();
  const prefillCompany = searchParams.get('empresa') || '';

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ConfessionFormData>(() => ({
    ...INITIAL_FORM,
    companyName: prefillCompany || '',
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fanti Mood per step
  const getFantiMoodForStep = (currentStep: number): { mood: FantiMood; speech: string } => {
    switch (currentStep) {
      case 1:
        return {
          mood: 'writer',
          speech: '¡Hola! Soy Fanti. Tus datos están 100% blindados conmigo.',
        };
      case 2:
        return {
          mood: 'detective',
          speech: 'A ver, ¿quién fue el que te dejó esperando el depósito?',
        };
      case 3:
        return {
          mood: 'writer',
          speech: 'Suelta todo el chisme con lujo de detalles... ¡traje palomitas!',
        };
      case 4:
        return {
          mood: 'detective',
          speech: '¿Traes los recibos? Las evidencias son confidenciales.',
        };
      case 5:
        return {
          mood: 'worried',
          speech: 'El juramento sagrado: nada de inventar fantasmas falsos.',
        };
      case 6:
        return {
          mood: 'default',
          speech: '¡Revisa cómo se verá tu testimonio antes de enviarlo!',
        };
      case 7:
        return {
          mood: 'happy',
          speech: '¡Felicidades! Fantasma capturado y listo para revisión.',
        };
      default:
        return { mood: 'default', speech: '' };
    }
  };

  const currentFanti = getFantiMoodForStep(step);

  // Field change helpers
  const updateField = <K extends keyof ConfessionFormData>(field: K, value: ConfessionFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Step Validation
  const validateStep = (currentStep: number): boolean => {
    const errs: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) errs.fullName = 'Por favor ingresa tu nombre completo.';
      if (!formData.email.trim() || !formData.email.includes('@')) {
        errs.email = 'Por favor ingresa un correo electrónico válido.';
      }
      if (!formData.country) errs.country = 'Selecciona tu país de residencia.';
    }

    if (currentStep === 2) {
      if (!formData.companyName.trim()) errs.companyName = 'Ingresa el nombre de la empresa.';
      if (!formData.serviceType.trim()) errs.serviceType = 'Indica el servicio que contrataron.';
      if (!formData.expectedPaymentDate) errs.expectedPaymentDate = 'Ingresa la fecha esperada de pago.';
    }

    if (currentStep === 3) {
      if (!formData.title.trim()) errs.title = 'Escribe un título creativo para tu historia.';
      if (!formData.storyBeginning.trim() || formData.storyBeginning.length < 20) {
        errs.storyBeginning = 'Cuéntanos un poco más sobre cómo inició el proyecto (mínimo 20 caracteres).';
      }
      if (!formData.storyWhatHappened.trim()) {
        errs.storyWhatHappened = 'Explica qué ocurrió tras la entrega.';
      }
      if (!formData.storyCollectionAttempt.trim()) {
        errs.storyCollectionAttempt = 'Detalla cómo intentaste cobrar.';
      }
    }

    if (currentStep === 5) {
      if (!formData.hasConfirmedTruth) {
        errs.hasConfirmedTruth = 'Debes confirmar que tu historia refleja fielmente tu experiencia.';
      }
      if (!formData.acceptedTerms) {
        errs.acceptedTerms = 'Debes aceptar los términos de publicación.';
      }
      if (!formData.acceptedPrivacy) {
        errs.acceptedPrivacy = 'Debes aceptar el aviso de privacidad.';
      }
      if (!formData.signatureFullName.trim()) {
        errs.signatureFullName = 'Por favor escribe tu nombre completo como firma declarativa.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(step)) return;

    if (step === 6) {
      setIsSubmitting(true);
      setSubmitError('');
      try {
        await submitStory(formData);
      } catch {
        setSubmitError('No pudimos enviar tu historia. Revisa que la API esté disponible e inténtalo de nuevo.');
        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    const nextStep = step + 1;
    setStep(nextStep);
    window.scrollTo({ top: 120, behavior: 'smooth' });

    if (nextStep === 7) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#B8F28B', '#FFD166', '#EC4899'],
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Mock file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).map((f) => ({
      id: Math.random().toString(36).substring(7),
      name: f.name,
      size: `${(f.size / 1024).toFixed(1)} KB`,
      type: f.type || 'Documento',
    }));

    setFormData((prev) => ({
      ...prev,
      evidenceFiles: [...prev.evidenceFiles, ...newFiles],
    }));
  };

  const removeFile = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((f) => f.id !== id),
    }));
  };

  const stepsTitles = [
    'Tu Identidad',
    'La Empresa',
    'El Chismecito',
    'Evidencias',
    'Juramento',
    'Vista Previa',
    'Confirmación',
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#8B5CF6] hover:text-[#7C3AED]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
        <span className="text-xs font-bold text-[#777286]">
          Paso {step} de 7: <strong className="text-[#211B35]">{stepsTitles[step - 1]}</strong>
        </span>
      </div>

      {/* Progress Bar (Gaming / Duolingo style) */}
      <div className="w-full bg-[#211B35]/10 h-3 rounded-full overflow-hidden mb-6 p-0.5">
        <div
          className="bg-gradient-to-r from-[#8B5CF6] via-[#B8F28B] to-[#FFD166] h-full rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${(step / 7) * 100}%` }}
        />
      </div>

      {/* Mascot Companion Header Box */}
      <div className="bg-white rounded-3xl border border-[#211B35]/10 p-4 sm:p-6 mb-6 flex items-center gap-4 sm:gap-6 shadow-sm">
        <div className="shrink-0">
          <Fanti
            mood={currentFanti.mood}
            size="md"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#8B5CF6] bg-[#8B5CF6]/10 px-2 py-0.5 rounded-full inline-block mb-1">
            Fanti el Guardián
          </span>
          <p className="text-xs sm:text-sm font-bold text-[#211B35] leading-snug">
            &ldquo;{currentFanti.speech}&rdquo;
          </p>
        </div>
      </div>

      {/* STEP CONTAINER */}
      <div className="bg-white rounded-3xl border border-[#211B35]/10 p-6 sm:p-10 shadow-sm min-h-[420px]">
        {/* ================= STEP 1: IDENTITY ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-1">
                <Lock className="w-4 h-4" />
                <span>Paso 1 · Privacidad Absoluta</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#211B35]">
                Primero, ¿quién eres tú?
              </h2>
              <p className="text-xs sm:text-sm text-[#777286] mt-1 leading-relaxed">
                Tu identidad se queda en privado. Solo queremos saber que detrás de esta historia hay una persona real y no un bot o competencia desleal.
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF9F6] border border-[#211B35]/10 rounded-2xl flex items-center gap-3 text-xs text-[#211B35] font-semibold">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Estos datos <strong>nunca aparecerán</strong> en tu historia pública. No te pediremos contraseña ni crearemos cuentas complicadas.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Ej. Sofía Morales Ruiz"
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium"
                />
                {errors.fullName && <p className="text-rose-500 text-[11px] font-bold">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="sofia@miestudio.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium"
                />
                {errors.email && <p className="text-rose-500 text-[11px] font-bold">{errors.email}</p>}
              </div>

              {/* YLAI Generation (Optional) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Generación YLAI (si aplica)
                </label>
                <select
                  value={formData.ylaiGeneration}
                  onChange={(e) => updateField('ylaiGeneration', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium bg-white"
                >
                  <option value="">No soy becario YLAI / Prefiero no indicar</option>
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map((year) => (
                    <option key={year} value={year.toString()}>
                      Generación YLAI {year}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#777286]">Otorga una insignia comunitaria de verificación.</p>
              </div>

              {/* Country */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Tu País de Residencia *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium bg-white"
                >
                  {['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'El Salvador', 'Guatemala', 'Uruguay', 'Costa Rica', 'Ecuador', 'Panamá', 'República Dominicana', 'Bolivia', 'Otro'].map(
                    (country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: COMPANY IDENTIFIER ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-1">
                <Building2 className="w-4 h-4" />
                <span>Paso 2 · Identificación del Sujeto</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#211B35]">
                ¿Quién te dejó esperando?
              </h2>
              <p className="text-xs sm:text-sm text-[#777286] mt-1 leading-relaxed">
                Proporciona los datos comerciales de la empresa con la que realizaste el trabajo.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Nombre comercial de la empresa *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  placeholder="Ej. Corporativo Ejemplo S.A."
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium"
                />
                {errors.companyName && <p className="text-rose-500 text-[11px] font-bold">{errors.companyName}</p>}
              </div>

              {/* Legal Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Razón social (opcional)
                </label>
                <input
                  type="text"
                  value={formData.companyLegalName}
                  onChange={(e) => updateField('companyLegalName', e.target.value)}
                  placeholder="Ej. Distribuidora del Norte S.A. de C.V."
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium"
                />
              </div>

              {/* Company Country */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  País de la empresa *
                </label>
                <select
                  value={formData.companyCountry}
                  onChange={(e) => updateField('companyCountry', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium bg-white"
                >
                  {['México', 'Colombia', 'Argentina', 'Chile', 'Perú', 'El Salvador', 'Guatemala', 'Uruguay', 'Costa Rica', 'Ecuador', 'Panamá', 'Estados Unidos', 'Otro'].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Service Type */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Tipo de servicio contratado *
                </label>
                <input
                  type="text"
                  value={formData.serviceType}
                  onChange={(e) => updateField('serviceType', e.target.value)}
                  placeholder="Ej. Desarrollo web, Branding, Consultoría..."
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium"
                />
                {errors.serviceType && <p className="text-rose-500 text-[11px] font-bold">{errors.serviceType}</p>}
              </div>

              {/* Expected Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Fecha esperada del pago *
                </label>
                <input
                  type="date"
                  value={formData.expectedPaymentDate}
                  onChange={(e) => updateField('expectedPaymentDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium bg-white"
                />
                {errors.expectedPaymentDate && (
                  <p className="text-rose-500 text-[11px] font-bold">{errors.expectedPaymentDate}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  Categoría del fantasma *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => updateField('category', e.target.value as StoryCategory)}
                  className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium bg-white"
                >
                  {Object.values(CATEGORIES).map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: THE STORY ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-1">
                <FileText className="w-4 h-4" />
                <span>Paso 3 · La Narrativa</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#211B35]">
                Ahora sí... cuéntanos TODO 🍿
              </h2>
              <p className="text-xs sm:text-sm text-[#777286] mt-1 leading-relaxed">
                Explica de manera cronológica y objetiva tu experiencia. Sé descriptivo pero respetuoso.
              </p>
            </div>

            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#211B35] block">
                Título del caso *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Ej. Me dijeron que salía el viernes... hace seis meses"
                className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium"
              />
              {errors.title && <p className="text-rose-500 text-[11px] font-bold">{errors.title}</p>}
            </div>

            {/* Prompt questions helper */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                Preguntas guía para ayudarte a estructurar:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-amber-800">
                <li>¿Qué te contrataron para hacer y qué entregaste?</li>
                <li>¿Qué pretextos dieron cuando llegó el momento de cobrar?</li>
                <li>¿Cuál es la situación actual y qué recomiendas a otros colegas?</li>
              </ul>
            </div>

            {/* Sub-narratives */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  1. ¿Cómo comenzó y qué se acordó? *
                </label>
                <textarea
                  rows={3}
                  value={formData.storyBeginning}
                  onChange={(e) => updateField('storyBeginning', e.target.value)}
                  placeholder="Nos contactaron de urgencia porque necesitaban..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm"
                />
                {errors.storyBeginning && (
                  <p className="text-rose-500 text-[11px] font-bold">{errors.storyBeginning}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  2. ¿Qué sucedió tras la entrega? *
                </label>
                <textarea
                  rows={3}
                  value={formData.storyWhatHappened}
                  onChange={(e) => updateField('storyWhatHappened', e.target.value)}
                  placeholder="Entregamos todos los archivos en tiempo y forma..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm"
                />
                {errors.storyWhatHappened && (
                  <p className="text-rose-500 text-[11px] font-bold">{errors.storyWhatHappened}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#211B35] block">
                  3. El intento de cobro y situación actual *
                </label>
                <textarea
                  rows={3}
                  value={formData.storyCollectionAttempt}
                  onChange={(e) => updateField('storyCollectionAttempt', e.target.value)}
                  placeholder="Al solicitar el pago empezaron las largas: que el sistema se cayó, que el director viajó..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm"
                />
                {errors.storyCollectionAttempt && (
                  <p className="text-rose-500 text-[11px] font-bold">{errors.storyCollectionAttempt}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: EVIDENCE ================= */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-1">
                <Upload className="w-4 h-4" />
                <span>Paso 4 · Documentación Privada</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#211B35]">
                ¿Traes los recibos? 🧾
              </h2>
              <p className="text-xs sm:text-sm text-[#777286] mt-1 leading-relaxed">
                Sube capturas de pantalla de correos, órdenes de compra, contratos o mensajes de WhatsApp.
              </p>
            </div>

            <div className="p-3.5 bg-[#FAF5FF] border border-[#8B5CF6]/30 rounded-2xl flex items-center gap-3 text-xs text-[#211B35]">
              <Lock className="w-4 h-4 text-[#8B5CF6] shrink-0" />
              <span>
                <strong>Privacidad garantizada:</strong> Las evidencias son privadas para validación interna y <strong>no se publicarán automáticamente</strong> en el sitio.
              </span>
            </div>

            {/* Drop Zone */}
            <div className="border-2 border-dashed border-[#211B35]/20 hover:border-[#8B5CF6] rounded-3xl p-8 text-center transition-colors bg-[#FAF9F6] relative">
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-[#8B5CF6] mx-auto mb-2" />
              <p className="text-sm font-bold text-[#211B35]">
                Haz clic o arrastra archivos aquí
              </p>
              <p className="text-xs text-[#777286] mt-1">
                Formatos permitidos: PDF, PNG, JPG, JPEG (Máx. 10MB por archivo)
              </p>
            </div>

            {/* Uploaded Files Preview List */}
            {formData.evidenceFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#777286]">
                  Archivos adjuntos ({formData.evidenceFiles.length})
                </h4>
                <div className="space-y-2">
                  {formData.evidenceFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 rounded-xl bg-white border border-[#211B35]/10 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                        <span className="font-semibold text-[#211B35] truncate">{file.name}</span>
                        <span className="text-[#777286] text-[11px]">({file.size})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        aria-label="Eliminar archivo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 5: DECLARATION OATH ================= */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Paso 5 · Juramento de Buena Fe</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#211B35]">
                Antes de invocar a tu fantasma... 🕯️
              </h2>
              <p className="text-xs sm:text-sm text-[#777286] mt-1 leading-relaxed">
                Empresa Deudora es un espacio de protección mutua, no de difamación sin fundamento.
              </p>
            </div>

            {/* Formal Oath Text Box */}
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#211B35]/15 text-xs text-[#211B35] leading-relaxed space-y-2">
              <p className="font-semibold italic">
                &ldquo;Declaro que la información proporcionada corresponde a una experiencia en la que participé directamente y refleja, de buena fe, mi versión de los hechos según mi conocimiento.&rdquo;
              </p>
              <p className="font-semibold italic">
                &ldquo;Reconozco que pueden existir otras versiones o circunstancias que desconozco.&rdquo;
              </p>
              <p className="font-semibold italic">
                &ldquo;Confirmo que no he incluido deliberadamente información falsa ni documentos alterados, y que mi intención es compartir mi experiencia para informar a otros emprendedores.&rdquo;
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-[#211B35] font-semibold">
                <input
                  type="checkbox"
                  checked={formData.hasConfirmedTruth}
                  onChange={(e) => updateField('hasConfirmedTruth', e.target.checked)}
                  className="mt-0.5 rounded border-[#211B35]/20 text-[#8B5CF6] focus:ring-[#8B5CF6] w-4 h-4"
                />
                <span>Confirmo que mi historia representa fielmente mi experiencia real. *</span>
              </label>
              {errors.hasConfirmedTruth && (
                <p className="text-rose-500 text-[11px] font-bold pl-7">{errors.hasConfirmedTruth}</p>
              )}

              <label className="flex items-start gap-3 cursor-pointer text-xs text-[#211B35] font-semibold">
                <input
                  type="checkbox"
                  checked={formData.acceptedTerms}
                  onChange={(e) => updateField('acceptedTerms', e.target.checked)}
                  className="mt-0.5 rounded border-[#211B35]/20 text-[#8B5CF6] focus:ring-[#8B5CF6] w-4 h-4"
                />
                <span>Acepto los términos de publicación y respeto a la comunidad. *</span>
              </label>
              {errors.acceptedTerms && (
                <p className="text-rose-500 text-[11px] font-bold pl-7">{errors.acceptedTerms}</p>
              )}

              <label className="flex items-start gap-3 cursor-pointer text-xs text-[#211B35] font-semibold">
                <input
                  type="checkbox"
                  checked={formData.acceptedPrivacy}
                  onChange={(e) => updateField('acceptedPrivacy', e.target.checked)}
                  className="mt-0.5 rounded border-[#211B35]/20 text-[#8B5CF6] focus:ring-[#8B5CF6] w-4 h-4"
                />
                <span>He leído y acepto el tratamiento confidencial de mis datos personales. *</span>
              </label>
              {errors.acceptedPrivacy && (
                <p className="text-rose-500 text-[11px] font-bold pl-7">{errors.acceptedPrivacy}</p>
              )}
            </div>

            {/* Simple Electronic Signature */}
            <div className="pt-2 border-t border-[#211B35]/10 space-y-2">
              <label className="text-xs font-bold text-[#211B35] block">
                Firma electrónica simple (escribe tu nombre completo) *
              </label>
              <input
                type="text"
                value={formData.signatureFullName}
                onChange={(e) => updateField('signatureFullName', e.target.value)}
                placeholder="Escribe tu nombre tal como en el Paso 1"
                className="w-full px-4 py-3 rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none text-sm font-medium"
              />
              {errors.signatureFullName && (
                <p className="text-rose-500 text-[11px] font-bold">{errors.signatureFullName}</p>
              )}
              <p className="text-[11px] text-[#777286]">
                Firmado por: <strong>{formData.signatureFullName || '...'}</strong> (Esta firma es confidencial y no aparecerá en la publicación).
              </p>
            </div>
          </div>
        )}

        {/* ================= STEP 6: PREVIEW ================= */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6] mb-1">
                <Eye className="w-4 h-4" />
                <span>Paso 6 · Vista Previa Pública</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#211B35]">
                Así se verá tu historia 👀
              </h2>
              <p className="text-xs sm:text-sm text-[#777286] mt-1 leading-relaxed">
                Verifica que no contenga datos confidenciales que no desees revelar. Puedes volver a editar cualquier paso.
              </p>
            </div>

            {/* Public Card Mock */}
            <div className="bg-[#FAF9F6] p-6 rounded-3xl border-2 border-[#8B5CF6]/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs text-[#777286]">
                <span className="font-bold text-[#8B5CF6]">
                  {CATEGORIES[formData.category]?.emoji} {CATEGORIES[formData.category]?.name}
                </span>
                <span>{formData.companyCountry} · Hoy</span>
              </div>

              <h3 className="text-xl font-extrabold text-[#211B35] leading-snug">
                {formData.title || 'Título de la historia'}
              </h3>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold px-2.5 py-1 bg-white border border-[#211B35]/10 rounded-lg text-[#211B35]">
                  🏢 {formData.companyName || 'Empresa'}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200">
                  Pago pendiente según el autor
                </span>
              </div>

              <div className="text-sm text-[#211B35]/90 space-y-2 border-t border-[#211B35]/10 pt-3">
                <p>
                  <strong>Inicio y acuerdo:</strong> {formData.storyBeginning || 'Detalles de inicio...'}
                </p>
                <p>
                  <strong>Qué sucedió:</strong> {formData.storyWhatHappened || 'Detalles de entrega...'}
                </p>
                <p>
                  <strong>Cobranza:</strong> {formData.storyCollectionAttempt || 'Detalles de cobro...'}
                </p>
              </div>

              {/* Author badge preview (NO PRIVATE NAME) */}
              <div className="pt-3 border-t border-[#211B35]/10 flex items-center justify-between text-xs text-[#777286]">
                <div className="flex items-center gap-1.5 font-bold text-[#211B35]">
                  <span>👻</span>
                  <span>
                    Emprendedor de {formData.country}
                    {formData.ylaiGeneration ? ` (Comunidad YLAI ${formData.ylaiGeneration})` : ''}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-600 font-bold">
                  ✓ Nombre y correo real ocultos
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 7: CONFIRMATION ================= */}
        {step === 7 && (
          <div className="text-center py-6 space-y-6">
            <FantiHappy size="lg" className="mx-auto" />

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-[#211B35]">
                ¡Tu fantasma está listo para revisión! 🎉
              </h2>
              <p className="text-sm text-[#777286] max-w-md mx-auto leading-relaxed">
                Gracias por compartir tu experiencia con la comunidad. Tu aporte ayuda a otros emprendedores a proteger su trabajo y sus finanzas.
              </p>
            </div>

            <div className="p-4 bg-[#B8F28B]/30 border border-[#B8F28B] rounded-2xl max-w-md mx-auto text-xs text-[#211B35] font-semibold space-y-1">
              <p className="font-bold">Historia recibida:</p>
              <p className="text-[11px] text-[#777286]">
                Tu testimonio fue guardado y quedó en revisión antes de aparecer públicamente en el muro.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link
                href="/#muro-historias"
                className="w-full sm:w-auto px-6 py-3 bg-[#8B5CF6] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#7C3AED] transition-all"
              >
                Volver al muro de historias 🍿
              </Link>
              <Link
                href="/#buscador"
                className="w-full sm:w-auto px-6 py-3 bg-white text-[#211B35] font-bold text-sm rounded-xl border border-[#211B35]/15 hover:bg-[#FAF9F6] transition-all"
              >
                Buscar empresas 🏢
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER CONTROLS */}
      {step < 7 && (
        <div className="flex items-center justify-between gap-4 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#211B35]/15 text-[#211B35] font-bold text-sm hover:bg-white transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-60 text-white font-bold text-sm shadow-md transition-all active:scale-95 ml-auto"
          >
            <span>{isSubmitting ? 'Enviando...' : step === 6 ? 'Enviar mi historia para revisión 👻' : 'Continuar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
      {submitError && <p className="mt-3 text-right text-xs font-semibold text-rose-600">{submitError}</p>}
    </div>
  );
}
