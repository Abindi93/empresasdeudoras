'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Story, CATEGORIES, STATUS_MAP } from '@/lib/types';
import { StoryCard } from '@/components/stories/StoryCard';
import { FantiWorried, FantiWriter } from '@/components/mascot/Fanti';
import {
  ArrowLeft,
  Share2,
  Check,
  Building2,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  BadgeCheck,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface StoryDetailProps {
  story: Story;
  relatedStories: Story[];
}

export function StoryDetail({ story, relatedStories }: StoryDetailProps) {
  const [copied, setCopied] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<string, number>>(
    () => story.comments.reduce((acc, c) => ({ ...acc, [c.id]: c.likes }), {})
  );
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  const categoryInfo = CATEGORIES[story.category];
  const statusInfo = STATUS_MAP[story.status];

  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.title} - Empresa Deudora`,
          text: `Mira este testimonio sobre ${story.companyName}: "${story.excerpt}"`,
          url,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      handleCopyLink();
    }
  };

  const shareOnWhatsApp = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(
      `👻 Empresa Deudora: "${story.title}" sobre ${story.companyName}.\nLéelo aquí: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const toggleCommentLike = (commentId: string) => {
    const currentlyLiked = !!userLiked[commentId];
    setUserLiked((prev) => ({ ...prev, [commentId]: !currentlyLiked }));
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: prev[commentId] + (currentlyLiked ? -1 : 1),
    }));
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/#muro-historias"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al muro de historias</span>
        </Link>
      </div>

      {/* Main Story Container */}
      <div className="bg-white rounded-3xl border border-[#211B35]/10 shadow-[0_12px_40px_rgba(33,27,53,0.06)] overflow-hidden">
        {/* Color Header Banner */}
        <div
          className="h-3 w-full"
          style={{ backgroundColor: categoryInfo?.color || '#8B5CF6' }}
        />

        <div className="p-6 sm:p-10">
          {/* Metadata Top Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#777286] mb-4">
            <div className="flex items-center gap-2 font-bold text-[#8B5CF6]">
              <span className="text-base">{categoryInfo?.emoji}</span>
              <span>{categoryInfo?.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {story.city ? `${story.city}, ` : ''}{story.country}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Publicado el {story.publishedAt}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#211B35] tracking-tight leading-tight mb-4">
            {story.title}
          </h1>

          {/* Company & Status Bar */}
          <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#211B35]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#211B35]/10 flex items-center justify-center text-xl shrink-0">
                🏢
              </div>
              <div>
                <p className="text-xs text-[#777286] font-semibold">Empresa mencionada:</p>
                <Link
                  href={`/empresas/${story.companyId}`}
                  className="font-bold text-base text-[#211B35] hover:text-[#8B5CF6] transition-colors flex items-center gap-1"
                >
                  <span>{story.companyName}</span>
                  <span className="text-xs font-normal text-[#777286]">({story.companyLegalName || 'Razón social registrada'})</span>
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.badgeClass}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>

          {/* Author Badge & Case Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-[#211B35]/10 text-xs mb-8">
            <div>
              <span className="text-[#777286] block text-[11px] font-medium">Autor:</span>
              <span className="font-bold text-[#211B35] block truncate mt-0.5">
                {story.author.displayName}
              </span>
              {story.author.ylaiVerified && (
                <span className="text-[10px] font-bold text-violet-700 flex items-center gap-0.5 mt-0.5">
                  <BadgeCheck className="w-3 h-3 text-[#8B5CF6]" />
                  Comunidad YLAI {story.author.generation ? `'${story.author.generation.toString().slice(-2)}` : ''}
                </span>
              )}
            </div>

            <div>
              <span className="text-[#777286] block text-[11px] font-medium">Servicio:</span>
              <span className="font-bold text-[#211B35] block truncate mt-0.5">
                {story.serviceType}
              </span>
            </div>

            <div>
              <span className="text-[#777286] block text-[11px] font-medium">Fecha esperada:</span>
              <span className="font-bold text-[#211B35] block mt-0.5">
                {story.expectedPaymentDate}
              </span>
            </div>

            <div>
              <span className="text-[#777286] block text-[11px] font-medium">Monto reportado:</span>
              <span className="font-bold text-[#211B35] block mt-0.5">
                {story.amount ? `${story.amount.toLocaleString()} ${story.currency}` : 'Monto reservado'}
              </span>
            </div>
          </div>

          {/* Editorial Narrative Sections */}
          <div className="space-y-8 text-base text-[#211B35] leading-relaxed">
            {/* Section 1 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] text-xs font-black">
                  1
                </span>
                ¿Cómo comenzó todo?
              </h3>
              <p className="text-[#211B35]/90 pl-8 font-normal leading-relaxed">
                {story.content.beginning}
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] text-xs font-black">
                  2
                </span>
                ¿Qué se acordó?
              </h3>
              <p className="text-[#211B35]/90 pl-8 font-normal leading-relaxed">
                {story.content.agreement}
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] text-xs font-black">
                  3
                </span>
                ¿Qué sucedió tras la entrega?
              </h3>
              <p className="text-[#211B35]/90 pl-8 font-normal leading-relaxed">
                {story.content.whatHappened}
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] text-xs font-black">
                  4
                </span>
                El intento de cobro
              </h3>
              <p className="text-[#211B35]/90 pl-8 font-normal leading-relaxed">
                {story.content.collectionAttempt}
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#211B35] flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] text-xs font-black">
                  5
                </span>
                Situación actual
              </h3>
              <p className="text-[#211B35]/90 pl-8 font-normal leading-relaxed">
                {story.content.currentSituation}
              </p>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="mt-10 pt-6 border-t border-[#211B35]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#777286]">
              <span>¿Conoces a alguien a quien le sirva este chismecito?</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={shareOnWhatsApp}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#065F46] bg-[#D1FAE5] hover:bg-[#A7F3D0] rounded-xl transition-colors shadow-sm"
              >
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-xl transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Enlace copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir historia</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section: The Other Version (Company Response) */}
        <div className="bg-[#FAF9F6] border-t border-[#211B35]/10 p-6 sm:p-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#777286] mb-3">
            <Building2 className="w-4 h-4 text-[#8B5CF6]" />
            <span>La otra versión de la historia</span>
          </div>

          {story.companyResponse ? (
            <div className="bg-white rounded-2xl border border-[#211B35]/10 p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-sm text-[#211B35]">
                  {story.companyResponse.authorTitle}
                </span>
                <span className="text-xs text-[#777286]">
                  Respuesta registrada el {story.companyResponse.date}
                </span>
              </div>
              <p className="text-sm text-[#211B35]/85 italic leading-relaxed">
                &ldquo;{story.companyResponse.statement}&rdquo;
              </p>
              {story.companyResponse.statusUpdate && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900 font-semibold flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{story.companyResponse.statusUpdate}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/60 rounded-2xl border border-dashed border-[#211B35]/15 p-5 text-center text-xs text-[#777286]">
              <p className="font-semibold text-[#211B35] mb-1">
                Esta historia todavía no tiene una respuesta publicada de la empresa.
              </p>
              <p className="max-w-md mx-auto">
                Los representantes de la empresa pueden enviar su postura oficial, aclaraciones o comprobantes a la mesa de conciliación comunitaria.
              </p>
            </div>
          )}
        </div>

        {/* Section: Comments */}
        <div id="comentarios" className="p-6 sm:p-10 border-t border-[#211B35]/10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#8B5CF6]" />
              <h3 className="text-xl font-bold text-[#211B35]">
                Comentarios de la comunidad ({story.comments.length})
              </h3>
            </div>
          </div>

          {/* Moderation Disclaimer */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 mb-6 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Modo de lectura:</strong> Para evitar agresiones o acusaciones no sustentadas, todos los comentarios se revisan por moderadores comunitarios antes de su publicación.
            </p>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {story.comments.map((comment) => {
              const isLiked = userLiked[comment.id];
              return (
                <div
                  key={comment.id}
                  className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#211B35]/8 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#211B35]">
                        {comment.author}
                      </span>
                      {comment.badge && (
                        <span className="px-2 py-0.5 bg-[#8B5CF6]/15 text-[#8B5CF6] rounded-md font-bold text-[10px]">
                          {comment.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[#777286] text-[11px]">{comment.date}</span>
                  </div>

                  <p className="text-sm text-[#211B35]/90 leading-relaxed font-normal">
                    {comment.text}
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => toggleCommentLike(comment.id)}
                      className={`flex items-center gap-1.5 font-bold text-xs transition-colors px-2 py-1 rounded-lg ${
                        isLiked
                          ? 'text-[#8B5CF6] bg-[#8B5CF6]/15'
                          : 'text-[#777286] hover:text-[#211B35] hover:bg-slate-200/60'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{likedComments[comment.id]}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <div className="mt-14">
          <h3 className="text-xl font-bold text-[#211B35] mb-6 flex items-center gap-2">
            <span>Más historias relacionadas</span>
            <span>🍿</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStories.map((rel) => (
              <StoryCard key={rel.id} story={rel} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
