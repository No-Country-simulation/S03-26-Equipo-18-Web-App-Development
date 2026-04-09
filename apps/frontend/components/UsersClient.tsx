"use client";

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import TituloPage from "@/components/tituloPage";
import AddUserModal from "@/components/modals/AddUserModal";
import UserTable from "@/components/UserTable";
import { createUserAction } from "@/lib/actions/user-actions";
import { toast } from "react-hot-toast";

// Este componente recibe los usuarios como "prop"
export default function UsersClient({ initialUsers }: { initialUsers: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const adminInstituto = "No-Country";

  const handleAddUser = async (data: any) => {
    const result = await createUserAction(data, adminInstituto);
    if (result.success) {
      toast.success("Usuario creado");
      setIsModalOpen(false);
    } else {
      toast.error(result.error || "Error");
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <TituloPage titulo="Usuarios" descripcion="Gestiona los usuarios de tu CMS." />
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-secondary flex items-center gap-2 hover:bg-dark/50 hover:text-white"
        >
          <MdAdd size={24} />
          Nuevo usuario
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-chalk">
        {/* Le pasamos los usuarios a la tabla */}
        <UserTable users={initialUsers} />
      </div>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddUser}
        adminInstituto= {adminInstituto}
      />
    </div>
  );
}