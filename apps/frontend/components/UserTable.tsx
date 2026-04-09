"use client";

import { MdDeleteOutline, MdShield } from "react-icons/md";
import { deleteUserAction } from "@/lib/actions/user-actions";
import { toast } from "react-hot-toast";


interface UserFromDB {
    id: string;
    username: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: string;
    organization: string;
    adminId: string | null;
}



const UserTable = ({users} : {users: UserFromDB[]}) => {

  const handleDelete = async (id: string, username: string | null) => {
    const confirm = window.confirm(`¿Estás seguro de que deseas eliminar a ${username || 'este usuario'}?`);
    
    if (confirm) {
      const result = await deleteUserAction(id);
      if (result.success) {
        toast.success("Usuario eliminado correctamente");
      } else {
        toast.error(result.error || "Error al eliminar");
      }
    }
  };


  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-chalk text-medium text-sm">
          <th className="p-4 font-medium uppercase tracking-wider">Usuario</th>
          <th className="p-4 font-medium uppercase tracking-wider">Email</th>
          <th className="p-4 font-medium uppercase tracking-wider">Rol</th>
          <th className="p-4 font-medium uppercase tracking-wider">Fecha</th>
          <th className="p-4"></th>
        </tr>
      </thead>
        <tbody className="divide-y divide-gray-50">
            {users &&users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand/10 text-primary flex items-center justify-center font-bold text-sm border border-brand/20">
                        {user.username ? user.username.substring(0, 2).toUpperCase() : "U"}
                      </div>
                      <span className="font-semibold text-dark">{user.username || "Sin nombre"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-medium">{user.email}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                      user.role === 'ADMIN' ? 'bg-primary text-dark' : 'bg-dark text-txtSecondary'
                    }`}>
                      {user.role === 'ADMIN' && <MdShield size={10} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-medium text-sm">
                    {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                        onClick={() => handleDelete(user.id, user.username)}
                        className="text-medium hover:text-red-500 transition-colors p-2">
                      
                      <MdDeleteOutline size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400">
                  No hay usuarios registrados en este instituto.
                </td>
              </tr>
            )}
        </tbody>
    </table>
  )
}

export default UserTable
