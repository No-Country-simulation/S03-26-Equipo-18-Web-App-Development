
import TituloPage from "@/components/tituloPage";
import UserTable from "@/components/UserTable";
import { prisma } from "@/lib/prisma";
import BtnNewUser from "@/components/BtnNewUser";




const Users = async () => {

  const adminInstituto = "No-Country"; // Este valor debería venir del contexto o props del Admin

  //Buscamos los usuarios del instituto del admin para mostrarlos en la tabla
  const usersList = await prisma.user.findMany({
    where: { instituto: adminInstituto },
    select:{
      id: true,
      username: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      instituto: true,
    },
    orderBy: { createdAt: "desc" },
  });


  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
           <TituloPage titulo="Usuarios" descripcion="Gestiona los usuarios de tu CMS." />
        </div>
       
        <BtnNewUser adminInstituto={adminInstituto} />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-chalk">
        <UserTable users={ usersList }/>
      </div>    



    </div>
  )
}

export default Users
