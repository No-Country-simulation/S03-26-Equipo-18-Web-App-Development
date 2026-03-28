import TituloPage from "@/components/tituloPage";
import TestimonialCard from "@/components/TestimonialCard";
import SearchInput from "@/components/ui/SearchInput";

import { prisma } from "@/lib/prisma";


//Nota: Next.js pasa automáticamente 'searchParams' como prop a los componentes de página, pero como no lo estamos usando directamente aquí, podemos omitirlo. Si en el futuro necesitamos acceder a los parámetros de búsqueda, podemos usar el hook 'useSearchParams' dentro del componente.

const Testimonials = async (
  {
  searchParams,
}: {
  searchParams: { query?: string };
}
)=>{

  const query = searchParams?.query || "";

  const testimonials = await prisma.testimonial.findMany({
    where: {
      // Filtro inteligente: busca en nombre, contenido o nombre del tag
      OR: [
        { userName: { contains: query } },
        { content: { contains: query } },
        { status: { contains: query } },
        { category: { name: { contains: query } } },
        { tags: { some: { name: { contains: query } } } },
      ],
    },
    include: {
      tags: true,
      category: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });  

  return (
    <div>
      <TituloPage 
          titulo="Testimonios" 
          descripcion={query 
          ? `Resultados para "${query}": ${testimonials.length}` 
          :`${testimonials.length} testimonios en total`} />

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
          <SearchInput />
          {/* <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-75">
              <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-medium text-xl" />
              <input 
                type="text" 
                placeholder="Buscar por nombre, contenido, categoria o tag..."
                className="w-full pl-12 pr-4 py-3 bg-white/90 focus:bg-white rounded-2xl border-none outline-none shadow-sm text-sm"
              />
            </div>
            
            <button className="bg-dark/20 hover:bg-dark/30 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold transition-all uppercase text-xs tracking-widest">
              BUSCAR
            </button>
          </div> */}
      {/* GRID DE TESTIMONIOS */}
      <div className="p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="cursor-pointer hover:scale-[1.02] transition-transform">
               {/* Pasamos los datos a la Card que creamos antes */}
               <TestimonialCard 
                userName={t.userName}
                content={t.content}
                rating={t.rating}
                location={t.location ?? ""}
                category={t.category.name}
                status={t.status}
                tags={t.tags} 
              />
            </div>
          ))}
        </div>   
        {testimonials.length === 0 && (
          <div className="text-center py-20 text-medium">
            <p>No se encontraron testimonios. Prueba ajustando los filtros.</p>
          </div>
        )} 

    </div>

    </div>
  )



}

export default Testimonials
