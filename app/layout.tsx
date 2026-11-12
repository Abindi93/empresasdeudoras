import type { Metadata } from 'next';
import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HowItWorksProvider } from '@/components/modals/HowItWorksContext';
import { SearchProvider } from '@/components/search/SearchContext';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Empresa Deudora 👻 | Los fantasmas existen. Algunos tienen departamento de finanzas.',
  description: 'Historias de emprendedores que entregaron su trabajo, confiaron en una promesa... y terminaron persiguiendo un pago. Comunidad de alerta y chismecito empresarial.',
  openGraph: {
    title: 'Empresa Deudora 👻 | El chismecito empresarial',
    description: 'Historias que todo emprendedor quisiera haber leído antes de firmar. Comunidad independiente contra el incumplimiento de pagos.',
    type: 'website',
    locale: 'es_LA',
    siteName: 'Empresa Deudora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empresa Deudora 👻 | Los fantasmas existen',
    description: 'Historias reales de pagos que nunca llegaron. Porque el verdadero terror es: "ya lo pasamos a contabilidad".',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Empresa Deudora',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'All',
              description: 'Plataforma comunitaria de historias y experiencias de pago para emprendedores y freelancers.',
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#211B35] font-sans antialiased selection:bg-[#B8F28B] selection:text-[#211B35]" suppressHydrationWarning>
        <HowItWorksProvider>
          <SearchProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SearchProvider>
        </HowItWorksProvider>
      </body>
    </html>
  );
}
