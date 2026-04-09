import { MdDashboard, MdMessage, MdGroups, MdSettings} from "react-icons/md";

import NavBarItem from "./NavBarItem";
import TituloNav from "./tituloNav";

interface Props {
  isCollapsed?: boolean;
}


const NavBar = ({ isCollapsed }: Props) => {
  return (
        <nav className="flex-1 px-4 space-y-10">

          <TituloNav label="Principal" isCollapsed={isCollapsed}/>
          
            <NavBarItem 
                href="/dashboard" 
                icon={<MdDashboard />} 
                label="Dashboard" 
                isCollapsed={isCollapsed}/>
            <NavBarItem 
                href="/dashboard/testimonials" 
                icon={<MdMessage />}
                label="Gestor de Testimonios" 
                isCollapsed={isCollapsed}/>

          <TituloNav label="Administración" isCollapsed={isCollapsed}/>

            <NavBarItem 
                href="/dashboard/users"
                icon={<MdGroups />}
                label="Usuarios" 
                isCollapsed={isCollapsed}/>
            <NavBarItem
                href="/dashboard/settings"
                icon={<MdSettings />}
                label="Api y Configuración" 
                isCollapsed={isCollapsed}/>
    
        </nav>

  )
}

export default NavBar
