"use client"

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddUserModal from "./modals/AddUserModal";// Asegúrate de que la ruta sea correcta
import { createUserAction } from "@/lib/actions/user-actions";
import { toast } from "react-hot-toast";



interface Props {
  adminId: string;

}


const BtnNewUser = ({ adminId }: Props ) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddUser = async (data: any) => {
        const result = await createUserAction(data, adminId);
        if (result.success) {
            toast.success("¡Usuario creado!");
            setIsModalOpen(false);
        // Opcional: window.location.reload() para actualizar la lista, aunque lo ideal sería actualizar el estado en lugar de recargar
        } else {
            toast.error(result.error || "Error al crear");
        }
    };


  return (
<>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn-primary flex items-center gap-2 hover:bg-txtPrimary hover:text-primary transition-all"
      >
        <MdAdd size={24} />
        Nuevo usuario
      </button>

      <AddUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddUser}
        adminId= {adminId}
      />
    </>
  )
}

export default BtnNewUser
