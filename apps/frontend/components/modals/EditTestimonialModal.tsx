"use client";
import { useForm } from "react-hook-form";
import { MdClose, MdSave, MdCategory, MdLabel, MdCheckCircle } from "react-icons/md";
import { updateTestimonialAction } from "@/app/_actions/testimonial-actions";
import { useEffect, useState } from "react";


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
  
    
    

    
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<TestimonialFormValues>({
            defaultValues: {
                status: testimonial?.status,
                categoryId: testimonial?.categoryId,
                tagIds: testimonial?.tags?.map((t: any) => t.id) || [],
            }
     }
    );

    useEffect(() => {
        if (testimonial) {
            reset({
            status: testimonial.status,
            categoryId: testimonial.categoryId,
            tagIds: testimonial.tags?.map((t: any) => t.id) || [],
            });
    }
    }, [testimonial, reset]);


  if (!isOpen || !testimonial) return null;

  const onSubmit = async (data: any) => {
    console.log("Actualizando testimonio:", testimonial.id, data);
    try {
      await updateTestimonialAction(testimonial.id, data);
      alert("¡Actualizado con éxito!");
      onClose();
      window.location.reload(); // Recargamos para ver los cambios
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* HEADER DEL MODAL */}
            <div className="bg-brand p-6 text-white flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold">Gestionar Testimonio</h2>
                <p className="text-white/80 text-xs uppercase font-semibold mt-1">
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
                    <MdCheckCircle className="text-brand" /> Estado del Testimonio
                    </label>
                    <select 
                    {...register("status")}
                    className="w-full p-4 bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-brand outline-none text-sm font-semibold"
                    >
                    <option value="PENDIENTE">🕒 Pendiente de Revisión</option>
                    <option value="APROBADO">✅ Aprobado para Publicar</option>
                    <option value="RECHAZADO">❌ Rechazado</option>
                    </select>
                </div>

                {/* CAMPO: CATEGORÍA */}
                <div className="space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-dark uppercase tracking-widest">
                    <MdCategory className="text-brand" /> Categoría Asignada
                    </label>
                    <select 
                    {...register("categoryId")}
                    className="w-full p-4 bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-brand outline-none text-sm font-semibold"
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
                        <MdLabel className="text-brand"/> Seleccionar Tags Existentes
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-4 bg-chalk rounded-2xl border border-gray-100 max-h-40 overflow-y-auto">
                        {allTags && allTags.length > 0 ? (
                            allTags.map((tag: any) => (
                                <label 
                                key={tag.id} 
                                className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-100 cursor-pointer hover:border-brand/50 transition-all"
                                >
                                <input 
                                    type="checkbox" 
                                    value={tag.id} 
                                    {...register("tagIds")}
                                    className="w-4 h-4 accent-brand"
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
                <label className="text-[10px] font-black uppercase text-medium">
                    ¿Crear nuevos tags? (separar por comas)
                </label>
                <input 
                    type="text"
                    placeholder="Ej: REACT, CURSO 2024, AVANZADO"
                    {...register("newTagsRaw")}
                    className="w-full p-4 bg-chalk rounded-2xl border-none focus:ring-2 focus:ring-brand outline-none text-sm font-semibold placeholder:text-dark/30"
                />
                </div>           

                {/* INFO: El contenido no es editable por ética */}
                <div className="p-4 bg-chalk/50 rounded-2xl border border-dashed border-medium/30">
                    <label className="block text-[10px] font-black text-medium uppercase mb-2">Contenido (Sólo lectura)</label>
                    <p className="text-xs text-dark/70 italic">"{testimonial.content}"</p>
                </div>

                {/* BOTONES */}
                <div className="flex gap-3 pt-4">
                    <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 text-sm font-bold text-medium hover:bg-chalk rounded-2xl transition-colors"
                    >
                    Cancelar
                    </button>
                    <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-brand text-white text-sm font-bold rounded-2xl shadow-lg shadow-brand/20 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
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
