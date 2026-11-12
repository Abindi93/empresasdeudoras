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
