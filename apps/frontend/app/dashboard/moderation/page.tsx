import TituloPage from "@/components/tituloPage";
import { prisma } from "@/lib/prisma";


const Moderation = async() => {

  // Traemos todos los testimonios de la DB
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }
  });

  return (
    <div>
      <TituloPage titulo="Moderación" descripcion="Revisa y aprueba o rechaza los testimonios de tus alumnos." />

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Usuario</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Comentario</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Estado</th>
        
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.userName}</td>
                <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{t.content}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    t.status === 'APPROVED' ? 'badge-approved' : 
                    t.status === 'REJECTED' ? 'badge-rejected' : 
                    'badge-pending'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-indigo-600 font-medium cursor-pointer">
                  Gestionar
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Moderation
