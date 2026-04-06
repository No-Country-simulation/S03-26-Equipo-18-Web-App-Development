import TestimonialCard from "@/components/TestimonialCard"
import Link from "next/link"

interface Tag {
  id: string;
  name: string;
}

interface Testimonial {
  id: string;
  userName: string;
  content: string;
  rating: number;
  location?: string | null;
  status: string;
  category: { name: string }; 
  tags: Tag[];
}


interface LastestTestimonialsProps {
  testimonials: Testimonial[];
}

const LastestTestimonials = ({ testimonials }: LastestTestimonialsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-chalk">Testimonios recientes</h3>
        <Link 
            href="/dashboard/testimonials"
            className="text-sm font-bold text-primary bg-dark py-2 px-3 rounded-3xl border border-border hover:underline">
          Ver todos
        </Link>
      </div>

      {/* Grid que muestra los últimos testimonios */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div key={t.id} className="h-full">
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
          ))
        ) : (
          <div className="col-span-full p-10 bg-dark-card rounded-3xl border border-border text-center text-muted">
            No hay testimonios recientes para mostrar.
          </div>
        )}
      </div>
    </div>
  )
}

export default LastestTestimonials
