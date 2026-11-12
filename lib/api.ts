import type { ConfessionFormData, Story } from '@/lib/types';

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000').replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchStories(signal?: AbortSignal) {
  return request<Story[]>('/api/stories', { signal });
}

export function submitStory(data: ConfessionFormData) {
  return request<{ id: string; status: 'pending-review'; receivedAt: string }>('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export type SubmissionReviewStatus = 'pending-review' | 'approved' | 'rejected';

export interface AdminSubmission {
  id: string;
  status: SubmissionReviewStatus;
  receivedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  fullName: string;
  email: string;
  country: string;
  city: string;
  companyName: string;
  companyLegalName?: string;
  companyCountry: string;
  companyCity: string;
  serviceType: string;
  amount?: number;
  currency: string;
  agreementDate?: string;
  expectedPaymentDate: string;
  category: string;
  title: string;
  storyBeginning: string;
  storyAgreement?: string;
  storyWhatHappened: string;
  storyCollectionAttempt: string;
  storyCurrentSituation?: string;
  evidenceFiles: Array<{ id: string; name: string; size: string; type: string }>;
}

function adminHeaders(credentials: string) {
  return {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json',
  };
}

async function adminRequest<T>(path: string, credentials: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      ...adminHeaders(credentials),
      ...init?.headers,
    },
  });

  if (!response.ok) throw new Error(`Admin request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export function fetchAdminSubmissions(credentials: string, status?: SubmissionReviewStatus) {
  const query = status ? `?status=${status}` : '';
  return adminRequest<AdminSubmission[]>(`/api/admin/submissions${query}`, credentials);
}

export function updateSubmissionReview(
  credentials: string,
  id: string,
  status: SubmissionReviewStatus,
) {
  return adminRequest<AdminSubmission>(`/api/admin/submissions/${id}`, credentials, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}
