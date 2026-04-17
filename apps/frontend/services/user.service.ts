// services/users.service.ts
import { api } from "@/lib/api";
import { UserFromDB } from "@/types";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "EDITOR" | "VISITOR";
  organization?: string;
}

export const createUser = async (payload: CreateUserPayload): Promise<UserFromDB> => {
  console.log("Creando usuario con payload:", payload);
  const { data } = await api.post("/auth/register", payload);
  return data.data.user;
};

export const deleteUser = async (id: string, name: string | null) => {
  try {
    const { data } = await api.delete(`/users/${id}`);
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || `Error al eliminar el usuario, \`${name || "usuario desconocido"}\``,
    };
  }
};