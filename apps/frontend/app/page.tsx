

import Link from "next/link";
import Image from "next/image"; // Importante para optimizar imágenes en Next.js
import { redirect } from "next/navigation";
import { MdCheckCircle, MdSpeed, MdSecurity, MdArrowForward, MdStar } from "react-icons/md";

// Nota: Aquí podrías verificar la sesión con NextAuth si lo usas
// const session = await getServerSession(authOptions);
const isLogged = false; // Cambiar por lógica real de sesión cuando la tengas

export default function Home() {
  
  // Si ya inició sesión, no necesita ver la landing, que vaya a trabajar
  if (isLogged) {
    redirect("/dashboard");
    return null;
  }

  return (
    <div className="bg-white text-dark min-h-screen font-sans selection:bg-brand/20">
      
      {/* --- BLOQUE: NAVIGATION --- */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-chalk/50">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl">
            <Image 
              src="/image/logo/logoSide.png" 
              alt="NoStories Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tighter">NoStories</span>
            <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Testimonial CMS</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-dark/60 hover:text-dark transition-colors">
            Log in
          </Link>
          <Link href="/login" className="px-6 py-3 bg-dark text-white rounded-2xl font-bold text-sm hover:bg-brand transition-all shadow-lg shadow-brand/10">
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- BLOQUE: HERO --- */}
      <header className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-chalk rounded-full text-xs font-bold text-brand mb-8 animate-bounce">
            <MdStar /> NUEVA VERSIÓN 2.0 DISPONIBLE
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            Tu reputación <br /> merece ser <span className="text-brand">gestionada.</span>
          </h1>
          <p className="text-xl text-dark/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            NoStories CMS permite a las instituciones educativas recolectar, validar y publicar testimonios de impacto de forma profesional y segura.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/login" className="px-10 py-5 bg-primary text-white rounded-4xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-brand/40 hover:scale-105 active:scale-95 transition-all">
              PROBAR DEMO <MdArrowForward size={24} />
            </Link>
            <div className="flex -space-x-3 items-center justify-center">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-chalk flex items-center justify-center text-[10px] font-bold overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
              <p className="pl-6 text-sm font-bold text-dark/40">+200 Instituciones confían</p>
            </div>
          </div>
        </div>
      </header>

      {/* --- BLOQUE: FEATURES --- */}
      <section className="py-24 bg-dark text-white rounded-[4rem] mx-4 md:mx-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-black mb-4 italic">¿Por qué elegir NoStories?</h2>
            <p className="text-primary/60 font-medium">Diseñado para la agilidad y la transparencia institucional.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MdSpeed size={32} />}
              title="Moderación Veloz"
              desc="Aprobar o rechazar un testimonio te tomará menos de 2 segundos. Flujo optimizado para móviles."
            />
            <FeatureCard 
              icon={<MdSecurity size={32} />}
              title="Acceso por Roles"
              desc="Asigna Editores para la gestión diaria y mantén el control total como Administrador Maestro."
            />
            <FeatureCard 
              icon={<MdCheckCircle size={32} />}
              title="Integración Fácil"
              desc="Exporta tus testimonios aprobados directamente a tu sitio principal mediante nuestra API dedicada."
            />
          </div>
        </div>
      </section>

      {/* --- BLOQUE: CTA FINAL --- */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tighter">
          ¿Listo para transformar <br /> tus historias?
        </h2>
        <Link href="/register" className="px-12 py-6 bg-dark text-white rounded-[2.5rem] font-black text-xl hover:bg-brand transition-all inline-block">
          Crear mi Cuenta de Institución
        </Link>
        <p className="mt-8 text-dark/30 font-bold text-sm uppercase tracking-widest">Powered by NoStories Engine</p>
      </section>

      <footer className="p-12 text-center border-t border-chalk">
         <p className="text-dark/40 text-xs font-bold">© 2026 NOSTORIES CMS. MADE WITH ❤️ FOR EDUCATION.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-dark mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-primary/40 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
