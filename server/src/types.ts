export type StoryCategory =
  | 'desaparicion-paranormal'
  | 'manana-te-pago'
  | 'factura-maldita'
  | 'laberinto-contabilidad'
  | 'promesas-ultratumba'
  | 'final-feliz';

export interface StorySubmission {
  id: string;
  status: 'pending-review';
  receivedAt: string;
  fullName: string;
  email: string;
  ylaiGeneration?: string;
  country: string;
  city: string;
  companyName: string;
  companyLegalName?: string;
  companyCountry: string;
  companyCity: string;
  companyWebsite?: string;
  serviceType: string;
  amount?: number;
  currency: string;
  agreementDate?: string;
  expectedPaymentDate: string;
  category: StoryCategory;
  title: string;
  storyBeginning: string;
  storyAgreement?: string;
  storyWhatHappened: string;
  storyCollectionAttempt: string;
  storyCurrentSituation?: string;
  evidenceFiles: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
  }>;
  hasConfirmedTruth: true;
  acceptedTerms: true;
  acceptedPrivacy: true;
  signatureFullName: string;
}
