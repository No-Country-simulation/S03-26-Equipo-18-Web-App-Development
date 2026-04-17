import TestimonialCard from "@/components/TestimonialCard";
import Link from "next/link";
import type { DashboardLatestTestimonial } from "@/types/dashboard";

interface LastestTestimonialsProps {
  testimonials: DashboardLatestTestimonial[];
}

const LastestTestimonials = ({ testimonials }: LastestTestimonialsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-chalk">Testimonios recientes</h3>
        <Link
          href="/dashboard/testimonials"
          className="text-sm font-bold text-primary bg-dark py-2 px-3 rounded-3xl border border-border hover:underline"
        >
          Ver todos
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {testimonials.length > 0 ? (
          testimonials.slice(0, 4).map((t) => (
            <div key={t.id} className="h-full">
              <TestimonialCard
                id={t.id}
                userName={t.userName}
                content={t.content}
                category={t.category?.name || "Sin categoría"}
                status={t.status}
                tags={t.tags || []}
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
  );
};

export default LastestTestimonials;