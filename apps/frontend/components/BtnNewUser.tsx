"use client"

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddUserModal from "./modals/AddUserModal";

import { toast } from "react-hot-toast";
import { useRouter } from "next/dist/client/components/navigation";
import api from "@/lib/axios"; 



interface Props {
  adminId: string;

}


const BtnNewUser = ({ adminId }: Props ) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const handleAddUser = async (data: any) => {
    const loadingToast = toast.loading("Creando usuario y enviando invitación...");

        try {
          await api.post("/users", {
            ...data,
            adminId // Nos aseguramos de enviar quién lo crea
          });

          toast.success("¡Usuario creado! Se envió el email de bienvenida", { id: loadingToast });
          setIsModalOpen(false);
          router.refresh(); 

        } catch (error: any) {
          // Axios captura errores de status 400, 401, 500 etc. aquí
          const message = error.response?.data?.error || "Error al conectar con el servidor";
          toast.error(message, { id: loadingToast });
          console.error("Error en handleAddUser:", error);
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
