"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useRouter} from "next/navigation";
import { MdEmail, MdLock, MdError } from "react-icons/md";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

//1° Definimos el esquema de zod
const loginSchema = z.object({
    email: z.string().email("El correo electrónico no es válido").min(1, "El correo es obligatorio"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(20, "La contraseña no puede tener más de 20 caracteres").min(1, "La contraseña es obligatoria"),  
});

//2° Creamos el tipo de datos a partir del esquema
type LoginData = z.infer<typeof loginSchema>;

//3° Creamos el componente de Login
const LoginPage = () => {
    const router = useRouter();

//4° Configuramos react-hook-form con zod
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema), //conectamos zod con react-hook-form
    }); 

//5° Función para manejar el envío del formulario
    const onSubmit = async (data: LoginData) => {
        console.log("Datos del formulario:", data);
      try {
          // 5°1. Llamamos a NextAuth con el proveedor "credentials"
          const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false, // Evitamos redirección automática para manejar errores aquí
          });

          if (result?.error) {
            // 5°2. Si hay error mostramos notificación
            toast.error("Correo o contraseña incorrectos");
            return;
          }

          // 5°3. Si tiene éxito
          toast.success("¡Bienvenido de nuevo!");
          router.push("/dashboard");
          router.refresh(); // Forzamos la actualización de la sesión en el layout
          
      } catch (error) {
          toast.error("Ocurrió un error inesperado. Intenta de nuevo.");
      }
    }

    return(
// Contenedor principal: Ocupa todo el alto de la pantalla
    <div className="bg-txtPrimary min-h-screen grid grid-cols-1 lg:grid-cols-2">
      
      {/* SECCIÓN IZQUIERDA: Branding (Solo visible en pantallas grandes LG) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-dark rounded-l-4xl p-12 text-txtPrimary">
        <div className="max-w-sm text-center">
          {/* Logo en blanco para que resalte sobre el verde */}
          <div className="inline-block">
            <Image 
              src="/image/logo/logo.png" 
              alt="Logo NoStories" 
              width={500} 
              height={500} 
              priority
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">Son testimonios. Fin</h2>
          <p className="text-txtPrimary text-lg">
            Gestiona, modera y distribuye testimonios de tu institución desde un solo lugar.
          </p>
        </div>
      </div>

      {/* SECCIÓN DERECHA: Formulario */}
      <div className="flex items-center justify-center bg-txtSecondary rounded-r-4xl p-8 lg:p-20">
        <div className="w-full max-w-100">
          
          {/* Header del Formulario */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-dark mb-2">Iniciar sesión</h1>
            <p className="text-txtSecondary text-sm">Ingresa tus credenciales para acceder al panel</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Input Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark ml-1">Correo electrónico</label>
              <div className="relative">
                <MdEmail className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl ${errors.email ? 'text-red-500' : 'text-txtSecondary'}`} />
                <input 
                  {...register("email")}
                  type="email" 
                  placeholder="janedoe@edutech.com"
                  className={`w-full pl-12 pr-4 py-3.5 bg-dark rounded-xl border-2 transition-all outline-none ${
                    errors.email ? 'border-red-500 shadow-sm shadow-red-100' : 'border-transparent focus:border-primary shadow-sm'
                  }`}
                />
              </div>
              {errors.email && <p className="flex items-center gap-2 text-red-500 text-xs font-bold ml-1"><MdError /> {errors.email.message}</p>}
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-dark ml-1">Contraseña</label>
              <div className="relative">
                <MdLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl ${errors.password ? 'text-red-500' : 'text-medium'}`} />
                <input 
                  {...register("password")}
                  type="password" 
                  placeholder="********"
                  className={`w-full pl-12 pr-4 py-3.5 bg-dark rounded-xl border-2 transition-all outline-none ${
                    errors.password ? 'border-red-500 shadow-sm shadow-red-100' : 'border-transparent focus:border-primary shadow-sm'
                  }`}
                />
              </div>
              {errors.password && <p className="flex items-center gap-2 text-red-500 text-xs font-bold ml-1"><MdError /> {errors.password.message}</p>}
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/70 text-txtPrimary font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-wide mt-4"
            >
              {isSubmitting ? "Cargando..." : "Ingresar"}
            </button>
          </form>

        </div>
      </div>
    </div>


    )
}
export default LoginPage;
