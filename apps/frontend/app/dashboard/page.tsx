import TituloPage from "@/components/tituloPage";
import StatCard from "@/components/StatCard";
import LastestTestimonials from "@/components/LastestTestimonials";
import TopTestimonial from "@/components/TopTestimonial";
import DashboardChartsWrapper from "@/components/DashboardChartsWrapper";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

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





export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  //Si el usuario es STAFF, adminID tendrá el ID de su JEFE
  //Si el usuario es ADMIN pricipal, adminID es null, entonces usamos su propio ID
  const masterAdminId = session.user.adminId || session.user.id;



  // 1. PETICIÓN ÚNICA AL BACKEND
  // En lugar de 7 consultas Prisma, pedimos un objeto de estadísticas completo.
  let dashboardData: any = null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard/stats?adminId=${masterAdminId}`, {
      next: { revalidate: 300 }, // Cacheamos 5 minutos para no saturar el back
       headers: { // 'Authorization': `Bearer ${session.user.accessToken}`, // Si usan tokens
      },
    });
    
    if (response.ok) {
      dashboardData = await response.json();
    }
  } catch (error) {
    console.error("Error cargando dashboard:", error);
  }

  // Si no hay datos (error de back), mostramos valores en cero por seguridad
  if (!dashboardData) return <div>Cargando datos del servidor...</div>;
  
  


  return (
    <div className="p-8">
      <TituloPage 
        titulo="Dashboard" 
        descripcion="Bienvenido de vuelta. Esto es lo que está pasando con tus testimonios" 
      />

      {/* Grid de tarjetas: 1 columna en móvil, 2 en tablet, 4 en desktop */}
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
        
        {/* Estas métricas las simularemos por ahora (son de engagement) */}
        <StatCard 
          title="Vistas totales" 
          value={dashboardData.totalViews.toLocaleString()} //para agregar los punto miles
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

      {/* Gráficos de tendencias y distribución */}
      <DashboardChartsWrapper 
        lineData={dashboardData.lineChartData} 
        pieData={dashboardData.pieChartData} 
        engagementRate={dashboardData.engagementRate} 
        conversionRate={dashboardData.conversionRate}
      />


      <div className="flex flex-col-reverse lg:flex-row gap-10 mt-10 bg-cards p-6 rounded-3xl border border-border ">

        <div className="mt-10 lg:w-3/5 order-last lg:order-0">
          {/* Últimos testimonios */}
          <LastestTestimonials testimonials={dashboardData.lastestTestimonials} />
        </div>
        <div className="mt-10 lg:w-2/3 lg:grow order-first lg:order-0">
          {/* Testimonios más vistos */}
          <TopTestimonial data={dashboardData.topTestimonials} />
        </div>

      </div>


    </div>
  );
}
