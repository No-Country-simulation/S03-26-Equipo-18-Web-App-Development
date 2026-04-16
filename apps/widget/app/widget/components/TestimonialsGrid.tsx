import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  type: string;
  imageUrl?: string;
  videoUrl?: string;
  youtubeId?: string;
  views: number;
  clicks: number;
  isFeatured: boolean;
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  theme: string;
  onTestimonialClick: (testimonial: Testimonial) => void;
}

export default function TestimonialsGrid({
  testimonials,
  theme,
  onTestimonialClick,
}: TestimonialsGridProps) {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  };

  return (
    <div style={gridStyle}>
      {testimonials.map((testimonial) => (
        <TestimonialCard
          key={testimonial.id}
          {...testimonial}
          theme={theme}
          onClick={() => onTestimonialClick(testimonial)}
        />
      ))}
    </div>
  );
}
