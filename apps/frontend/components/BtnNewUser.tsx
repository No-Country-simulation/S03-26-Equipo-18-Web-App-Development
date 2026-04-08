"use client"

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddUserModal from "./modals/AddUserModal";
import { createUserAction } from "@/lib/actions/user-actions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/dist/client/components/navigation";



interface Props {
  adminId: string;

}


const BtnNewUser = ({ adminId }: Props ) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const handleAddUser = async (data: any) => {
    const loadingToast = toast.loading("Creando usuario y enviando invitación...");

        try {
          const response = await fetch("/api/users/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al crear el usuario");
          }

          toast.success("¡Usuario creado! Se envió el email de bienvenida", { id: loadingToast });
          setIsModalOpen(false);
          router.refresh(); 
        } catch (error: any) {
          toast.error(error.message, { id: loadingToast });
        }
    };


  return (
<>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="btn-primary flex items-center gap-2 hover:bg-txtPrimary hover:text-primary transition-all"
      >
        <MdAdd size={24} />
        <span>NUEVO USUARIO</span>
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
