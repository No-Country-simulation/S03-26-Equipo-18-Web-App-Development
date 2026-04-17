"use client";
import TituloPage from "@/components/tituloPage";
import UserTable from "@/components/UserTable";
import BtnNewUser from "@/components/BtnNewUser";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { UserFromDB } from "../../../types/index";

const Users = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [usersList, setUsersList] = useState<UserFromDB[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/users");
      setUsersList(response.data.data);
    } catch (error) {
      console.error("🌐 Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    if (user.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }

    fetchUsers();
  }, [user, router, fetchUsers]);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  const handleUserDeleted = async () => {
    await fetchUsers();
  };

  const handleUserCreated = async () => {
    await fetchUsers();
  };

  if (!user) return <div>Cargando sesión...</div>;
  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <TituloPage
            titulo="Usuarios"
            descripcion="Gestiona los usuarios de tu CMS."
          />
        </div>
        <BtnNewUser onUserCreated={handleUserCreated} />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-chalk">
        <UserTable users={usersList} onDeleteSuccess={handleUserDeleted} />
      </div>
    </div>
  );
};

export default Users;