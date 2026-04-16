import { api } from "@/lib/api";
import { testimonialAdapter } from "@/adapters/testimonial.adapter"; // <-- Asegúrate de que esta ruta sea correcta
import { headers } from "next/dist/server/request/headers";

export const updateTestimonial = async (id: string, payload: any) => {
  try {
    const token = localStorage.getItem("token");

    // 1. "Traducción" de campos para el Backend
    const formattedPayload: any = {
      title: payload.title || "Testimonio actualizado", // El back pide título
      content: payload.content,
      authorName: payload.userName, // Cambiamos userName -> authorName
      authorCompany: payload.location, // Cambiamos location -> authorCompany
      status: payload.status,
      categoryId: payload.categoryId,
      tagIds: payload.tagIds || [], // El back espera array de IDs
    };

    // 2. Limpieza: Eliminamos campos que el Backend no reconoce (como userName)
    // El backend es estricto y si le mandas "userName" te dará Error 400
    
    const { data } = await api.put(`/api/private/testimonials/${id}`, formattedPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Error detalle:", error.response?.data);
    return {
      success: false,
      error: error.response?.data?.message || "Error al actualizar el testimonio",
    };
  }
};

export const getAllTestimonials = async (params?: { query?: string; status?: string }) => {
  try {
    const token = localStorage.getItem("token");

    const paramsToSend: any = {};

    if (params?.query) paramsToSend.q = params.query;
    if (params?.status && params.status !== "") paramsToSend.status = params.status;

    const { data } = await api.get("/api/private/testimonials", {
      params: paramsToSend, // Solo enviamos lo que tiene valor
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // 1. Extraemos la data cruda (manejando data.data o solo data)
    const rawData = data.data?.items || data.items || data.data || data;
    console.log("📦 DATOS CRUDOS DEL BACK:", rawData);

    // 2. VALIDACIÓN ANTES DEL ADAPTADOR
    if (!Array.isArray(rawData)) {
    console.error("❌ ERROR: rawData no es un array. El adaptador va a fallar.");
    return { success: false, data: [] };
}

    // 3. ¡PASAMOS LA DATA POR EL ADAPTADOR!
    // Esto es lo que transforma authorName -> userName
    const cleanData = testimonialAdapter(rawData);
    
    console.log("✨ DATOS ADAPTADOS (Listos para el CMS):", cleanData);

    return { 
      success: true, 
      data: cleanData 
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log("ℹ️ El backend dice 404: Asumimos que la base de datos está vacía.");
      return { success: true, data: [] };
    }

    return {
      success: false,
      error: error.response?.data?.message || "Error de servidor",
    };
  }
};

// Servicios para categorías y tags
export const getCategories = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await api.get("/api/private/categories", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Siguiendo la estructura del backend: data.data suele ser donde vienen los items
    const categories = data.data || data;
    console.log("📂 Categorías cargadas:", categories);
    return categories;
  } catch (error: any) {
    console.error("❌ Error al obtener categorías:", error.response?.data || error.message);
    return []; 
  }
};

export const getTags = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await api.get("/api/private/tags", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const tags = data.data || data;
    console.log("🏷️ Tags cargados:", tags);
    return tags;
  } catch (error: any) {
    // Si da 404 es que el router de tags aún no está conectado en el backend
    console.warn("🚀 El endpoint de tags respondió con error. Usando lista vacía.");
    return [];
  }
};