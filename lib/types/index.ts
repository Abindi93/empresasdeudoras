export type StoryCategory =
  | 'desaparicion-paranormal'
  | 'manana-te-pago'
  | 'factura-maldita'
  | 'laberinto-contabilidad'
  | 'promesas-ultratumba'
  | 'final-feliz';

export interface CategoryInfo {
  id: StoryCategory;
  name: string;
  emoji: string;
  description: string;
  color: string;
  bgLight: string;
}

export const CATEGORIES: Record<StoryCategory, CategoryInfo> = {
  'desaparicion-paranormal': {
    id: 'desaparicion-paranormal',
    name: 'Desaparición paranormal',
    emoji: '👻',
    description: 'Entregaste el proyecto y no volvieron a contestar correos ni WhatsApp.',
    color: '#8B5CF6',
    bgLight: '#F3E8FF',
  },
  'manana-te-pago': {
    id: 'manana-te-pago',
    name: 'El mañana te pago',
    emoji: '📅',
    description: 'Sale este viernes sin falta, el lunes a primera hora, la quincena que viene...',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
  },
  'factura-maldita': {
    id: 'factura-maldita',
    name: 'La factura maldita',
    emoji: '🧾',
    description: 'Falta un sello, el PDF tenía un acento prohibido o cambiaron el portal de proveedores.',
    color: '#EF4444',
    bgLight: '#FEE2E2',
  },
  'laberinto-contabilidad': {
    id: 'laberinto-contabilidad',
    name: 'El laberinto de contabilidad',
    emoji: '🌀',
    description: 'El tesorero está de viaje, la firma mancomunada no llegó y el token se bloqueó.',
    color: '#06B6D4',
    bgLight: '#CFFAFE',
  },
  'promesas-ultratumba': {
    id: 'promesas-ultratumba',
    name: 'Promesas de ultratumba',
    emoji: '🎭',
    description: '"Para el siguiente proyecto te pagamos el doble", "somos como una familia".',
    color: '#EC4899',
    bgLight: '#FCE7F3',
  },
  'final-feliz': {
    id: 'final-feliz',
    name: 'Final feliz',
    emoji: '🎉',
    description: 'Historias donde finalmente cayó la transferencia tras negociar o presionar.',
    color: '#10B981',
    bgLight: '#D1FAE5',
  },
};

export type StoryStatus =
  | 'pendiente'
  | 'en-disputa'
  | 'acuerdo'
  | 'pagado'
  | 'actualizado';

export interface StatusInfo {
  label: string;
  badgeClass: string;
  description: string;
}

export const STATUS_MAP: Record<StoryStatus, StatusInfo> = {
  pendiente: {
    label: 'Pago pendiente según el autor',
    badgeClass: 'text-amber-800 bg-amber-50 border border-amber-200',
    description: 'El autor reporta que no ha recibido la liquidación acordada.',
  },
  'en-disputa': {
    label: 'En disputa',
    badgeClass: 'text-rose-800 bg-rose-50 border border-rose-200',
    description: 'Ambas partes sostienen desacuerdos sobre entregables o términos.',
  },
  acuerdo: {
    label: 'Acuerdo alcanzado',
    badgeClass: 'text-indigo-800 bg-indigo-50 border border-indigo-200',
    description: 'Las partes establecieron un nuevo calendario o plan de pagos.',
  },
  pagado: {
    label: 'Pago recibido',
    badgeClass: 'text-emerald-800 bg-emerald-50 border border-emerald-200',
    description: 'El caso fue resuelto satisfactoriamente según confirmación del autor.',
  },
  actualizado: {
    label: 'Caso actualizado',
    badgeClass: 'text-slate-800 bg-slate-100 border border-slate-200',
    description: 'Existen avances o respuestas recientes registradas.',
  },
};

export interface StoryComment {
  id: string;
  author: string;
  date: string;
  badge?: string;
  text: string;
  likes: number;
}

export interface StoryReactions {
  ghost: number;
  angry: number;
  popcorn: number;
  represents: number;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLegalName?: string;
  category: StoryCategory;
  country: string;
  countryCode: string;
  city: string;
  excerpt: string;
  content: {
    beginning: string;
    agreement: string;
    whatHappened: string;
    collectionAttempt: string;
    currentSituation: string;
  };
  amount?: number;
  currency?: string;
  serviceType: string;
  agreementDate: string;
  expectedPaymentDate: string;
  publishedAt: string;
  updatedAt?: string;
  status: StoryStatus;
  commentsCount: number;
  reactions: StoryReactions;
  author: {
    displayName: string;
    ylaiVerified: boolean;
    generation?: number;
  };
  companyResponse?: {
    authorTitle: string;
    date: string;
    statement: string;
    statusUpdate?: string;
  };
  comments: StoryComment[];
}

export interface Company {
  id: string;
  slug: string;
  commercialName: string;
  legalName?: string;
  country: string;
  countryCode: string;
  city: string;
  website?: string;
  industry: string;
  description: string;
  totalStories: number;
  resolvedStories: number;
  pendingStories: number;
  disputedStories: number;
}

export interface ConfessionFormData {
  // Step 1: Identity
  fullName: string;
  email: string;
  ylaiGeneration?: string;
  country: string;
  city: string;
  
  // Step 2: Ghost Company
  companyName: string;
  companyLegalName?: string;
  companyCountry: string;
  companyCity: string;
  companyWebsite?: string;
  serviceType: string;
  amount?: number;
  currency: string;
  agreementDate: string;
  expectedPaymentDate: string;
  category: StoryCategory;

  // Step 3: Story
  title: string;
  storyBeginning: string;
  storyAgreement: string;
  storyWhatHappened: string;
  storyCollectionAttempt: string;
  storyCurrentSituation: string;

  // Step 4: Evidence
  evidenceFiles: {
    id: string;
    name: string;
    size: string;
    type: string;
  }[];

  // Step 5: Declaration & Oath
  hasConfirmedTruth: boolean;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  signatureFullName: string;
}
