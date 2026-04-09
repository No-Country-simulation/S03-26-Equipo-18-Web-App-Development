"use client";

import { useState } from "react";
import TestimonialCard from "@/components/TestimonialCard";
import EditTestimonialModal from "@/components/modals/EditTestimonialModal";

const TestimonialsClient = ({ testimonials, categories, allTags }:  any ) => {

    const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (testimonial: any) => {
        setSelectedTestimonial(testimonial);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTestimonial(null);
        setIsModalOpen(false);
    };

  return(
        <>
                    {/* El Grid de Cards ahora es interactivo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {testimonials.map((t: any) => (
                <div 
                    key={t.id} 
                    onClick={() => handleOpenModal(t)}
                    className="cursor-pointer transform hover:scale-[1.01] transition-all duration-200"
                >
                    <TestimonialCard 
                    userName={t.userName}
                    content={t.content}
                    rating={t.rating}
                    location={t.location}
                    category={t.category.name}
                    status={t.status}
                    tags={t.tags}
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
