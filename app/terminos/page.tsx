import { Metadata } from 'next';
import Link from 'next/link';
import { AlertCircle, Scale, CheckSquare, MessageCircle, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Empresa Deudora 👻',
  description: 'Condiciones de uso, juramento de veracidad y reglas de publicación en Empresa Deudora.',
};

export default function TerminosPage() {
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
          Términos de Publicación y Convivencia 📜
        </h1>
        <p className="text-sm text-[#777286] mt-2">
          Normas para una comunidad transparente, respetuosa y libre de fantasmas financieros.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#211B35]/10 shadow-sm space-y-6 text-sm text-[#211B35]/90 leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#8B5CF6]" />
            1. Buena fe y veracidad obligatoria
          </h2>
          <p>
            Al compartir una historia a través del confesionario, el usuario declara bajo protesta de decir verdad que:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#777286]">
            <li>Participó directamente en la relación contractual o comercial descrita.</li>
            <li>El relato refleja fielmente los hechos ocurridos sin omisión dolosa de pagos ya recibidos ni acuerdos previos concluidos.</li>
            <li>No actúa por encargo de un competidor mercantil ni con fines de extorsión o desprestigio concertado.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#8B5CF6]" />
            2. Naturaleza informativa y no sancionatoria
          </h2>
          <p>
            Empresa Deudora es una plataforma ciudadana independiente de difusión testimonial. Los contenidos publicados no constituyen sentencias judiciales, determinaciones tributarias ni dictámenes bancarios. Corresponde a cada usuario evaluar de forma libre la pertinencia de las opiniones compartidas.
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#8B5CF6]" />
            3. Estilo narrativo y uso del humor
          </h2>
          <p>
            Alentamos el uso del humor y la ironía cotidiana (&ldquo;el mañana te pago&rdquo;, &ldquo;el token bloqueado&rdquo;) para desdramatizar situaciones difíciles de cobranza. No obstante, está estrictamente prohibido:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#777286]">
            <li>El uso de insultos racistas, sexistas, amenazas de violencia o divulgación de datos personales de empleados individuales (doxxing).</li>
            <li>Compartir información confidencial de clientes que vulnere secretos industriales no relacionados con la controversia de pago.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-[#FFD166]" />
            4. Protocolo de réplica empresarial
          </h2>
          <p>
            Cualquier empresa mencionada tiene derecho a publicar su versión de los hechos o desmentir afirmaciones mediante la presentación de comprobantes de pago o acuerdos de finiquito. Una vez verificado el cumplimiento del pago, el caso será etiquetado como <strong>Pago recibido 🎉</strong> o archivado de común acuerdo.
          </p>
        </div>
      </div>
    </div>
  );
}
