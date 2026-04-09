"use client";

import { useEffect, useState } from "react";
import TituloPage from "@/components/tituloPage";
import StatCard from "@/components/StatCard";
import LastestTestimonials from "@/components/LastestTestimonials";
import TopTestimonial from "@/components/TopTestimonial";
import DashboardChartsWrapper from "@/components/DashboardChartsWrapper";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import { 
  MdChatBubbleOutline, 
  MdCheckCircleOutline, 
  MdAccessTime, 
  MdHighlightOff, 
  MdRemoveRedEye, 
  MdTouchApp, 
  MdOutlineStarBorder, 
  MdAutoGraph 
} from "react-icons/md";

const MOCK_DASHBOARD_DATA = {
  total: 120,
  aprobados: 80,
  pendientes: 30,
  rechazados: 10,
  totalViews: 4500,
  totalClicks: 1300,
  avgRating: 4.5,
  featuredCount: 5,
  lineChartData: [{ name: "Semana 1", total: 20 }, { name: "Semana 2", total: 30 }],
  pieChartData: [{ name: "Aprobados", value: 80 }, { name: "Pendientes", value: 30 }],
  engagementRate: 75,
  conversionRate: 20,
  lastestTestimonials: [
    { id: 1, username: "Juan", content: "¡Muy bueno!" },
    { id: 2, username: "María", content: "Excelente servicio" }
  ],
  topTestimonials: [
    { id: 1, username: "Pedro", content: "Recomendado!" },
    { id: 2, username: "Lucía", content: "Increíble experiencia" }
  ]
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  // Usamos los datos ficticios
  useEffect(() => {
    setDashboardData(MOCK_DASHBOARD_DATA);
  }, []);

  if (!user || !dashboardData) {
    return <div className="p-8 text-center text-lg">Cargando dashboard...</div>;
  }

  return (
    <div className="p-8">
      <TituloPage 
        titulo="Dashboard" 
        descripcion="Bienvenido de vuelta. Esto es lo que está pasando con tus testimonios" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        <StatCard title="Total testimonios" value={dashboardData.total} icon={MdChatBubbleOutline} iconColor="text-brand" />
        <StatCard title="Aprobados" value={dashboardData.aprobados} icon={MdCheckCircleOutline} iconColor="text-green-600" />
        <StatCard title="Pendientes" value={dashboardData.pendientes} icon={MdAccessTime} iconColor="text-yellow-500" />
        <StatCard title="Rechazados" value={dashboardData.rechazados} icon={MdHighlightOff} iconColor="text-red-500" />
        <StatCard title="Vistas totales" value={dashboardData.totalViews.toLocaleString()} icon={MdRemoveRedEye} iconColor="text-blue-500" />
        <StatCard title="Clicks totales" value={dashboardData.totalClicks.toLocaleString()} icon={MdTouchApp} iconColor="text-brand" />
        <StatCard title="Rating promedio" value={dashboardData.avgRating.toFixed(1)} icon={MdOutlineStarBorder} iconColor="text-orange-400" />
        <StatCard title="Destacados" value={dashboardData.featuredCount} icon={MdAutoGraph} iconColor="text-purple-500" />
      </div>

      <DashboardChartsWrapper 
        lineData={dashboardData.lineChartData} 
        pieData={dashboardData.pieChartData} 
        engagementRate={dashboardData.engagementRate} 
        conversionRate={dashboardData.conversionRate}
      />

      <div className="flex flex-col-reverse lg:flex-row gap-10 mt-10 bg-cards p-6 rounded-3xl border border-border">
        <div className="mt-10 lg:w-3/5 order-last lg:order-0">
          <LastestTestimonials testimonials={dashboardData.lastestTestimonials} />
        </div>
        <div className="mt-10 lg:w-2/3 lg:grow order-first lg:order-0">
          <TopTestimonial data={dashboardData.topTestimonials} />
        </div>
      </div>
    </div>
  );
}