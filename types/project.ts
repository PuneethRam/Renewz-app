// types/project.ts

export interface Project {
  id: number;
  title: string;
  location: string;
  totalCapacity: number;
  availableCapacity: number;
  costPerKw: number;
  roi: number;
  avgMonthlyUnits: number;
  payoutPerUnit: number;
  ratePerUnitInvestor: number;
  ratePerUnitHost: number;
  status: 'upcoming' | 'active' | 'closed';
  bannerUrl: string | null;
  subscriptions: number;
  createdAt?: string;
}

export interface ProjectStats {
  totalProjects: number;
  totalCapacity: number;
  availableCapacity: number;
  averageROI: number;
  totalRegions: number;
  regions: string[];
}

export interface Subscription {
  id: number;
  userId: number;
  projectId: number;
  subscribedKw: number;
  amountPaid: number;
  startDate: string;
}

export interface Host {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  projectId: number;
}

export interface GenerationData {
  id: number;
  projectId: number;
  date: string;
  unitsGeneratedKwh: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
  total?: number;
}

// Filter types
export type SortOption = 'roi' | 'capacity' | 'payout';
export type ROIRange = 'all' | '10-12' | '12-15' | '15+';

export interface ProjectFilters {
  search: string;
  region: string;
  roiRange: ROIRange;
  sortBy: SortOption;
}