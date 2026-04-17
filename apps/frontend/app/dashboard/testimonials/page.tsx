"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAllTestimonials,
  getCategories,
  getTags,
} from "@/services/testimonials.service";
import { TestimonialCardProps, Category, Tag } from "@/types";

import TituloPage from "@/components/tituloPage";
import TestimonialsClient from "@/components/TestimonialsClient";
import SearchInput from "@/components/ui/SearchInput";
import { StatusFilters } from "@/components/ui/StatusFilter";

const Testimonials = () => {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [testimonials, setTestimonials] = useState<TestimonialCardProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "";

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const loadPageData = async () => {
      setLoading(true);
      try {
        const [resT, resC, resTags] = await Promise.all([
          getAllTestimonials({ query, status }),
          getCategories(),
          getTags(),
        ]);

        setTestimonials(resT);
        setCategories(resC);
        setAllTags(resTags);
      } catch (error) {
        console.error("Error en la carga masiva:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [user, query, status, router]);

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