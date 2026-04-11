"use client";

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import TituloPage from "@/components/tituloPage";
import AddUserModal from "@/components/modals/AddUserModal";
import UserTable from "@/components/UserTable";
import { createUser } from "@/services/user.service";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Para sacar el adminId

export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth(); // Aquí está nuestro adminId
  const router = useRouter();

 
  // Si el usuario es admin, su adminId es él mismo (user.id), 
  // si es editor, el adminId es el de su jefe.
  //const masterAdminId = user?.adminId || user?.id;

  const handleAddUser = async (data: any) => {
    const loadingToast = toast.loading("Creando usuario...");
    
    try {
      // Usamos el servicio EXACTAMENTE como ella lo definió
      // 'data' ya trae name, email y role desde el formulario del modal
      const result = await createUser(data);

      if (result) {
        toast.success("Usuario creado con éxito", { id: loadingToast });
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (error: any) {
      // Manejo de errores basado en la respuesta de Axios
      const msg = error.response?.data?.message || "Error al crear el usuario";
      toast.error(msg, { id: loadingToast });
    }
  };
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <TituloPage titulo="Usuarios" descripcion="Gestiona los usuarios de tu CMS." />
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-secondary flex items-center gap-2"
        >
          <MdAdd size={24} />
          Nuevo usuario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-chalk">
        <UserTable users={initialUsers} />
      </div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddUser}
      />
    </div>
  );
}