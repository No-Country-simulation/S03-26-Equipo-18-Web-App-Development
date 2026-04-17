"use client";

import { useEffect, useState } from "react";
import TituloPage from "@/components/tituloPage";
import StatCard from "@/components/StatCard";
import LastestTestimonials from "@/components/LastestTestimonials";
import TopTestimonial from "@/components/TopTestimonial";
import DashboardChartsWrapper from "@/components/DashboardChartsWrapper";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import type { DashboardApiResponse, DashboardData } from "@/types/dashboard";

import {
  MdChatBubbleOutline,
  MdCheckCircleOutline,
  MdAccessTime,
  MdHighlightOff,
  MdRemoveRedEye,
  MdTouchApp,
  MdOutlineStarBorder,
  MdAutoGraph,
} from "react-icons/md";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const { user, token, loading, logout } = useAuth();
  const router = useRouter();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || !token)) {
      router.replace("/login");
    }
  }, [loading, user, token, router]);

  useEffect(() => {
    if (loading || !token || !API_URL) return;

    const controller = new AbortController();

    const fetchDashboard = async () => {
      try {
        setDashboardLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/api/private/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (res.status === 401) {
          logout();
          router.replace("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("No se pudo cargar el dashboard");
        }

        const result: DashboardApiResponse = await res.json();
        setDashboardData(result.data);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;

        console.error("Error cargando dashboard:", err);
        setError("Error al obtener los datos del dashboard");
      } finally {
        setDashboardLoading(false);
      }
    };

    fetchDashboard();

    return () => controller.abort();
  }, [loading, token, logout, router]);

  if (!API_URL) {
    return (
      <div className="p-8 text-center text-red-500">
        Falta configurar NEXT_PUBLIC_API_URL en el frontend.
      </div>
    );
  }

  if (loading || dashboardLoading) {
    return <div className="p-8 text-center text-lg">Cargando dashboard...</div>;
  }

  if (!user || !token) {
    return null;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!dashboardData) {
    return <div className="p-8 text-center text-lg">No hay datos para mostrar.</div>;
  }
console.log("Dashboard data:", dashboardData);
  return (
    <div className="p-8">
      <TituloPage
        titulo="Dashboard"
        descripcion="Bienvenido de vuelta. Esto es lo que está pasando con tus testimonios"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        <StatCard
          title="Total testimonios"
          value={dashboardData.total}
          icon={MdChatBubbleOutline}
          iconColor="text-brand"
        />
        <StatCard
          title="Aprobados"
          value={dashboardData.aprobados}
          icon={MdCheckCircleOutline}
          iconColor="text-green-600"
        />
        <StatCard
          title="Pendientes"
          value={dashboardData.pendientes}
          icon={MdAccessTime}
          iconColor="text-yellow-500"
        />
        <StatCard
          title="Rechazados"
          value={dashboardData.rechazados}
          icon={MdHighlightOff}
          iconColor="text-red-500"
        />
        <StatCard
          title="Vistas totales"
          value={dashboardData.totalViews.toLocaleString()}
          icon={MdRemoveRedEye}
          iconColor="text-blue-500"
        />
        <StatCard
          title="Clicks totales"
          value={dashboardData.totalClicks.toLocaleString()}
          icon={MdTouchApp}
          iconColor="text-brand"
        />
        <StatCard
          title="Rating promedio"
          value={dashboardData.avgRating.toFixed(1)}
          icon={MdOutlineStarBorder}
          iconColor="text-orange-400"
        />
        <StatCard
          title="Destacados"
          value={dashboardData.featuredCount}
          icon={MdAutoGraph}
          iconColor="text-purple-500"
        />
      </div>

      <DashboardChartsWrapper
        lineData={dashboardData.lineChartData}
        pieData={dashboardData.pieChartData}
        engagementRate={dashboardData.engagementRate}
        conversionRate={dashboardData.conversionRate}
      />

      <div className="flex flex-col-reverse lg:flex-row gap-10 mt-10 bg-cards p-6 rounded-3xl border border-border">
        <div className="mt-10 lg:w-3/5 order-last lg:order-0">
          <LastestTestimonials testimonials={dashboardData.latestTestimonials} />
        </div>

        <div className="mt-10 lg:w-2/3 lg:grow order-first lg:order-0">
          <TopTestimonial data={dashboardData.topTestimonials} />
        </div>
      </div>
    </div>
  );
}