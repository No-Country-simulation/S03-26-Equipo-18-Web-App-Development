import { MdPerson, MdLogout } from "react-icons/md";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";


const Header = async () => {
  const session = await getServerSession(authOptions);
  // Si no hay sesión (por seguridad), no renderizamos el header. Esto es importante para evitar mostrar información de usuario o botones de logout cuando no hay un usuario autenticado.
  if (!session) return null;

  return (
    <header className="h-16 bg-sidebar flex items-center justify-end px-8 gap-6 border-b border-border">
          

          {/* Perfil de Usuario */}
          <div className="flex items-center gap-3 pl-6 border-l border-border">
            <div className="text-right">
              <p className="text-m font-bold text-txtPrimary leading-none">
                {session.user.name || "Usuario"}
              </p>
              <p className="text-sm text-txtSecondary capitalize">
                {session.user.role?.toLowerCase() || "User Role"}
              </p>
            </div>
            
          
            <div className="w-10 h-10 rounded-full bg-chalk flex items-center justify-center text-dark border border-gray-300">
              <MdPerson className="text-2xl" />
            </div>
          </div>

          {/* Botón Salir */}
          <LogoutButton />
        </header>
  )
}

export default Header
