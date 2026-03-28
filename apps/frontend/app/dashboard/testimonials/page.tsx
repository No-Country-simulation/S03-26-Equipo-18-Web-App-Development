import { prisma } from "@/lib/prisma";
import TituloPage from "@/components/tituloPage";
import TestimonialsClient from "@/components/TestimonialsClient";
import SearchInput from "@/components/ui/SearchInput";
import { StatusFilters } from "@/components/ui/StatusFilter";



//Nota: Next.js pasa automáticamente 'searchParams' como prop a los componentes de página, pero como no lo estamos usando directamente aquí, podemos omitirlo. Si en el futuro necesitamos acceder a los parámetros de búsqueda, podemos usar el hook 'useSearchParams' dentro del componente.

const Testimonials = async (
  {
    searchParams,
  }: {
    searchParams: Promise<{ query?: string; status?: string }>;
  }
)=>{

  const params = await searchParams;
  const query = params?.query || "";
  const status = params?.status || "";

  // 1. Creamos el objeto 'where' vacío
  let finalWhere: any = {};

  // 2. Si hay status Y query, usamos AND
  if (status && query) {
    finalWhere = {
      AND: [
        { status: status as any },
        {
          OR: [
            { userName: { contains: query} },
            { content: { contains: query} },
            { location: { contains: query} },
            { tags: { some: { name: { contains: query} } } },
          ],
        },
      ],
    };
  } 
  // 3. Si SOLO hay status
  else if (status) {
    finalWhere = { status: status as any };
  } 
  // 4. Si SOLO hay query
  else if (query) {
    finalWhere = {
      OR: [
        { userName: { contains: query } },
        { content: { contains: query, } },
        { location: { contains: query, } },
        { tags: { some: { name: { contains: query, } } } },
      ],
    };
  }

  // const testimonials = await prisma.testimonial.findMany({
  //   where: {
  //     // Filtro inteligente: busca en nombre, contenido o nombre del tag
  //     OR: [
  //       { userName: { contains: query } },
  //       { content: { contains: query } },
  //       { status: { contains: query } },
  //       { category: { name: { contains: query } } },
  //       { tags: { some: { name: { contains: query } } } },
  //     ],
  //   },
  //   include: {
  //     tags: true,
  //     category: true,
  //     user: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  // });  
  


console.log("--- DEBUG MODERACIÓN ---");
console.log("Query de texto:", query);
console.log("Status de la URL:", status);
console.log("Objeto WHERE que enviamos a Prisma:", JSON.stringify(finalWhere, null, 2));
 

  const [testimonials, categories, allTags] = await Promise.all([
      prisma.testimonial.findMany({
          where: finalWhere,
          include: { tags: true, category: true, },
          orderBy: { createdAt: "desc" },
        }),
        prisma.category.findMany(), // Necesitamos las categorías para el select del Modal
        prisma.tag.findMany({
          orderBy: { name: 'asc' }
      }) // Necesitamos todos los tags para el checkbox del Modal
  ]);


  return (
    <div>
      <TituloPage 
          titulo="Panel de Moderación" 
          descripcion={query 
          ? `Resultados para "${query}": ${testimonials.length}` 
          :`${testimonials.length} testimonios en total`} />

      <StatusFilters />      

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <div className="px-8 mb-6">
        <SearchInput />
      </div>

      {/* GRID DE TESTIMONIOS */}

      <div className="px-8 pb-12 max-w-7xl mx-auto">
        {/* Pasamos toda la lógica al componente TestimonialsClient */}
        <TestimonialsClient 
          testimonials={testimonials} 
          categories={categories} 
          allTags={allTags}
        />
      </div>

    </div>
  )



}

export default Testimonials
