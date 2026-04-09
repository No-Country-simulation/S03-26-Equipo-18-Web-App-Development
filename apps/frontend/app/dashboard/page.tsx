import { prisma } from "@/lib/prisma";
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
  
  // Consultas reales a Prisma
  const totalTestimonios = await prisma.testimonial.count({
    where: { userId: masterAdminId }
  });

  const aprobados = await prisma.testimonial.count({
    where: { userId: masterAdminId, status: "APROBADO" }
  });

  const pendientes = await prisma.testimonial.count({
    where: { userId: masterAdminId, status: "PENDIENTE" }
  });

  const rechazados = await prisma.testimonial.count({
    where: { userId: masterAdminId, status: "RECHAZADO" }
  });

  const statsAggregate = await prisma.testimonial.aggregate({
    where: { 
      userId: masterAdminId, 
      rating: {
        gt: 0 //mayor a cero para no contar testimonios sin rating en el promedio
    } },
    _sum: { views: true, clicks: true }, //suma total de vistas y clics de todos los testimonios del instituto
    _avg: { rating: true }, //promedio de rating de todos los testimonios del instituto

  });
  
  const totalViews = statsAggregate._sum.views || 0; // Si no hay vistas, devuelve 0
  const totalClicks = statsAggregate._sum.clicks || 0; // Si no hay clics, devuelve 0
  
  const avgRating = statsAggregate._avg.rating ? parseFloat(statsAggregate._avg.rating.toFixed(1)) : 0; 


  const lastestTestimonials = await prisma.testimonial.findMany({
    where: { userId: masterAdminId },
    take: 4, // Solo los últimos 4 para el dashboard
    orderBy: { createdAt: 'desc' },
    include: {
      category: true, // Necesario para t.category.name
      tags: true      // Necesario para la lista de tags
    }
  });

  const topTestimonials = await prisma.testimonial.findMany({
    where: { userId: masterAdminId },
    orderBy: { views: 'desc' }, 
    take: 4,
    include: {
      category: true
    }
  });


 
// --- LÓGICA PARA INDICADORES DE TENDENCIA Y DISTRIBUCIÓN ---

// 1. Engagement Rate: (Vistas totales / Cantidad de testimonios)
const engagementRate = totalTestimonios > 0 
  ? (totalViews / totalTestimonios).toFixed(1) 
  : "0";

// 2. Tasa de Conversión (basada en Clicks)

const conversionRate = totalViews > 0 
  ? ((totalClicks / totalViews) * 100).toFixed(2) 
  : "0.00";

 //3. Datos para el gráfico de torta (Autenticidad)
const pieChartData = [
  { name: 'Verificados', value: aprobados, color: '#00CFBA' }, // Color de tu logo
  { name: 'Pendientes', value: pendientes, color: '#4B5563' },
]; 


// 4. Datos para el gráfico de líneas (Agrupados por mes/día)
const rawLineData = await prisma.testimonial.groupBy({
  by: ['createdAt'],
  where: { userId: masterAdminId },
  _count: { id: true },
  _avg: { rating: true }
});

// Formateamos para que Recharts lo entienda (ejemplo por mes simplificado)
const lineChartData = rawLineData.map(item => ({
  name: item.createdAt.toLocaleDateString('es-ES', { month: 'short' }),
  volumen: item._count.id,
  puntuacion: item._avg.rating || 0
}));


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
          value={totalTestimonios} 
          icon={MdChatBubbleOutline} 
          iconColor="text-brand" 
        />
        <StatCard 
          title="Aprobados" 
          value={aprobados} 
          icon={MdCheckCircleOutline} 
          iconColor="text-green-600" 
        />
        <StatCard 
          title="Pendientes" 
          value={pendientes} 
          icon={MdAccessTime} 
          iconColor="text-yellow-500" 
        />
        <StatCard 
          title="Rechazados" 
          value={rechazados} 
          icon={MdHighlightOff} 
          iconColor="text-red-500" 
        />
        
        {/* Estas métricas las simularemos por ahora (son de engagement) */}
        <StatCard 
          title="Vistas totales" 
          value={totalViews.toLocaleString()} //para agregar los punto miles
          icon={MdRemoveRedEye} 
          iconColor="text-blue-500" 
        />
        <StatCard 
          title="Clicks totales" 
          value={totalClicks.toLocaleString()} 
          icon={MdTouchApp} 
          iconColor="text-brand" 
        />
        <StatCard 
          title="Rating promedio" 
          value={avgRating.toFixed(1)} 
          icon={MdOutlineStarBorder} 
          iconColor="text-orange-400" 
        />
        <StatCard 
          title="Destacados" 
          value="2" 
          icon={MdAutoGraph} 
          iconColor="text-purple-500" 
        />
      </div>

      {/* Gráficos de tendencias y distribución */}
      <DashboardChartsWrapper 
        lineData={lineChartData} 
        pieData={pieChartData} 
        engagementRate={engagementRate} 
        conversionRate={conversionRate}
      />


      <div className="flex flex-col-reverse lg:flex-row gap-10 mt-10 bg-cards p-6 rounded-3xl border border-border ">

        <div className="mt-10 lg:w-3/5 order-last lg:order-0">
          {/* Últimos testimonios */}
          <LastestTestimonials testimonials={lastestTestimonials} />
        </div>
        <div className="mt-10 lg:w-2/3 lg:grow order-first lg:order-0">
          {/* Testimonios más vistos */}
          <TopTestimonial data={topTestimonials} />
        </div>

      </div>


    </div>
  );
}
