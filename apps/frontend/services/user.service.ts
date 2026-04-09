// services/users.service.ts
import { api } from "@/lib/api";

export const createUser = async (payload: {
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VISITOR";
}) => {
  const { data } = await api.post("/users", payload);
  return data.data;
};

export const deleteUser = async (id: string) => {
  try {
    const { data } = await api.delete(`/users/${id}`);
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Error al eliminar el usuario",
    };
  }
};