import { MdLocationOn, MdStar, MdLabel, MdCategory } from "react-icons/md";

interface Tag {
  id: string;  
  name: string;
}

interface TestimonialCardProps {
  userName: string;
  content: string;
  rating: number;
  location?: string | null;
  category: string;
  status: string;
  tags: Tag[];
}


const getStatusClass = (status: string) => {
  switch (status) {
    case "APROBADO":
      return "badge-approved";
    case "RECHAZADO":
      return "badge-rejected";
    default:
      return "badge-pending";
  }
};


const TestimonialCard = ({ userName, content, rating, location, category, status, tags }: TestimonialCardProps) => {
  return (
    <div className="bg-chalk rounded-3xl p-6 shadow-sm  border border-primary flex flex-col h-full hover:shadow-lg transition-all duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
            {userName?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h4 className="font-bold text-dark text-sm uppercase tracking-tight">{userName}</h4>
            <div className="flex items-center gap-1 text-[10px] text-primary font-bold uppercase">
              <MdCategory size={12} />
              {category}
            </div>
          </div>
        </div>

        {/* Badge de Estado usando las clases de globals.css */}
        <div className={`${getStatusClass(status)} px-4 py-1 rounded-full text-[10px] font-black shadow-sm transform rotate-3 uppercase tracking-wider`}>
          {status === 'APPROVED' ? 'Aprobado' : status}
        </div>
      </div>

      {/* CUERPO */}
      <div className="grow">
        <p className="text-dark text-sm leading-relaxed italic line-clamp-4">
          "{content}"
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t border-gray-100 space-y-4">
        
        {/* Tags con el estilo de fondo oscuro de tu Figma */}
        <div className="flex flex-wrap gap-2">
          {(tags || []).map((tag, index) => (
  <span 
    key={index} 
    className="bg-dark text-white text-[9px] px-2 py-0.5 rounded-md flex items-center gap-1 font-bold uppercase tracking-tighter"
  >
    <MdLabel size={10} />
    {tag.name}
  </span>
))}
        </div>

        <div className="flex justify-between items-center">
          {/* Estrellas: creo un arreglo con 5 espacios vacíos */}
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <MdStar 
                key={i} 
                className={i < rating ? "fill-current" : "text-gray-200"} 
                size={18} 
              />
            ))}
          </div>

          {/* Ubicación */}
          <div className="flex items-center gap-1 text-dark/50 text-[11px] font-bold">
            <MdLocationOn className="text-brand" size={14} />
            {location || "Sin ubicación"}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default TestimonialCard
