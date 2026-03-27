"use client";

import { useState } from "react";
import { MdChevronLeft, MdMenu } from "react-icons/md";
import NavBar from "./NavBar";
import Image from "next/image";

const Sidebar = () => {

    const [isCollapsed, setIsCollapsed] = useState(false);
  
    return (
<aside 
      className={`bg-chalk border-r border-gray-300 flex flex-col transition-all duration-300 ease-in-out shrink-0 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* BOTÓN PARA COLAPSAR */}
      <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <Image src="/image/logo/logo.png" alt="Logo" width={48} height={48} />
            <span className="font-bold text-dark whitespace-nowrap">Testimonial CMS</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-200 rounded-lg text-dark transition-colors"
        >
          {isCollapsed ? <div className="flex flex-col w-20 items-center justify-center gap-1"><Image src="/image/logo/logo.png" alt="Logo" width={42} height={42} /><MdMenu size={24} /></div> : <MdChevronLeft size={24} />}
        </button>
      </div>

      {/* NAVEGACIÓN */}
        <NavBar isCollapsed={isCollapsed}/>
    </aside>
    )
}

export default Sidebar
