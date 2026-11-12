import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MOCK_STORIES } from '@/lib/mock-data/stories';
import { StoryDetail } from '@/components/stories/StoryDetail';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = MOCK_STORIES.find((s) => s.slug === slug);

  if (!story) {
    return {
      title: 'Historia no encontrada | Empresa Deudora',
    };
  }

  return {
    title: `${story.title} | Empresa Deudora 👻`,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} | Empresa Deudora 👻`,
      description: story.excerpt,
      type: 'article',
      publishedTime: story.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description: story.excerpt,
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = MOCK_STORIES.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  // Get related stories (same category or company)
  const relatedStories = MOCK_STORIES.filter(
    (s) => s.id !== story.id && (s.category === story.category || s.companyId === story.companyId)
  ).slice(0, 3);

  return (
    <div className="w-full py-8 sm:py-12">
      <StoryDetail story={story} relatedStories={relatedStories} />
    </div>
  );
}
