import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, UserCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | Empresa Deudora 👻',
  description: 'Tratamiento y protección de datos personales de emprendedores y autores en Empresa Deudora.',
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6] hover:text-[#7C3AED] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#211B35]">
          Aviso de Privacidad & Protección de Datos 🛡️
        </h1>
        <p className="text-sm text-[#777286] mt-2">
          Última actualización: Noviembre 2026
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#211B35]/10 shadow-sm space-y-6 text-sm text-[#211B35]/90 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#8B5CF6]" />
            1. Compromiso de confidencialidad del autor
          </h2>
          <p>
            En Empresa Deudora entendemos que compartir experiencias de impago puede conllevar temores legítimos a represalias comerciales o personales. Por ello, la plataforma opera bajo el principio de <strong>separación estricta de datos</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#777286]">
            <li>Tu nombre real completo, dirección de correo electrónico y número de teléfono <strong>nunca son mostrados públicamente</strong>.</li>
            <li>En el muro público solo se despliega un identificador genérico (ej. &ldquo;Emprendedor de Diseño&rdquo;) y, si autorizaste, tu pertenencia comunitaria a la red YLAI.</li>
            <li>Los documentos adjuntados como evidencia (órdenes de compra, facturas, estados de cuenta) se conservan en un repositorio privado de validación y jamás se publican de forma abierta.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-[#8B5CF6]" />
            2. Cero cookies invasivas ni perfiles de usuario
          </h2>
          <p>
            No comercializamos datos con intermediarios publicitarios, no exigimos registro obligatorio con redes sociales ni mantenemos perfiles biométricos. Los testimonios se leen con total libertad y anonimato.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#8B5CF6]" />
            3. Finalidad del tratamiento de datos
          </h2>
          <p>
            Los datos personales recabados en el confesionario tienen como únicos propósitos:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-[#777286]">
            <li>Verificar que detrás del relato existe un profesional humano real y evitar campañas de desprestigio coordinadas por competidores.</li>
            <li>Contactarte de manera confidencial en caso de que la empresa involucrada solicite una mesa de conciliación o presente una propuesta formal de pago.</li>
            <li>Notificarte sobre actualizaciones del estatus de tu caso.</li>
          </ol>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8B5CF6]" />
            4. Modificación o retiro de testimonios
          </h2>
          <p>
            Si alcanzaste un acuerdo satisfactorio con la empresa o recibiste el pago íntegro de la deuda y deseas archivar o actualizar tu historia, puedes solicitarlo en cualquier momento acreditando tu correo de registro original.
          </p>
        </div>
      </div>
    </div>
  );
}
