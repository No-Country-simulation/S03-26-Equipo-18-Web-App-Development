import TituloPage from "@/components/tituloPage";
import { prisma } from "@/lib/prisma";

const Testimonials = async() => {

  // Traemos todos los testimonios de la DB
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
    include: { edTech: true }
  });

  return (
    <div>
      <TituloPage titulo="Testimonios" descripcion={`${testimonials.length} testimonios en total`} />
    </div>
  )
}

export default Testimonials
