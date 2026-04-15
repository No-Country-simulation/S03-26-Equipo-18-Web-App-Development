
import { api } from "@/lib/api";


export const updateTestimonial = async (id: string, payload: any) => {
  try {
    const { data } = await api.patch(`/testimonials/${id}`, payload);
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || "Error al actualizar el testimonio",
    };
  }
};



export const getAllTestimonials = async (params?: { query?: string; status?: string }) => {
  try {
    const { data } = await api.get("/testimonials", { params });
    return { 
      success: true, 
      data: data.data || data 
    };
  } catch (error: any) {
    // Si el error es 404, asumimos que la DB está vacía y devolvemos []
    if (error.response?.status === 404) {
      console.log("ℹ️ El backend dice 404: Asumimos que la base de datos está vacía.");
      return { success: true, data: [] }; // Devolvemos éxito pero sin datos
    }

    // Si es otro error (500, 401), sí es un problema real
    return {
      success: false,
      error: error.response?.data?.message || "Error de servidor",
    };
  }
};

// También necesitamos servicios para categorías y tags, para llenar los dropdowns del modal de edición
export const getCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    return data.data || data;
  } catch (error: any) {
    // Si da 404, devolvemos un array vacío para que TestimonialsClient no rompa
    console.warn("🚀 Backend: /categories no existe aún. Usando fallback.");
    return []; 
  }
};

export const getTags = async () => {
  try {
    const { data } = await api.get("/tags");
    return data.data || data;
  } catch (error: any) {
    console.warn("🚀 Backend: /tags no existe aún. Usando fallback.");
    return [];
  }
};