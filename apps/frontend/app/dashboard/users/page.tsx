"use client";
import TituloPage from "@/components/tituloPage";
import UserTable from "@/components/UserTable";
import BtnNewUser from "@/components/BtnNewUser";
import { useAuth } from "@/hooks/useAuth"; 
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Users = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  // Seguridad de rol: solo ADMIN
  if (user.role !== "ADMIN") {
    router.push("/dashboard");
    return null;
  }

  const masterAdminId = user.id;
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users?adminId=${masterAdminId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUsersList(data);
        } else {
          console.warn("⚠️ El Backend respondió con error o no existe la ruta.");
        }
      } catch (error) {
        console.error("🌐 Error de conexión con el servidor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [masterAdminId]);

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <TituloPage titulo="Usuarios" descripcion="Gestiona los usuarios de tu CMS." />
        </div>
        <BtnNewUser adminId={masterAdminId} />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-chalk">
        <UserTable users={usersList} />
      </div>
    </div>
  );
};

export default Users;