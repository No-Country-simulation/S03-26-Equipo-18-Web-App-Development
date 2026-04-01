import {useForm } from "react-hook-form";
import { MdClose, MdSave, MdPersonAdd } from "react-icons/md";  
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


//Reglas de validación para el formulario usando Zod
const userSchema = z.object({
  username: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Introduce un correo electrónico válido").min(1, "El correo es obligatorio"),
  role: z.string(), 
});

// Esto extrae el tipo de TypeScript automáticamente del esquema
type UserFormData = z.infer<typeof userSchema>;

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    adminInstituto: string; // Para heredar el instituto del Admin
    onSubmit: (data: UserFormData) => void;
}   


    const AddUserModal = ({ isOpen, onClose, adminInstituto, onSubmit }: AddUserModalProps) => {
        const { 
            register, 
            handleSubmit, 
            reset, 
            formState: { errors } } = useForm<UserFormData>({
                resolver: zodResolver(userSchema),
                defaultValues: {
                    role: "EDITOR",
            }
    });


    if (!isOpen) return null;

    const handleInternalSubmit = (data: UserFormData) => {
        onSubmit(data);
        reset(); // Limpia el formulario al terminar
        onClose(); // Cierra el modal después de enviar los datos
    };



  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200"> 
            {/* HEADER DEL MODAL */}
            <div className="bg-brand p-6 text-white flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Agregar Usuario</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <MdClose size={24} />
                </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(handleInternalSubmit)} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">NOMBRE COMPLETO</label>
                <input 
                  {...register("username")}
                  placeholder="Ej: Jane Doe"
                  className="w-full p-4 bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-brand outline-none text-sm font-semibold"
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">CORREO ELECTRÓNICO</label>
                <input 
                  {...register("email")}
                  placeholder="janedoe@edutech.com"
                  className="w-full p-4 bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-brand outline-none text-sm font-semibold"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">ROL</label>
                <select 
                  {...register("role")}
                  className="w-full p-4 bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-brand outline-none text-sm font-semibold"
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-200 text-dark font-bold rounded-xl hover:bg-gray-300"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-brand text-white font-bold rounded-xl hover:opacity-90"
                >
                  AGREGAR
                </button>
              </div>
            </form>
        </div>

      </div>
      
    </div>
  )
}

export default AddUserModal
