"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import AddUserModal from "@/components/modals/AddUserModal";
import { createUser } from "@/services/user.service";
import { useAuth } from "@/hooks/useAuth";
import type { UserFromDB } from "../types/index";

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "EDITOR" | "VISITOR";
  organization?: string;
}

interface BtnNewUserProps {
  onUserCreated: () => Promise<void> | void;
}

const BtnNewUser = ({ onUserCreated }: BtnNewUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

const handleSubmit = async (formData: CreateUserPayload) => {
  if (!user || user.role !== "ADMIN") {
    toast.error("Solo un administrador puede crear usuarios");
    return;
  }

  const loadingToast = toast.loading("Creando usuario...");

  try {
    await createUser(formData);

    toast.success("Usuario creado correctamente", { id: loadingToast });
    setIsOpen(false);
    await onUserCreated();
  } catch (error: any) {
    console.error(error);

    const rawMessage =
      error?.response?.data?.message ?? error?.response?.data?.error;

    const msg =
      typeof rawMessage === "string"
        ? rawMessage
        : rawMessage?.message ||
          rawMessage?.code ||
          "Error al crear el usuario";

    toast.error(msg, { id: loadingToast });
  }
};

  return (
    <>
      <button
        onClick={() => {
          if (!user || user.role !== "ADMIN") {
            toast.error("Solo un administrador puede crear usuarios");
            return;
          }
          setIsOpen(true);
        }}
        className="btn-primary flex items-center gap-2"
      >
        <MdAdd size={20} />
        Nuevo usuario
      </button>

      <AddUserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default BtnNewUser;