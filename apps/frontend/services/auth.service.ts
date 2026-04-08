import { api } from "@/lib/api";

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data.data; // { token, user }
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "EDITOR" | "VISITOR";
}) => {
  const { data } = await api.post("/auth/register", payload);
  return data.data;
};