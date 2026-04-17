"use client";

import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const userSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z
    .string()
    .email("Introduce un correo electrónico válido")
    .min(1, "El correo es obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.enum(["ADMIN", "EDITOR", "VISITOR"]),
});

type UserFormData = z.infer<typeof userSchema>;

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void | Promise<void>;
}

const AddUserModal = ({ isOpen, onClose, onSubmit }: AddUserModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "EDITOR",
    },
  });

  if (!isOpen) return null;

  const handleInternalSubmit = async (data: UserFormData) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="bg-primary p-6 text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Agregar Usuario</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={isSubmitting}
            >
              <MdClose size={24} />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(handleInternalSubmit)}
            className="p-8 space-y-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">
                NOMBRE COMPLETO
              </label>
              <input
                {...register("name")}
                placeholder="Ej: Jane Doe"
                className="w-full p-4 text-medium bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm font-semibold"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">
                CORREO ELECTRÓNICO
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="janedoe@edutech.com"
                className="w-full p-4 text-medium bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm font-semibold"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">
                CONTRASEÑA
              </label>
              <input
                type="password"
                {...register("password")}
                placeholder="Mínimo 6 caracteres"
                className="w-full p-4 text-medium bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm font-semibold"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">
                ROL
              </label>
              <select
                {...register("role")}
                className="w-full p-4  text-medium bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm font-semibold"
              >
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Administrador</option>
                <option value="VISITOR">Visitante</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gray-200 text-dark font-bold rounded-xl hover:bg-gray-300 disabled:opacity-60"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-60"
              >
                {isSubmitting ? "CREANDO..." : "AGREGAR"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;