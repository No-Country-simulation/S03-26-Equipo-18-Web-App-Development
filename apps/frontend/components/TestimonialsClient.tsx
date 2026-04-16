"use client";

import { useEffect, useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import EditTestimonialModal from "@/components/modals/EditTestimonialModal";

const TestimonialsClient = ({ testimonials: initialTestimonials,categories, allTags }:  any ) => {

    const [list, setList] = useState(initialTestimonials || []);
    const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        setList(initialTestimonials);
    }, [initialTestimonials]);

    const handleOpenModal = (testimonial: any) => {
        setSelectedTestimonial(testimonial);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTestimonial(null);
        setIsModalOpen(false);
    };

    const onUpdateSuccess = (id: string, updatedFields: any) => {
        setList((prevList: any[]) =>
            prevList.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
        );
    };


    // Si por algún error del backend testimonials no es un array, 
    // evitamos que la página explote.
    if (!Array.isArray(list)) {
        return <div className="text-center p-10 text-gray-500">No se pudieron cargar los testimonios.</div>;
    }


  return(
        <>
                    {/* El Grid de Cards ahora es interactivo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {list.map((t: any) => (
                <div 
                    key={t.id} 
                    onClick={() => handleOpenModal(t)}
                    className="cursor-pointer transform hover:scale-[1.01] transition-all duration-200"
                >
                    <TestimonialCard 
                    id={t.id}
                    userName={t.userName}
                    content={t.content}
                    rating={t.rating}
                    location={t.location}
                    category={t.category?.name || t.category || "Sin categoría"}
                    status={t.status}
                    tags={t.tags || []}
                    />
                </div>
                ))}
            </div>

            {/* El Modal que se activa al hacer clic */}
            <EditTestimonialModal 
                isOpen={isModalOpen}
                testimonial={selectedTestimonial}
                categories={categories}
                onClose={handleCloseModal}
                allTags={allTags}
            />
        </>

  )

}

export default TestimonialsClient;
