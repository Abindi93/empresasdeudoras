import { Metadata } from 'next';
import Link from 'next/link';
import { Fanti, FantiDetective, FantiHappy, FantiWorried } from '@/components/mascot/Fanti';
import {
  ShieldCheck,
  Eye,
  FileCheck,
  Scale,
  Sparkles,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo funciona | Empresa Deudora 👻',
  description: 'Conoce los principios, reglas comunitarias y el proceso de publicación ética de testimonios en Empresa Deudora.',
};

export default function ComoFuncionaPage() {
  const steps = [
    {
      num: '01',
      title: 'Confiesa tu experiencia',
      desc: 'Completas el confesionario interactivo. Proporcionas detalles de buena fe y evidencias privadas de respaldo.',
      fanti: 'writer' as const,
    },
    {
      num: '02',
      title: 'Revisión y anonimización',
      desc: 'Moderadores comunitarios verifican que la historia cumpla con las pautas de respeto y protegen al 100% tu identidad personal.',
      fanti: 'detective' as const,
    },
    {
      num: '03',
      title: 'Publicación en el muro',
      desc: 'El testimonio se publica en el feed público con su categoría narrativa para que otros emprendedores puedan informarse.',
      fanti: 'default' as const,
    },
    {
      num: '04',
      title: 'Derecho a réplica y resolución',
      desc: 'La empresa puede presentar su versión oficial o acordar un plan de pagos. Si pagan, ¡el caso se actualiza a Final Feliz!',
      fanti: 'happy' as const,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Reglas de la Comunidad</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#211B35] tracking-tight">
          Cómo funciona Empresa Deudora 👻
        </h1>
        <p className="text-base sm:text-lg text-[#777286] font-medium leading-relaxed">
          Nuestra misión no es destruir reputaciones, sino visibilizar la realidad de la cobranza en América Latina y fomentar que los acuerdos comerciales se cumplan.
        </p>
      </div>

      {/* 4 Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((st) => (
          <div
            key={st.num}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-[#211B35]/10 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-[#8B5CF6]/50">
                  {st.num}
                </span>
                <Fanti mood={st.fanti} size="sm" animate={false} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-[#211B35] mb-2">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#777286] leading-relaxed">
                {st.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pillars of Integrity */}
      <div className="bg-white rounded-3xl border border-[#211B35]/10 p-8 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl font-extrabold text-[#211B35]">
          Nuestros 5 Principios Fundamentales
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className="font-bold text-base text-[#211B35] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#8B5CF6]" />
              1. Cero fricción para leer
            </h4>
            <p className="text-[#777286] leading-relaxed">
              Cualquier persona puede buscar empresas y leer historias completas sin crear cuentas ni ingresar datos bancarios.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-base text-[#211B35] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
              2. Identidad blindada
            </h4>
            <p className="text-[#777286] leading-relaxed">
              Tus datos de verificación (nombre, correo) permanecen en confidencialidad absoluta para evitar represalias comerciales.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-base text-[#211B35] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#8B5CF6]" />
              3. Neutralidad y derecho a réplica
            </h4>
            <p className="text-[#777286] leading-relaxed">
              No etiquetamos a empresas como delincuentes ni asignamos puntajes arbitrarios. Toda empresa mencionada tiene derecho a publicar su respuesta.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-base text-[#211B35] flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#8B5CF6]" />
              4. Juramento de buena fe
            </h4>
            <p className="text-[#777286] leading-relaxed">
              Exigimos una declaración bajo palabra de honor y evidencias documentales privadas antes de autorizar cualquier publicación.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-[#211B35]">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#211B35]/10">
            <h4 className="font-bold text-sm text-[#211B35] mb-1">
              ¿Qué pasa si la empresa finalmente me paga?
            </h4>
            <p className="text-xs text-[#777286] leading-relaxed">
              ¡Celebramos contigo! El autor puede notificar la resolución y la historia se actualizará de inmediato con el estatus <strong>Pago recibido 🎉</strong> o <strong>Final feliz</strong>, demostrando que la empresa resolvió la situación.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#211B35]/10">
            <h4 className="font-bold text-sm text-[#211B35] mb-1">
              ¿Por qué no piden login ni contraseña?
            </h4>
            <p className="text-xs text-[#777286] leading-relaxed">
              Creemos que el conocimiento preventivo debe ser universal y gratuito. La barrera del login reduce la velocidad con la que un emprendedor puede informarse antes de firmar un contrato riesgoso.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#211B35]/10">
            <h4 className="font-bold text-sm text-[#211B35] mb-1">
              ¿Soy representante de una empresa mencionada, cómo respondo?
            </h4>
            <p className="text-xs text-[#777286] leading-relaxed">
              Cada perfil de historia cuenta con una sección dedicada a la réplica empresarial. Envía un correo institucional con el comprobante de pago o postura oficial a la mesa de aclaraciones.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white p-8 rounded-3xl text-center space-y-4 shadow-lg">
        <h3 className="text-2xl font-extrabold">
          ¿Tienes una factura que se volvió fantasma?
        </h3>
        <p className="text-xs sm:text-sm text-white/90 max-w-md mx-auto leading-relaxed">
          Tu historia puede evitar que otro colega freelance pase meses esperando un depósito que nunca llegará.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/#muro-historias"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#B8F28B] text-[#211B35] font-extrabold text-sm rounded-xl shadow-md hover:bg-[#a6ec73] transition-all"
          >
            <span>He leído y acepto las reglas, ir al chismecito</span>
            <span>🍿</span>
          </Link>
          <Link
            href="/contar-mi-historia"
            className="inline-flex items-center gap-2 px-5 py-3.5 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-xl transition-all"
          >
            <span>Ir al confesionario 👻</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
