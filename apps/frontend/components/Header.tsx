"use client";

import { useEffect, useRef, useState } from "react";
import { MdPerson, MdKeyboardArrowDown } from "react-icons/md";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, loading } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <header className="h-16 bg-sidebar flex items-center justify-end px-8 gap-6 border-b border-border">
        <div className="text-sm text-txtSecondary">Cargando...</div>
      </header>
    );
  }

  if (!user) return null;

  return (
    <header className="h-16 bg-sidebar flex items-center justify-end px-8 gap-6 border-b border-border relative">
      <div ref={profileRef} className="relative">
        <button
          type="button"
          onClick={() => setOpenProfile((prev) => !prev)}
          className="flex items-center gap-3 pl-6 border-l border-border hover:bg-white/40 rounded-lg px-3 py-2 transition-colors"
        >
          <div className="text-right">
            <p className="text-sm font-bold text-txtPrimary leading-none">
              {user.name || "Usuario"}
            </p>
            <p className="text-xs text-txtSecondary capitalize mt-1">
              {user.role?.toLowerCase() || "user"}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-chalk flex items-center justify-center text-dark border border-gray-300">
            <MdPerson className="text-2xl" />
          </div>

          <MdKeyboardArrowDown
            className={`text-xl text-txtSecondary transition-transform ${
              openProfile ? "rotate-180" : ""
            }`}
          />
        </button>

        {openProfile && (
          <div className="absolute right-0 mt-3 w-80 bg-white border border-chalk rounded-2xl shadow-lg z-50 overflow-hidden">
            <div className="px-5 py-4 border-b border-chalk bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-chalk flex items-center justify-center text-dark border border-gray-300">
                  <MdPerson className="text-3xl" />
                </div>

                <div>
                  <p className="font-bold text-txtPrimary">
                    {user.name || "Usuario"}
                  </p>
                  <p className="text-sm text-txtSecondary">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-txtSecondary">
                  Rol
                </p>
                <p className="text-sm font-medium text-txtPrimary">
                  {user.role}
                </p>
              </div>

              {"organization" in user && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-txtSecondary">
                    Organización
                  </p>
                  <p className="text-sm font-medium text-txtPrimary">
                    {(user as any).organization || "No asignada"}
                  </p>
                </div>
              )}

              {"isActive" in user && (
                <div>
                  <p className="text-xs uppercase tracking-wide text-txtSecondary">
                    Estado
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      (user as any).isActive
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {(user as any).isActive ? "Activo" : "Inactivo"}
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
            <div className="relative">
              <LogoutButton />
            </div>
    </header>
  );
};

export default Header;