import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_COMPANIES } from '@/lib/mock-data/companies';
import { MOCK_STORIES } from '@/lib/mock-data/stories';
import { CompanyProfile } from '@/components/companies/CompanyProfile';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = MOCK_COMPANIES.find((c) => c.slug === slug || c.id === slug);

  if (!company) {
    return {
      title: 'Empresa no encontrada | Empresa Deudora',
    };
  }

  return {
    title: `${company.commercialName} – Historias y Casos | Empresa Deudora 👻`,
    description: `Reportes comunitarios, historias de pago y casos registrados sobre ${company.commercialName} en Empresa Deudora.`,
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { slug } = await params;
  const company = MOCK_COMPANIES.find((c) => c.slug === slug || c.id === slug);

  if (!company) {
    notFound();
  }

  const stories = MOCK_STORIES.filter((s) => s.companyId === company.id || s.companyName.toLowerCase() === company.commercialName.toLowerCase());

  return (
    <div className="w-full py-8 sm:py-12">
      <CompanyProfile company={company} stories={stories} />
    </div>
  );
}
