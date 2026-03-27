import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";



export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      
      {/* SIDEBAR */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 bg-brand overflow-hidden">
          {/* HEADER */ }
          <Header />
          
          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 bg-brand overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>

      </div>




    </div>
  );
}
  


 
