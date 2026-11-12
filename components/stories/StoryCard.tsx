'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Story, StoryComment, CATEGORIES, STATUS_MAP } from '@/lib/types';
import {
  MessageSquare,
  Share2,
  Check,
  Calendar,
  MapPin,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const [copied, setCopied] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<StoryComment[]>(story.comments);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Reactions state
  const [reactions, setReactions] = useState(story.reactions);
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  const categoryInfo = CATEGORIES[story.category];
  const statusInfo = STATUS_MAP[story.status];

  const handleReactionClick = (key: keyof typeof reactions) => {
    const isAlreadyVoted = !!userVoted[key];
    setUserVoted((prev) => ({ ...prev, [key]: !isAlreadyVoted }));
    setReactions((prev) => ({
      ...prev,
      [key]: prev[key] + (isAlreadyVoted ? -1 : 1),
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const added: StoryComment = {
      id: `c-user-${Date.now()}`,
      author: newAuthor.trim() || 'Emprendedor Anónimo',
      date: 'Justo ahora',
      badge: 'Comunidad',
      text: newCommentText.trim(),
      likes: 1,
    };

    setCommentsList((prev) => [added, ...prev]);
    setNewCommentText('');
    setNewAuthor('');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const storyUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/historias/${story.slug}`
      : `/historias/${story.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.title} - Empresa Deudora`,
          text: `Mira este testimonio sobre ${story.companyName}: "${story.excerpt}"`,
          url: storyUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(storyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="w-full rounded-2xl border border-[#211B35]/10 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(33,27,53,0.08)] sm:p-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-[#777286]">
        <span className="text-[#8B5CF6]">{categoryInfo?.emoji} {categoryInfo?.name}</span>
        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{story.city}, {story.country}</span>
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{story.publishedAt}</span>
      </div>

      <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-[#211B35] transition-colors hover:text-[#8B5CF6] sm:text-2xl">
        <Link href={`/historias/${story.slug}`}>{story.title}</Link>
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#211B35]/75 sm:text-lg">
        &ldquo;{story.excerpt}&rdquo;
      </p>

      <details className="mt-4 text-xs text-[#777286]">
        <summary className="cursor-pointer font-bold hover:text-[#211B35]">Ver detalles del caso</summary>
        <p className="mt-2 leading-relaxed">
          {story.serviceType}
          {story.amount && <> · ${story.amount.toLocaleString()} {story.currency}</>}
          {' · '}Pago esperado: {story.expectedPaymentDate}
        </p>
      </details>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#211B35]/8 pt-4">
        <div className="flex flex-wrap items-center gap-1.5" aria-label="Reacciones">
          <span className="mr-1 text-[11px] font-bold text-[#777286]">Reacciona</span>
            <button
              type="button"
              onClick={() => handleReactionClick('represents')}
              aria-pressed={!!userVoted.represents}
              className={`inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm transition-all duration-150 active:scale-95 ${
                userVoted.represents
                  ? 'bg-indigo-100 ring-1 ring-indigo-300'
                  : 'bg-[#FAF9F6] hover:bg-indigo-50'
              }`}
              title="Me representa / Me ha pasado"
            >
              <span>🙋‍♂️</span>
              <span className="text-xs font-extrabold text-indigo-700">{reactions.represents}</span>
            </button>

            <button
              type="button"
              onClick={() => handleReactionClick('angry')}
              aria-pressed={!!userVoted.angry}
              className={`inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm transition-all duration-150 active:scale-95 ${
                userVoted.angry
                  ? 'bg-rose-100 ring-1 ring-rose-300'
                  : 'bg-[#FAF9F6] hover:bg-rose-50'
              }`}
              title="Indignante"
            >
              <span>😡</span>
              <span className="text-xs font-extrabold text-rose-700">{reactions.angry}</span>
            </button>

            <button
              type="button"
              onClick={() => handleReactionClick('popcorn')}
              aria-pressed={!!userVoted.popcorn}
              className={`inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm transition-all duration-150 active:scale-95 ${
                userVoted.popcorn
                  ? 'bg-amber-100 ring-1 ring-amber-300'
                  : 'bg-[#FAF9F6] hover:bg-amber-50'
              }`}
              title="Buen chisme"
            >
              <span>🍿</span>
              <span className="text-xs font-extrabold text-amber-800">{reactions.popcorn}</span>
            </button>

            <button
              type="button"
              onClick={() => handleReactionClick('ghost')}
              aria-pressed={!!userVoted.ghost}
              className={`inline-flex h-9 items-center gap-1 rounded-lg px-2 text-sm transition-all duration-150 active:scale-95 ${
                userVoted.ghost
                  ? 'bg-purple-100 ring-1 ring-purple-300'
                  : 'bg-[#FAF9F6] hover:bg-purple-50'
              }`}
              title="Fantasma total"
            >
              <span>👻</span>
              <span className="text-xs font-extrabold text-purple-700">{reactions.ghost}</span>
            </button>
        </div>

        <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              aria-label={`${showComments ? 'Ocultar' : 'Ver'} comentarios`}
              className={`inline-flex h-9 items-center gap-1 rounded-lg px-2 text-xs font-bold transition-colors ${
                showComments
                  ? 'bg-[#8B5CF6]/15 text-[#8B5CF6]'
                  : 'text-[#777286] hover:bg-[#FAF9F6] hover:text-[#211B35]'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{commentsList.length}</span>
              {showComments ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#777286] transition-colors hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]"
              title="Compartir"
              aria-label="Compartir historia"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Full Story Link */}
            <Link
              href={`/historias/${story.slug}`}
              className="ml-1 text-xs font-extrabold text-[#8B5CF6] transition-colors hover:text-[#7C3AED]"
            >
              Leer historia →
            </Link>
          </div>
        </div>

      <div className="mt-3 text-[11px] text-[#777286]">
        <Link href={`/empresas/${story.companyId}`} className="font-bold text-[#777286] hover:text-[#8B5CF6]">
          {story.companyName}
        </Link>
        <span aria-hidden="true"> · </span>
        <span>{statusInfo.label}</span>
        <span aria-hidden="true"> · </span>
        <span>{story.author.displayName}</span>
      </div>

      {showComments && (
          <div className="mt-5 pt-4 border-t border-[#211B35]/10 space-y-4 animate-fadeIn">
            {/* Add new comment form */}
            <form onSubmit={handleAddComment} className="p-3.5 bg-[#FAF9F6] rounded-2xl border border-[#211B35]/10 space-y-2.5">
              <span className="text-xs font-bold text-[#211B35] block">
                Deja tu comentario en este chisme:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Tu apodo / rol (ej. Freelancer CDMX)"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="px-3 py-2 text-xs bg-white rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none font-medium"
                />
                <input
                  type="text"
                  placeholder="¿Qué opinas o qué te pasó a ti?..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 text-xs bg-white rounded-xl border border-[#211B35]/15 focus:border-[#8B5CF6] outline-none font-medium"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all active:scale-95"
                >
                  <Send className="w-3 h-3" />
                  <span>Publicar comentario</span>
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {commentsList.map((comm) => (
                <div
                  key={comm.id}
                  className="p-3 rounded-xl bg-white border border-[#211B35]/8 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[#777286]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#211B35]">{comm.author}</span>
                      {comm.badge && (
                        <span className="text-[10px] font-bold text-[#8B5CF6] bg-[#8B5CF6]/10 px-1.5 py-0.2 rounded">
                          {comm.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px]">{comm.date}</span>
                  </div>
                  <p className="text-[#211B35]/90 font-normal leading-relaxed">
                    {comm.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
    </article>
  );
}
