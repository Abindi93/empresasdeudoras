'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Story, StoryComment, CATEGORIES, STATUS_MAP } from '@/lib/types';
import {
  MessageSquare,
  Share2,
  Check,
  ExternalLink,
  Calendar,
  MapPin,
  BadgeCheck,
  Send,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
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
    <article className="w-full bg-white rounded-2xl border border-[#211B35]/12 hover:border-[#8B5CF6]/40 p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] relative overflow-hidden">
      {/* Category colored left accent stripe */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1.5"
        style={{ backgroundColor: categoryInfo?.color || '#8B5CF6' }}
      />

      <div className="pl-2 sm:pl-3">
        {/* Row 1: Header metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#777286] mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-[#8B5CF6] flex items-center gap-1.5">
              <span>{categoryInfo?.emoji}</span>
              <span>{categoryInfo?.name}</span>
            </span>

            <span aria-hidden="true" className="text-[#211B35]/20">·</span>

            {/* Company Link */}
            <Link
              href={`/empresas/${story.companyId}`}
              className="inline-flex items-center gap-1 font-bold text-[#211B35] bg-[#FAF9F6] hover:bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-lg border border-[#211B35]/10 hover:border-[#8B5CF6]/30 transition-colors"
            >
              <span>🏢</span>
              <span>{story.companyName}</span>
              <ExternalLink className="w-3 h-3 text-[#777286]" />
            </Link>

            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
          </div>

          {/* Location & Date */}
          <div className="flex items-center gap-3 text-xs text-[#777286]">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8B5CF6]" />
              {story.city}, {story.country}
            </span>
            <span aria-hidden="true" className="text-[#211B35]/20">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {story.publishedAt}
            </span>
          </div>
        </div>

        {/* Row 2: Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-[#211B35] hover:text-[#8B5CF6] transition-colors leading-snug mb-2.5">
          <Link href={`/historias/${story.slug}`}>
            {story.title}
          </Link>
        </h3>

        {/* Row 3: Narrative Excerpt */}
        <p className="text-sm text-[#211B35]/85 leading-relaxed mb-4">
          &ldquo;{story.excerpt}&rdquo;
        </p>

        {/* Row 4: Author & Case Key Info Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-3 border-t border-[#211B35]/8 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#FAF5FF] border border-[#8B5CF6]/30 flex items-center justify-center text-xs font-bold text-[#8B5CF6]">
              👻
            </div>
            <div>
              <span className="font-bold text-[#211B35]">{story.author.displayName}</span>
              {story.author.ylaiVerified && (
                <span className="ml-1.5 inline-flex items-center gap-0.5 text-[10px] font-bold text-violet-700 bg-violet-50 px-1.5 py-0.2 rounded border border-violet-200">
                  <BadgeCheck className="w-3 h-3 text-[#8B5CF6] inline" />
                  YLAI {story.author.generation ? `'${story.author.generation.toString().slice(-2)}` : 'Verificado'}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#777286] text-[11px] font-semibold flex-wrap">
            <span>Servicio: <strong className="text-[#211B35]">{story.serviceType}</strong></span>
            {story.amount && (
              <>
                <span aria-hidden="true">·</span>
                <span>Monto: <strong className="text-amber-800">${story.amount.toLocaleString()} {story.currency}</strong></span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>Fecha esperada: <strong className="text-[#211B35]">{story.expectedPaymentDate}</strong></span>
          </div>
        </div>

        {/* Row 5: Live Interactive Reactions + Actions Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Reactions bar without entering! */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Me representa */}
            <button
              type="button"
              onClick={() => handleReactionClick('represents')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 ${
                userVoted.represents
                  ? 'bg-indigo-100 text-indigo-800 border border-indigo-300 shadow-sm'
                  : 'bg-[#FAF9F6] text-[#211B35] hover:bg-indigo-50 border border-[#211B35]/10'
              }`}
              title="Me representa / Me ha pasado"
            >
              <span>🙋‍♂️</span>
              <span>Me representa</span>
              <span className="text-[11px] font-extrabold text-indigo-700">{reactions.represents}</span>
            </button>

            {/* Indignante */}
            <button
              type="button"
              onClick={() => handleReactionClick('angry')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 ${
                userVoted.angry
                  ? 'bg-rose-100 text-rose-800 border border-rose-300 shadow-sm'
                  : 'bg-[#FAF9F6] text-[#211B35] hover:bg-rose-50 border border-[#211B35]/10'
              }`}
              title="Indignante"
            >
              <span>😡</span>
              <span>Indignante</span>
              <span className="text-[11px] font-extrabold text-rose-700">{reactions.angry}</span>
            </button>

            {/* Buen chisme */}
            <button
              type="button"
              onClick={() => handleReactionClick('popcorn')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 ${
                userVoted.popcorn
                  ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-sm'
                  : 'bg-[#FAF9F6] text-[#211B35] hover:bg-amber-50 border border-[#211B35]/10'
              }`}
              title="Buen chisme"
            >
              <span>🍿</span>
              <span>Chisme</span>
              <span className="text-[11px] font-extrabold text-amber-800">{reactions.popcorn}</span>
            </button>

            {/* Fantasma */}
            <button
              type="button"
              onClick={() => handleReactionClick('ghost')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95 ${
                userVoted.ghost
                  ? 'bg-purple-100 text-purple-800 border border-purple-300 shadow-sm'
                  : 'bg-[#FAF9F6] text-[#211B35] hover:bg-purple-50 border border-[#211B35]/10'
              }`}
              title="Fantasma total"
            >
              <span>👻</span>
              <span>Fantasma</span>
              <span className="text-[11px] font-extrabold text-purple-700">{reactions.ghost}</span>
            </button>
          </div>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-2">
            {/* Toggle inline comments */}
            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border transition-colors ${
                showComments
                  ? 'bg-[#8B5CF6]/15 text-[#8B5CF6] border-[#8B5CF6]/30'
                  : 'bg-[#FAF9F6] hover:bg-slate-100 text-[#211B35] border-[#211B35]/10'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Comentarios ({commentsList.length})</span>
              {showComments ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-[#777286] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 rounded-xl border border-[#211B35]/10 transition-colors"
              title="Compartir"
              aria-label="Compartir historia"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Full Story Link */}
            <Link
              href={`/historias/${story.slug}`}
              className="inline-flex items-center gap-1 px-4 py-1.5 font-bold text-xs text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Leer todo</span>
              <span>🍿</span>
            </Link>
          </div>
        </div>

        {/* INLINE EXPANDED COMMENTS DRAWER */}
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
      </div>
    </article>
  );
}
