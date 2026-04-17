"use client";

import { MdPerson } from "react-icons/md";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <header className="h-16 bg-sidebar flex items-center justify-end px-8 gap-6 border-b border-border">
        <div className="text-sm text-txtSecondary">Cargando...</div>
      </header>
    );
  }

  if (!user) return null;

  return (
    <header className="h-16 bg-sidebar flex items-center justify-end px-8 gap-6 border-b border-border">
      <div className="flex items-center gap-3 pl-6 border-l border-border">
        <div className="text-right">
          <p className="text-m font-bold text-txtPrimary leading-none">
            {user.name || "Usuario"}
          </p>
          <p className="text-sm text-txtSecondary capitalize">
            {user.role?.toLowerCase() || "User Role"}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-chalk flex items-center justify-center text-dark border border-gray-300">
          <MdPerson className="text-2xl" />
        </div>
      </div>

      <LogoutButton />
    </header>
  );
};

export default Header;