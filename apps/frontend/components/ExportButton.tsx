"use client";

import { MdDownload } from "react-icons/md";
import { toast } from "react-hot-toast";

interface ExportButtonProps {
  data: any[];
  fileName?: string;
}

export default function ExportButton({ data, fileName = "Reporte_NoStories" }: ExportButtonProps) {
  
  const handleExport = () => {
    try {
      if (!data || data.length === 0) {
        toast.error("No hay datos para exportar");
        return;
      }

      // 1. Definimos los encabezados (puedes adaptarlos según tus datos)
      const headers = ["Periodo", "Volumen", "Rating Promedio"];
      
      // 2. Convertimos los datos a filas de CSV
      const rows = data.map(item => [
        item.name, 
        item.volumen, 
        item.puntuacion?.toFixed(2) || "0"
      ]);

      // 3. Construimos el contenido
      const csvContent = [
        headers.join(","), 
        ...rows.map(e => e.join(","))
      ].join("\n");

      // 4. Lógica de descarga nativa
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      
      link.setAttribute("href", url);
      link.setAttribute("download", `${fileName}_${new Date().toLocaleDateString()}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("¡Reporte descargado!");
    } catch (error) {
      toast.error("Error al generar el archivo");
      console.error(error);
    }
  };

  return (
    <button 
      onClick={handleExport}
      className="mt-auto w-full bg-primary/10 hover:bg-primary/20 text-txtPrimary font-bold py-4 rounded-2xl transition-all border border-primary/30 flex items-center justify-center gap-2 group"
    >
      <MdDownload className="text-xl group-hover:translate-y-0.5 transition-transform" />
      <span>Exportar Analíticas (.CSV)</span>
    </button>
  );
}
