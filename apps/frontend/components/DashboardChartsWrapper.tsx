"use client";

import dynamic from "next/dynamic";
import { MdTrendingUp, MdMouse } from "react-icons/md";
import InfoTooltip from "./InfoTooltip";
import ExportButton from "./ExportButton";



// Importación dinámica de los gráficos
const TrendsChart = dynamic(() => import("./DashboardCharts").then(mod => mod.TrendsChart), { 
  ssr: false,
  loading: () => <div className="h-80 w-full bg-dark/20 animate-pulse rounded-3xl" />
});

const AuthenticityPie = dynamic(() => import("./DashboardCharts").then(mod => mod.AuthenticityPie), { 
  ssr: false,
  loading: () => <div className="h-80 w-full bg-dark/20 animate-pulse rounded-3xl" />
});

interface ChartsWrapperProps {
  lineData: any[];
  pieData: any[];
  engagementRate: string;
  conversionRate: string;
}

export default function DashboardChartsWrapper({ 
  lineData, 
  pieData, 
  engagementRate, 
  conversionRate 
}: ChartsWrapperProps) {

  return (
    <div className="space-y-6 mt-10">
      {/* Fila Superior: Gráfico de Tendencias + Métricas de Impacto */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Gráfico Principal: Tendencias (Ocupa 2/3) */}
        <div className="lg:w-2/3">
          <TrendsChart data={lineData} />
        </div>

        {/* Métricas de Impacto Lado Derecho (Ocupa 1/3) */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          {/* Card de Engagement */}
          <div className="bg-dark/40 p-6 rounded-3xl border border-border flex items-center justify-between">
            <div>
              <InfoTooltip title="¿Qué significa esta métrica?" description="Es el promedio de interés que despierta cada testimonio. Se calcula dividiendo las vistas totales por la cantidad de testimonios. ¡A mayor número, más viral es tu contenido!" />
              <p className="text-txtSecondary text-sm">Engagement Rate</p>
              <h4 className="text-2xl font-bold text-txtPrimary">{engagementRate} <span className="text-sm font-normal text-brand">pts</span></h4> 
            </div>
            <MdTrendingUp className="text-4xl text-primary opacity-80" />
          </div>

          {/* Card de Conversión */}
          <div className="bg-dark/40 p-6 rounded-3xl border border-border flex items-center justify-between">
            <div>
              <InfoTooltip title="¿Qué significa esta métrica?" description="Muestra el porcentaje de personas que, tras ver un testimonio, realizaron una acción (click). Es el indicador más real de cuánto están ayudando los testimonios a tu negocio." />
              <p className="text-txtSecondary text-sm">Tasa de Conversión</p>
              <h4 className="text-2xl font-bold text-txtPrimary">{conversionRate}%</h4>
              
            </div>
            <MdMouse className="text-4xl text-blue-500 opacity-80" />
          </div>
          
        {/* Export Button */}
          <ExportButton data={lineData} fileName="Estadisticas_Testimonios" />
        
        </div>
      </div>

      {/* Fila Inferior: Gráfico de Autenticidad (Puedes ponerlo al lado de otra cosa luego) */}
      <div className="flex flex-col lg:flex-row gap-6">
        <AuthenticityPie data={pieData} />
        
        {/* Espacio para un tercer gráfico futuro (ej: Top Institutos) */}
        <div className="lg:w-2/3 bg-dark/20 rounded-3xl border border-dashed border-border flex items-center justify-center text-txtSecondary italic">
          Próximamente: Análisis por Categorías
        </div>
      </div>
    </div>
  );
}