'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import {
  AdminSubmission,
  fetchAdminSubmissions,
  SubmissionReviewStatus,
  updateSubmissionReview,
} from '@/lib/api';
import { CheckCircle2, Eye, LockKeyhole, LogOut, RefreshCw, XCircle } from 'lucide-react';

const SESSION_KEY = 'empresas-deudoras-admin-auth';

const statusLabel: Record<SubmissionReviewStatus, string> = {
  'pending-review': 'Pendientes',
  approved: 'Aprobados',
  rejected: 'Rechazados',
};

export function SubmissionReview() {
  const [credentials, setCredentials] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<AdminSubmission[]>([]);
  const [filter, setFilter] = useState<SubmissionReviewStatus>('pending-review');
  const [isLoading, setIsLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const loadSubmissions = useCallback(async (auth: string, status: SubmissionReviewStatus) => {
    setIsLoading(true);
    setError('');
    try {
      setSubmissions(await fetchAdminSubmissions(auth, status));
    } catch {
      setError('No fue posible acceder al panel. Revisa el usuario, la contraseña y que la API esté encendida.');
      setCredentials(null);
      sessionStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedCredentials = sessionStorage.getItem(SESSION_KEY);
    if (!savedCredentials) return;
    const restoreSession = window.setTimeout(() => {
      setCredentials(savedCredentials);
      void loadSubmissions(savedCredentials, 'pending-review');
    }, 0);
    return () => window.clearTimeout(restoreSession);
  }, [loadSubmissions]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const nextCredentials = btoa(`${username}:${password}`);
    setCredentials(nextCredentials);
    sessionStorage.setItem(SESSION_KEY, nextCredentials);
    await loadSubmissions(nextCredentials, filter);
  };

  const handleFilterChange = async (nextFilter: SubmissionReviewStatus) => {
    setFilter(nextFilter);
    if (credentials) await loadSubmissions(credentials, nextFilter);
  };

  const updateStatus = async (id: string, status: SubmissionReviewStatus) => {
    if (!credentials) return;
    setUpdatingId(id);
    setError('');
    try {
      await updateSubmissionReview(credentials, id, status);
      await loadSubmissions(credentials, filter);
    } catch {
      setError('No fue posible actualizar el estado. Inténtalo de nuevo.');
    } finally {
      setUpdatingId(null);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setCredentials(null);
    setSubmissions([]);
    setPassword('');
  };

  if (!credentials) {
    return (
      <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-3xl border border-[#211B35]/10 bg-white p-7 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-2xl bg-[#8B5CF6]/10 p-3 text-[#8B5CF6]"><LockKeyhole className="h-5 w-5" /></span>
          <div>
            <h1 className="text-xl font-extrabold text-[#211B35]">Revisión de testimonios</h1>
            <p className="text-xs text-[#777286]">Acceso exclusivo para administración.</p>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-xs font-bold text-[#211B35]">Usuario
            <input value={username} onChange={(event) => setUsername(event.target.value)} required autoComplete="username" className="mt-1.5 w-full rounded-xl border border-[#211B35]/15 px-3 py-2.5 text-sm outline-none focus:border-[#8B5CF6]" />
          </label>
          <label className="block text-xs font-bold text-[#211B35]">Contraseña
            <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" autoComplete="current-password" className="mt-1.5 w-full rounded-xl border border-[#211B35]/15 px-3 py-2.5 text-sm outline-none focus:border-[#8B5CF6]" />
          </label>
          {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
          <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-[#8B5CF6] px-4 py-3 text-sm font-bold text-white hover:bg-[#7C3AED] disabled:opacity-60">
            {isLoading ? 'Entrando...' : 'Entrar al panel'}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5 px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">Administración</p>
          <h1 className="text-2xl font-extrabold text-[#211B35]">Revisión de testimonios</h1>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => void loadSubmissions(credentials, filter)} className="rounded-xl border border-[#211B35]/12 bg-white p-2.5 text-[#211B35] hover:border-[#8B5CF6]" aria-label="Actualizar lista"><RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} /></button>
          <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 rounded-xl border border-[#211B35]/12 bg-white px-3 py-2.5 text-xs font-bold text-[#211B35] hover:border-rose-300 hover:text-rose-600"><LogOut className="h-3.5 w-3.5" />Salir</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(statusLabel) as SubmissionReviewStatus[]).map((status) => (
          <button key={status} type="button" onClick={() => void handleFilterChange(status)} className={`rounded-xl px-3.5 py-2 text-xs font-bold ${filter === status ? 'bg-[#211B35] text-white' : 'border border-[#211B35]/12 bg-white text-[#777286]'}`}>
            {statusLabel[status]}
          </button>
        ))}
      </div>

      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">{error}</p>}

      {isLoading ? (
        <div className="py-16 text-center text-sm font-semibold text-[#777286]">Cargando testimonios...</div>
      ) : submissions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#211B35]/15 bg-white px-6 py-16 text-center text-sm font-semibold text-[#777286]">No hay testimonios {statusLabel[filter].toLocaleLowerCase('es-MX')}.</div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <article key={submission.id} className="rounded-2xl border border-[#211B35]/10 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#8B5CF6]">{submission.category.replaceAll('-', ' ')}</p>
                  <h2 className="mt-1 text-lg font-extrabold text-[#211B35]">{submission.title}</h2>
                  <p className="mt-1 text-xs font-semibold text-[#777286]">{submission.companyName} · {submission.companyCity}, {submission.companyCountry}</p>
                </div>
                <span className="rounded-full bg-[#FAF9F6] px-2.5 py-1 text-[11px] font-bold text-[#777286]">{new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(submission.receivedAt))}</span>
              </div>

              <details className="mt-4 rounded-xl bg-[#FAF9F6] p-3 text-xs text-[#211B35]">
                <summary className="flex cursor-pointer list-none items-center gap-2 font-bold"><Eye className="h-3.5 w-3.5 text-[#8B5CF6]" />Ver información y testimonio</summary>
                <div className="mt-4 space-y-3 border-t border-[#211B35]/8 pt-3 leading-relaxed">
                  <p><strong>Autor:</strong> {submission.fullName} · {submission.email} · {submission.city}, {submission.country}</p>
                  <p><strong>Servicio:</strong> {submission.serviceType}{submission.amount ? ` · ${submission.amount.toLocaleString('es-MX')} ${submission.currency}` : ''}</p>
                  <p><strong>Cómo empezó:</strong> {submission.storyBeginning}</p>
                  <p><strong>Qué ocurrió:</strong> {submission.storyWhatHappened}</p>
                  <p><strong>Intento de cobro:</strong> {submission.storyCollectionAttempt}</p>
                  {submission.storyCurrentSituation && <p><strong>Situación actual:</strong> {submission.storyCurrentSituation}</p>}
                  <p><strong>Evidencias:</strong> {submission.evidenceFiles.length ? submission.evidenceFiles.map((file) => file.name).join(', ') : 'No adjuntó evidencias.'}</p>
                </div>
              </details>

              {submission.status === 'pending-review' && (
                <div className="mt-4 flex flex-wrap justify-end gap-2">
                  <button type="button" disabled={updatingId === submission.id} onClick={() => void updateStatus(submission.id, 'rejected')} className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-60"><XCircle className="h-3.5 w-3.5" />Rechazar</button>
                  <button type="button" disabled={updatingId === submission.id} onClick={() => void updateStatus(submission.id, 'approved')} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-60"><CheckCircle2 className="h-3.5 w-3.5" />Aprobar y publicar</button>
                </div>
              )}
              {submission.reviewedAt && <p className="mt-3 text-right text-[11px] font-medium text-[#777286]">Revisado por {submission.reviewedBy} el {new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(submission.reviewedAt))}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
