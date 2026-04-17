import { api } from "@/lib/api";
import axios from "axios";
import {
  ApiResponse,
  TestimonialCardProps,
  Category,
  Tag,
} from "@/types";

type GetTestimonialsParams = {
  query?: string;
  status?: string;
};

const logAxiosError = (label: string, error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error(`❌ ${label}:`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
  } else {
    console.error(`❌ ${label}:`, error);
  }
};

export const getAllTestimonials = async (
  filters: GetTestimonialsParams = {}
): Promise<TestimonialCardProps[]> => {
  try {
    const params: Record<string, string> = {};

    if (filters.query?.trim()) {
      params.query = filters.query.trim();
    }

    if (filters.status?.trim()) {
      params.status = filters.status.trim();
    }

    const response = await api.get<ApiResponse<TestimonialCardProps[]>>(
      "/api/private/testimonials",
      { params }
    );

    return response.data.data ?? [];
  } catch (error) {
    logAxiosError("Error al obtener testimonios", error);
    return [];
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<ApiResponse<Category[]>>(
      "/api/private/categories"
    );
    return response.data.data ?? [];
  } catch (error) {
    logAxiosError("Error al obtener categorías", error);
    return [];
  }
};

export const getTags = async (): Promise<Tag[]> => {
  try {
    const response = await api.get<ApiResponse<Tag[]>>(
      "/api/private/tags"
    );
    return response.data.data ?? [];
  } catch (error) {
    logAxiosError("Error al obtener tags", error);
    return [];
  }
};