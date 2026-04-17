// src/types/dashboard.ts

export type DashboardLineChartPoint = {
  name: string;
  total: number;
};

export type DashboardPieChartPoint = {
  name: string;
  value: number;
};

export type DashboardCategory = {
  id: string;
  name: string;
};

export type DashboardTag = {
  id: string;
  name: string;
};

export type DashboardLatestTestimonial = {
  id: string;
  userName: string;
  content: string;
  status: string;
  category: DashboardCategory | null;
  tags: DashboardTag[];
};

export type DashboardTopTestimonial = {
  id: string;
  userName: string;
  content: string;
  views: number;
  category: DashboardCategory | null;
};

export type DashboardData = {
  total: number;
  aprobados: number;
  pendientes: number;
  rechazados: number;
  totalViews: number;
  totalClicks: number;
  avgRating: number;
  featuredCount: number;
  engagementRate: number;
  conversionRate: number;
  lineChartData: DashboardLineChartPoint[];
  pieChartData: DashboardPieChartPoint[];
  latestTestimonials: DashboardLatestTestimonial[];
  topTestimonials: DashboardTopTestimonial[];
};

export type DashboardApiResponse = {
  success: boolean;
  data: DashboardData;
};