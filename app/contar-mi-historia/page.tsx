import { Suspense } from 'react';
import { Metadata } from 'next';
import { ConfessionWizard } from '@/components/confession/ConfessionWizard';

export const metadata: Metadata = {
  title: 'Contar mi historia 👻 | Confesionario de Empresa Deudora',
  description: 'Comparte tu testimonio de cobranza de forma confidencial y segura. Protegemos tu identidad mientras ayudas a la comunidad.',
};

export default function ContarMiHistoriaPage() {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="max-w-3xl mx-auto px-4 py-16 text-center text-sm font-semibold text-[#777286]">
            Cargando confesionario... 👻
          </div>
        }
      >
        <ConfessionWizard />
      </Suspense>
    </div>
  );
}
