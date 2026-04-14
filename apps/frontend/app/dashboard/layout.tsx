import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";



export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-foreground">
      
      {/* SIDEBAR */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 bg-sidebar border border-border overflow-hidden">
          {/* HEADER */ }
          <Header />
          
          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 bg-dark overflow-y-auto p-8 rounded-t-4xl">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>
          {/* FOOTER: borrar si no queda bien */ }
          <Footer/>
      </div>
      <Footer/>



    </div>
  );
}
  


 
