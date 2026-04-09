import TituloPage from "@/components/tituloPage";
import TestimonialsClient from "@/components/TestimonialsClient";
import SearchInput from "@/components/ui/SearchInput";
import { StatusFilters } from "@/components/ui/StatusFilter";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Testimonials = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; status?: string }>;
}) => {
  // Usamos nuestro hook propio
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login"); // redirige si no hay usuario logueado
    return null;
  }
  const masterAdminId = user.id;

  // const masterAdminId = user.adminId || user.id;

  const params = await searchParams;
  const query = params?.query || "";
  const status = params?.status || "";

  // Construimos queryParams para la API
  const queryParams = new URLSearchParams({
    adminId: masterAdminId,
    ...(query && { query }),
    ...(status && { status }),
  }).toString();

  let testimonials = [];
  let categories = [];
  let allTags = [];

  try {
    const [resTestimonials, resCategories, resTags] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials?${queryParams}`, { next: { revalidate: 0 } }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, { next: { revalidate: 3600 } }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`, { next: { revalidate: 3600 } }),
    ]);

    if (resTestimonials.ok) testimonials = await resTestimonials.json();
    if (resCategories.ok) categories = await resCategories.json();
    if (resTags.ok) allTags = await resTags.json();
  } catch (error) {
    console.error("Error cargando datos de testimonios:", error);
  }

  return (
    <div>
      <TituloPage 
        titulo="Gestor de Testimonios" 
        descripcion={
          query
            ? `Gestione y edite los resultados para "${query}": ${testimonials.length}`
            : `Edite y modere ${testimonials.length} testimonios en total`
        }
      />

      <StatusFilters />

      <div className="px-8 mb-6">
        <SearchInput />
      </div>

      <div className="px-8 pb-12 max-w-7xl mx-auto">
        <TestimonialsClient
          testimonials={testimonials}
          categories={categories}
          allTags={allTags}
        />
      </div>
    </div>
  );
};

export default Testimonials;