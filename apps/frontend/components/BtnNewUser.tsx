"use client";

import { useRouter } from "next/navigation";
import { createUser } from "@/services/user.service";
import { toast } from "react-hot-toast";

const BtnNewUser = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const newUser = await createUser({
        name: "Juan Pérez",
        email: "juan@example.com",
        role: "EDITOR",
      });

      toast.success("Usuario creado correctamente");
      router.push(`/dashboard/users/${newUser.id}`);
    } catch (error: any) {
      console.error(error);
      toast.error("Error al crear el usuario");
    }
  };

  return (
    <button onClick={handleClick} className="btn-primary">
      Nuevo Usuario
    </button>
  );
};

export default BtnNewUser;