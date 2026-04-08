"use client";
import { useForm } from "react-hook-form";
import { MdClose, MdSave, MdCategory, MdLabel, MdCheckCircle } from "react-icons/md";
// import { updateTestimonialAction } from "@/lib/actions/testimonial-actions";
import api from "@/lib/axios"; //para reemplazar updateTestimonialAction
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


interface Tag {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Testimonial {
  id: string;
  userName: string;
  content: string;
  rating: number;
  location: string | null;
  videoUrl?: string;
  videoProvider?: string;
  status: "PENDIENTE" | "APROBADO" | "RECHAZADO";
  categoryId: string;
  userId: string;
  tags: { id: string; name: string }[];
}

interface TestimonialFormValues {
  status: string;
  categoryId: string;
  tagIds: string[];
  newTagsRaw: string;
}


interface EditTestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  categories: { id: string; name: string }[];
  allTags?: { id: string; name: string }[]; // Opcional, para gestionar tags
}


const EditTestimonialModal = ({ testimonial, isOpen, onClose, categories, allTags }: EditTestimonialModalProps) => {
  
    const router = useRouter();
    

    
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<TestimonialFormValues>({
            defaultValues: {
                status: testimonial?.status,
                categoryId: testimonial?.categoryId,
                tagIds: testimonial?.tags?.map((t: any) => t.id) || [],
                newTagsRaw: "",
            }
     }
    );

    useEffect(() => {
        if (testimonial) {
            reset({
            status: testimonial.status,
            categoryId: testimonial.categoryId,
            tagIds: testimonial.tags?.map((t: any) => t.id) || [],
            newTagsRaw: "",
            });
    }
    }, [testimonial, reset]);


  if (!isOpen || !testimonial) return null;

  const onSubmit = async (data: TestimonialFormValues) => {
    console.log("Actualizando testimonio:", testimonial.id, data);
    const loadingToast = toast.loading("Actualizando testimonio...");

    try {
      // 1. Petición PATCH con Axios
      // Enviamos el ID en la URL y los datos en el body
      await api.patch(`/testimonials/${testimonial.id}`, data);

      toast.success("¡Testimonio actualizado!", { id: loadingToast });
      
      onClose();
      
      // 2. Refrescamos los datos sin recargar la página entera
      router.refresh();
      
    } catch (error: any ) {
      const message = error.response?.data?.error || "Error al actualizar";
      toast.error(message, { id: loadingToast });
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* HEADER DEL MODAL */}
            <div className="bg-dark p-6 text-primary flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Gestionar Testimonio</h2>
                <p className="text-txtPrimary text-m uppercase font-semibold mt-1">
                De: {testimonial.userName}
                </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <MdClose size={24} />
            </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                
                {/* CAMPO: STATUS */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">
                    <MdCheckCircle className="text-primary" /> Estado del Testimonio
                    </label>
                    <select 
                    {...register("status")}
                    className="w-full p-4 bg-txtSecondary rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm font-semibold"
                    >
                    <option value="PENDIENTE">🕒 Pendiente de Revisión</option>
                    <option value="APROBADO">✅ Aprobado para Publicar</option>
                    <option value="RECHAZADO">❌ Rechazado</option>
                    </select>
                </div>

                {/* CAMPO: CATEGORÍA */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">
                    <MdCategory className="text-primary" /> Categoría Asignada
                    </label>
                    <select 
                    {...register("categoryId")}
                    className="w-full p-4 bg-txtSecondary rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm font-semibold"
                    >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                    </select>
                </div>

                {/* TAGS (MULTIPLE SELECTION) */}
                {/* SECCIÓN DE TAGS EXISTENTES */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase flex items-center gap-2 text-dark/60">
                        <MdLabel className="text-primary"/> Seleccionar Tags Existentes
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-4 bg-txtPrimary rounded-2xl border border-border max-h-40 overflow-y-auto">
                        {allTags && allTags.length > 0 ? (
                            allTags.map((tag: any) => (
                                <label 
                                key={tag.id} 
                                className="flex items-center gap-2 px-3 py-2 bg-txtSecondary rounded-xl border border-border cursor-pointer hover:border-primary/50 transition-all"
                                >
                                <input 
                                    type="checkbox" 
                                    value={tag.id} 
                                    {...register("tagIds")}
                                    className="w-4 h-4 accent-primary"
                                />
                                <span className="text-[11px] font-bold text-dark/70 uppercase">
                                    {tag.name}
                                </span>
                                </label>
                            ))
                            ) : (
                            <p className="text-[10px] text-dark/40 italic">No hay tags creados todavía.</p>
                            )}
                    </div>
                </div>

                {/* NUEVOS TAGS (CAMPO DE TEXTO) */}
                <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-txtSecondary flex items-center gap-2">
                    ¿Crear nuevos tags? (separar por comas)
                </label>
                <input 
                    type="text"
                    placeholder="Ej: REACT, CURSO 2024, AVANZADO"
                    {...register("newTagsRaw")}
                    className="w-full p-4 bg-txtPrimary rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm font-semibold placeholder:text-dark/30"
                />
                </div>           

                {/* INFO: El contenido no es editable por ética */}
                <div className="p-4 bg-txtPrimary rounded-2xl border border-dashed border-border">
                    <label className="block text-[10px] font-black text-txtSecondary uppercase mb-2">Contenido (Sólo lectura)</label>
                    <p className="text-xs text-dark/70 italic">"{testimonial.content}"</p>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-4">
                    <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 text-sm font-bold text-txtSecondary hover:bg-txtPrimary/50 rounded-2xl transition-colors"
                    >
                    Cancelar
                    </button>
                    <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-primary text-txtPrimary text-sm font-bold rounded-2xl shadow-lg shadow-brand/20 hover:bg-brand transition-all flex items-center justify-center gap-2"
                    >
                    {isSubmitting ? "Guardando..." : <><MdSave size={20}/> Guardar Cambios</>}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditTestimonialModal
