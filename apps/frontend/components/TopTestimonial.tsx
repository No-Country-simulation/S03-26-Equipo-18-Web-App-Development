import { MdRemoveRedEye, MdCategory } from "react-icons/md";
import type { DashboardTopTestimonial } from "@/types/dashboard";

const TopTestimonial = ({ data }: { data: DashboardTopTestimonial[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-txtPrimary">Lo más visto</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {data.length > 0 ? (
          data.map((t, index) => (
            <div key={t.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-brand/40 group-hover:text-primary transition-colors">
                  0{index + 1}
                </span>

                <div>
                  <h4 className="text-sm font-bold text-txtPrimary truncate w-32">
                    {t.userName}
                  </h4>
                  <div>
                    <p className="text-xs text-txtSecondary truncate w-32">
                      {t.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-txtSecondary uppercase font-medium">
                    <MdCategory size={10} className="text-primary" />
                    {t.category?.name || "Sin categoría"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-dark-surface px-3 py-1.5 rounded-xl border border-border/50">
                <MdRemoveRedEye size={14} className="text-brand" />
                <span className="text-xs font-black text-txtPrimary">
                  {t.views.toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted text-center py-4">
            No hay datos aún
          </p>
        )}
      </div>
    </div>
  );
};

export default TopTestimonial;