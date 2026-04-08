"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { register as registerUser } from "@/services/auth.service";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

// ✅ Schema con confirmPassword
const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre es obligatorio"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const response = await registerUser({
        ...data,
        role: "ADMIN", 
      });

      // ✅ usar directamente token + user
      login(response.token, response.user);

      toast.success("Cuenta de ADMIN creada correctamente");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Error al registrarse");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-txtPrimary">
      <div className="w-full max-w-md bg-txtSecondary p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-dark">
          Crear cuenta
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* NAME */}
          <div>
            <div className="relative">
              <MdPerson className="absolute left-3 top-3 text-lg" />
              <input
                {...register("name")}
                placeholder="Nombre"
                className="w-full pl-10 p-3 rounded-xl"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <div className="relative">
              <MdEmail className="absolute left-3 top-3 text-lg" />
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full pl-10 p-3 rounded-xl"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <MdLock className="absolute left-3 top-3 text-lg" />
              <input
                {...register("password")}
                type="password"
                placeholder="Contraseña"
                className="w-full pl-10 p-3 rounded-xl"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <div className="relative">
              <MdLock className="absolute left-3 top-3 text-lg" />
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirmar contraseña"
                className="w-full pl-10 p-3 rounded-xl"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl"
          >
            {isSubmitting ? "Creando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          ¿Ya tenés cuenta?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-primary cursor-pointer font-bold"
          >
            Iniciar sesión
          </span>
        </p>
      </div>
    </div>
  );
}