'use client';

import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/home/Hero';
import { StoryFeed } from '@/components/stories/StoryFeed';
import { fetchStories } from '@/lib/api';
import { MOCK_STORIES } from '@/lib/mock-data/stories';
import type { Story } from '@/lib/types';
import { useSiteSearch } from '@/components/search/SearchContext';

export function HomeFeedContainer() {
  const { isSearchOpen, searchTerm, setSearchTerm } = useSiteSearch();
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);

  useEffect(() => {
    const controller = new AbortController();

    fetchStories(controller.signal)
      .then(setStories)
      // The UI remains usable with seed data when the local API has not started yet.
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <div className="w-full">
      {isSearchOpen && <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />}
      <StoryFeed initialStories={stories} searchFilter={searchTerm} />
    </div>
  );
}
