import { MdPerson, MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <header className="h-16 bg-chalk border-b border-gray-200 flex items-center justify-end px-8 gap-6">
          

          {/* Perfil de Usuario */}
          <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
            <div className="text-right">
              <p className="text-sm font-bold text-dark leading-none">Nombre de Usuario</p>
              <p className="text-xs text-medium">Admin</p>
            </div>
            
          
            <div className="w-10 h-10 rounded-full bg-chalk flex items-center justify-center text-dark border border-gray-300">
              <MdPerson className="text-2xl" />
            </div>
          </div>

          {/* Botón Salir */}
          <button 
            className="flex items-center gap-1 text-brand hover:text-red-600 transition-colors ml-2"
            title="Cerrar sesión"
          >
            <MdLogout className="text-xl" />
            <span className="text-sm font-medium">Salir</span>
          </button>
        </header>
  )
}

export default Header
