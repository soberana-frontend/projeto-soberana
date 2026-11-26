/**
 * Tipos compartilhados entre frontend e backend.
 * Espelham as interfaces e DTOs definidos no NestJS (backend/src/).
 */

// --- Services ---
export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  bullets?: string[];
  badge?: string;
}

// --- Segments ---
export interface SegmentItem {
  id: number;
  title: string;
  description: string;
}

// --- News ---
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  featured: boolean;
}

// --- Budget ---
export interface CreateBudgetDto {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType?: string;
  message: string;
}

export interface BudgetRequest extends CreateBudgetDto {
  id: number;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}