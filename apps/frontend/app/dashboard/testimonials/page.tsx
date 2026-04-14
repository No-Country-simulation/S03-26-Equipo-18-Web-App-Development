"use client";

import { useEffect, useState } from "react";
import TituloPage from "@/components/tituloPage";
import TestimonialsClient from "@/components/TestimonialsClient";
import SearchInput from "@/components/ui/SearchInput";
import { StatusFilters } from "@/components/ui/StatusFilter";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

const Testimonials = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams({
          adminId: user.id,
          ...(query && { query }),
          ...(status && { status }),
        }).toString();

        const [resTestimonials, resCategories, resTags] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/testimonials?${queryParams}`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags`),
        ]);

        if (resTestimonials.ok) {
          const data = await resTestimonials.json();
          setTestimonials(data);
        }

        if (resCategories.ok) {
          const data = await resCategories.json();
          setCategories(data);
        }

        if (resTags.ok) {
          const data = await resTags.json();
          setAllTags(data);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, query, status]);

  // 🔥 loading + auth control
  if (!user || loading) {
    return <div className="p-8">Cargando...</div>;
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