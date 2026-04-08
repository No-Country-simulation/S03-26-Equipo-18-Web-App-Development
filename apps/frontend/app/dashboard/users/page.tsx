// import { prisma } from "@/lib/prisma";
import TituloPage from "@/components/tituloPage";
import UserTable from "@/components/UserTable";
import BtnNewUser from "@/components/BtnNewUser";


import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


const Users = async () => {

  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  
  // Seguridad de Rol: Solo los ADMIN deberían ver esta página
  // Si un EDITOR intenta entrar, lo mandamos al dashboard
  if (session.user.role !== "ADMIN") { redirect("/dashboard");}
 
  const masterAdminId =  session.user.id;
  
  // 1. Usamos FETCH (porque estamos en el Servidor)
  // Reemplazamos la URL por la que pase el equipo de Backend
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?adminId=${masterAdminId}`, {
      method: 'GET',
      headers: {
        // 'Authorization': `Bearer ${session.user.accessToken}`, // Si usan tokens
      },
      next: { revalidate: 0 } // Esto asegura que siempre traiga datos frescos (no caché vieja)
    });

    if (!response.ok) {
         console.error("Error al obtener usuarios");
    }

  const usersList = await response.json();





  //Buscamos los usuarios del instituto del admin para mostrarlos en la tabla
  // const usersList = await prisma.user.findMany({
  //   where: { adminId: masterAdminId },
  //   select:{
  //     id: true,
  //     username: true,
  //     email: true,
  //     role: true,
  //     active: true,
  //     createdAt: true,
  //     organization: true,
  //     adminId: true,
  //   },
  //   orderBy: { createdAt: "desc" },
  // });

  // const serializedUsers = usersList.map(user => ({
  // ...user,
  // createdAt: user.createdAt.toISOString(), // Convertimos el objeto Date a un String (ISO)
  // }));




  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
           <TituloPage titulo="Usuarios" descripcion="Gestiona los usuarios de tu CMS." />
        </div>
       
        <BtnNewUser adminId={masterAdminId} />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-chalk">
        <UserTable users={usersList} />
      </div>    



    </div>
  )
}

export default Users
