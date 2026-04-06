"use client";

import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  return (
        <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-1 text-primary hover:text-red-600 transition-colors ml-2"
            title="Cerrar sesión"
          >
            <MdLogout className="text-xl" />
            <span className="text-m font-medium">Salir</span>
        </button>
  )
}

export default LogoutButton