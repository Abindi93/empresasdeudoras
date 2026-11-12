import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { MOCK_COMPANIES } from '../../lib/mock-data/companies.js';
import { MOCK_STORIES } from '../../lib/mock-data/stories.js';
import type { StorySubmission } from './types.js';

const dataDirectory = path.join(process.cwd(), 'data');
const submissionsFile = path.join(dataDirectory, 'submissions.json');

export type StorySort = 'recientes' | 'comentadas' | 'pendientes' | 'resueltas';

export interface StoryQuery {
  q?: string;
  category?: string;
  country?: string;
  city?: string;
  sort?: StorySort;
}

export type SubmissionStatus = StorySubmission['status'];

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

function submissionToStory(submission: StorySubmission) {
  const slug = `${submission.title
    .toLocaleLowerCase('es-MX')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}-${submission.id.slice(0, 8)}`;

  return {
    id: `submission-${submission.id}`,
    slug,
    title: submission.title,
    companyId: `submission-company-${submission.id}`,
    companyName: submission.companyName,
    companyLegalName: submission.companyLegalName || undefined,
    category: submission.category,
    country: submission.companyCountry,
    countryCode: '',
    city: submission.companyCity,
    excerpt: submission.storyWhatHappened.slice(0, 220),
    content: {
      beginning: submission.storyBeginning,
      agreement: submission.storyAgreement || 'Sin detalles adicionales del acuerdo.',
      whatHappened: submission.storyWhatHappened,
      collectionAttempt: submission.storyCollectionAttempt,
      currentSituation: submission.storyCurrentSituation || 'Testimonio publicado recientemente.',
    },
    amount: submission.amount,
    currency: submission.currency,
    serviceType: submission.serviceType,
    agreementDate: submission.agreementDate || '',
    expectedPaymentDate: submission.expectedPaymentDate,
    publishedAt: submission.reviewedAt || submission.receivedAt,
    status: 'pendiente' as const,
    commentsCount: 0,
    reactions: { ghost: 0, angry: 0, popcorn: 0, represents: 0 },
    author: {
      displayName: 'Miembro de la comunidad',
      ylaiVerified: false,
      generation: submission.ylaiGeneration ? Number(submission.ylaiGeneration) : undefined,
    },
    comments: [],
  };
}

export async function listStories(query: StoryQuery) {
  const approvedSubmissions = (await readSubmissions())
    .filter((submission) => submission.status === 'approved')
    .map(submissionToStory);
  const allStories = [...MOCK_STORIES, ...approvedSubmissions];
  const normalizedQuery = query.q?.trim().toLocaleLowerCase('es-MX');
  const stories = allStories.filter((story) => {
    if (query.category && story.category !== query.category) return false;
    if (query.country && story.country !== query.country) return false;
    if (query.city && story.city !== query.city) return false;

    if (normalizedQuery) {
      const searchable = [
        story.title,
        story.companyName,
        story.excerpt,
        story.country,
        story.city,
        story.serviceType,
      ].join(' ').toLocaleLowerCase('es-MX');
      if (!searchable.includes(normalizedQuery)) return false;
    }

    if (query.sort === 'pendientes') {
      return story.status === 'pendiente' || story.status === 'en-disputa';
    }
    if (query.sort === 'resueltas') {
      return story.status === 'pagado' || story.status === 'acuerdo';
    }
    return true;
  });

  return clone(stories).sort((left, right) => {
    if (query.sort === 'comentadas') return right.commentsCount - left.commentsCount;
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}

export function findStory(slug: string) {
  const story = MOCK_STORIES.find((item) => item.slug === slug);
  return story ? clone(story) : undefined;
}

export function listCompanies() {
  return clone(MOCK_COMPANIES);
}

export function findCompany(slug: string) {
  const company = MOCK_COMPANIES.find((item) => item.slug === slug);
  return company ? clone(company) : undefined;
}

export function listCompanyStories(slug: string) {
  return clone(MOCK_STORIES.filter((story) => story.companyId === slug || story.companyName === findCompany(slug)?.commercialName));
}

async function readSubmissions(): Promise<StorySubmission[]> {
  try {
    const file = await readFile(submissionsFile, 'utf8');
    return JSON.parse(file) as StorySubmission[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    return [];
  }
}

export async function listSubmissions(status?: SubmissionStatus) {
  const submissions = await readSubmissions();
  return clone(status ? submissions.filter((submission) => submission.status === status) : submissions)
    .sort((left, right) => new Date(right.receivedAt).getTime() - new Date(left.receivedAt).getTime());
}

export async function saveSubmission(submission: Omit<StorySubmission, 'id' | 'status' | 'receivedAt'>) {
  const submissions = await readSubmissions();
  const storedSubmission: StorySubmission = {
    ...submission,
    id: randomUUID(),
    status: 'pending-review',
    receivedAt: new Date().toISOString(),
  };

  await mkdir(dataDirectory, { recursive: true });
  await writeFile(submissionsFile, JSON.stringify([...submissions, storedSubmission], null, 2), 'utf8');
  return storedSubmission;
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  reviewedBy: string,
) {
  const submissions = await readSubmissions();
  const index = submissions.findIndex((submission) => submission.id === id);
  if (index === -1) return undefined;

  const updatedSubmission: StorySubmission = {
    ...submissions[index],
    status,
    reviewedAt: new Date().toISOString(),
    reviewedBy,
  };
  submissions[index] = updatedSubmission;

  await mkdir(dataDirectory, { recursive: true });
  await writeFile(submissionsFile, JSON.stringify(submissions, null, 2), 'utf8');
  return updatedSubmission;
}
