// components/NavBar.tsx
"use client";

import { MdDashboard, MdMessage, MdGroups, MdSettings } from "react-icons/md";
import NavBarItem from "./NavBarItem";
import TituloNav from "./tituloNav";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  isCollapsed?: boolean;
}

const NavBar = ({ isCollapsed }: Props) => {
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="flex-1 px-4 space-y-10">
      <div>
        <TituloNav label="Principal" isCollapsed={isCollapsed} />

        <NavBarItem
          href="/dashboard"
          icon={<MdDashboard />}
          label="Dashboard"
          isCollapsed={isCollapsed}
        />

        <NavBarItem
          href="/dashboard/testimonials"
          icon={<MdMessage />}
          label="Gestor de Testimonios"
          isCollapsed={isCollapsed}
        />
      </div>

      {isAdmin && (
        <div>
          <TituloNav label="Administración" isCollapsed={isCollapsed} />

          <NavBarItem
            href="/dashboard/users"
            icon={<MdGroups />}
            label="Usuarios"
            isCollapsed={isCollapsed}
          />

          <NavBarItem
            href="/dashboard/settings"
            icon={<MdSettings />}
            label="Api y Configuración"
            isCollapsed={isCollapsed}
          />
        </div>
      )}
    </nav>
  );
};

export default NavBar;