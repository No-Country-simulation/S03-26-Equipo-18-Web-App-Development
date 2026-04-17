// src/modules/dashboard/dashboard.types.ts

export type DashboardLineChartPointDto = {
  name: string;
  total: number;
};

export type DashboardPieChartPointDto = {
  name: string;
  value: number;
};

export type DashboardCategoryDto = {
  id: string;
  name: string;
};

export type DashboardTagDto = {
  id: string;
  name: string;
};

export type DashboardLatestTestimonialDto = {
  id: string;
  userName: string;
  content: string;
  status: string;
  category: DashboardCategoryDto | null;
  tags: DashboardTagDto[];
};

export type DashboardTopTestimonialDto = {
  id: string;
  userName: string;
  content: string;
  views: number;
  category: DashboardCategoryDto | null;
};

export type DashboardResponseDto = {
  total: number;
  aprobados: number;
  pendientes: number;
  rechazados: number;
  totalViews: number;
  totalClicks: number;
  avgRating: number; // temporalmente 0, porque no existe en BD
  featuredCount: number;
  engagementRate: number;
  conversionRate: number;
  lineChartData: DashboardLineChartPointDto[];
  pieChartData: DashboardPieChartPointDto[];
  latestTestimonials: DashboardLatestTestimonialDto[];
  topTestimonials: DashboardTopTestimonialDto[];
};