"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const statuses = [
{ label: "Todos", value: "" },
  { label: "Pendientes", value: "PENDING" },    
  { label: "Publicados", value: "PUBLISHED" }, 
  { label: "Rechazados", value: "REJECTED" },
  { label: "Borradores", value: "DRAFT" },
  { label: "En Revisión", value: "IN_REVIEW" },
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
    <div className="flex min-w-75 justify-center align-center items-center p-1 bg-txtPrimary rounded-2xl w-fit mb-6 border border-border">
      {statuses.map((s) => (
        <button
          key={s.value}
          onClick={() => handleFilter(s.value)}
          className={`w-full px-6 py-2.5 rounded-xl text-lg font-bold transition-all ${
            currentStatus === s.value
              ? "bg-sidebar text-primary shadow-sm"
              : "text-txtSecondary hover:text-dark"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};