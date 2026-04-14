import { api } from "@/lib/api";

// Definimos la "forma" de los datos que esperamos del Back
export interface DashboardData {
  total: number;
  aprobados: number;
  pendientes: number;
  rechazados: number;
  totalViews: number;
  totalClicks: number;
  avgRating: number;
  featuredCount: number;
  engagementRate: string | number;
  conversionRate: string | number;
  pieChartData: any[];
  lineChartData: any[];
  lastestTestimonials: any[];
  topTestimonials: any[];
}

export const getDashboardStats = async () => {
  try {
    // Llamamos al endpoint que acordamos
    const { data } = await api.get("/dashboard/stats");
    
    // IMPORTANTE: Algunos backends devuelven { data: {...} } 
    // y otros directamente el objeto. Aquí manejamos ambos:
    const finalData = data.data || data;

    return { 
      success: true, 
      data: finalData as DashboardData 
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Error al obtener estadísticas"
    };
  }
};