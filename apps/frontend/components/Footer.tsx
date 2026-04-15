import Image from "next/image";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-8 px-8 border-t border-white/5 bg-dark"> 
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
       
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 opacity-30 brightness-200 grayscale">
            <Image 
              src="/image/logo/logoside.png" 
              alt="NoStories Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            NoStories <span className="text-primary/30">CMS</span> — Engine v2.0
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex gap-6">
            <button className="text-[10px] font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-[0.2em]">
              Soporte Técnico
            </button>
            <button className="text-[10px] font-bold text-white/30 hover:text-primary transition-colors uppercase tracking-[0.2em]">
              Privacidad
            </button>
          </div>
          
          <div className="h-4 w-px bg-white/10 hidden md:block"></div> 
          
          <p className="text-[10px] font-medium text-white/10 uppercase tracking-widest">
            &copy; {currentYear} NoStories Ecosystem
          </p>
        </div>

      </div>
    </footer>
  );
}