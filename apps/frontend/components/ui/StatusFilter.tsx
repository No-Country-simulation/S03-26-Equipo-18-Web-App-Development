"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const statuses = [
  { label: "Todos", value: "" },
  { label: "Pendientes", value: "PENDIENTE" },
  { label: "Aprobados", value: "APROBADO" },
  { label: "Rechazados", value: "RECHAZADO" },
];

export const StatusFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const currentStatus = searchParams.get("status") || "";

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex p-1 bg-chalk rounded-2xl w-fit mb-6 border border-gray-100">
      {statuses.map((s) => (
        <button
          key={s.value}
          onClick={() => handleFilter(s.value)}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
            currentStatus === s.value
              ? "bg-white text-brand shadow-sm"
              : "text-medium hover:text-dark"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};