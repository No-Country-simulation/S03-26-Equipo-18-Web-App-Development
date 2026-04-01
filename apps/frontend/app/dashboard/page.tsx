import { prisma } from "@/lib/prisma";
import TituloPage from "@/components/tituloPage";
import StatCard from "@/components/StatCard";
import LastestTestimonials from "@/components/LastestTestimonials";
import TopTestimonial from "@/components/TopTestimonial";

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
  const adminInstituto = "No-Country"; // Luego vendrá de la sesión

  // Consultas reales a Prisma
  const totalTestimonios = await prisma.testimonial.count({
    where: { instituto: adminInstituto }
  });

  const aprobados = await prisma.testimonial.count({
    where: { instituto: adminInstituto, status: "APROBADO" }
  });

  const pendientes = await prisma.testimonial.count({
    where: { instituto: adminInstituto, status: "PENDIENTE" }
  });

  const rechazados = await prisma.testimonial.count({
    where: { instituto: adminInstituto, status: "RECHAZADO" }
  });

  const lastestTestimonials = await prisma.testimonial.findMany({
    where: { instituto: adminInstituto },
    take: 4, // Solo los últimos 4 para el dashboard
    orderBy: { createdAt: 'desc' },
    include: {
      category: true, // Necesario para t.category.name
      tags: true      // Necesario para la lista de tags
    }
  });

  const topTestimonials = await prisma.testimonial.findMany({
    where: { instituto: adminInstituto },
    orderBy: { views: 'desc' }, 
    take: 4,
    include: {
      category: true
    }
  });

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
          value="3670" 
          icon={MdRemoveRedEye} 
          iconColor="text-blue-500" 
        />
        <StatCard 
          title="Clicks totales" 
          value="249" 
          icon={MdTouchApp} 
          iconColor="text-brand" 
        />
        <StatCard 
          title="Rating promedio" 
          value="4.1" 
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

      <div className="flex flex-col lg:flex-row gap-10 mt-10 bg-cards p-6 rounded-3xl border border-border ">

        <div className="mt-10">
          {/* Últimos testimonios */}
          <LastestTestimonials testimonials={lastestTestimonials} />
        </div>
        <div className="mt-10">
          {/* Testimonios más vistos */}
          <TopTestimonial data={topTestimonials} />
        </div>

      </div>


    </div>
  );
}