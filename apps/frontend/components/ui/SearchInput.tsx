"use client"

import { MdSearch } from "react-icons/md";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";



const SearchInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
        params.set("query", term);
        } else {
        params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className="relative flex-1 min-w-75">
      <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-medium text-xl" />
      <input
        type="text"
        placeholder="Buscar por nombre, categoria, contenido o tag..."
        className="w-full pl-12 pr-4 py-3 bg-white/90 focus:bg-white rounded-2xl border-none outline-none shadow-sm text-sm transition-all"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      
    </div>
  )
}

export default SearchInput
