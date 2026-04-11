
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

