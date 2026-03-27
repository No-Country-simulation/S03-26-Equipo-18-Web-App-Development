"use client" //para poder utilizar el hook

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react"; // para avisar al componente que va a recibir algo que puede renderizar


interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isCollapsed?: boolean;
}

const NavBarItem = ({href, icon, label, isCollapsed}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      title= {label}
      className={`flex items-center gap-8 px-4 py-2.5 rounded-lg font-medium transition-all group ${
        isActive 
          ? "text-brand shadow-sm" 
          : "text-dark hover:bg-chalk/50" 
      } ${isCollapsed ? "justify-center" : ""}`}
    >
      {/* El icono hereda el color del texto del padre */}
      <span className="text-xl shrink-0"> {icon}</span>
      {!isCollapsed && <span className="text-xl whitespace-nowrap">{label}</span>}

    </Link>
  )
}

export default NavBarItem
