import { IconType } from "react-icons"

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  iconColor: string;
  textcolor?: string;
}






const StatCard = ({title, value, icon: Icon, iconColor, textcolor}: StatCardProps) => {
  return (
<div className="bg-sidebar p-6 rounded-2xl shadow-sm border border-primary flex flex-col gap-2">
      <div className={`${iconColor} bg-opacity-10 w-10 h-10 rounded-lg flex items-center justify-end mb-2`}>
        <Icon size={42} className={iconColor} />
      </div>
      <div>
        <h3 className={`text-3xl font-bold ${textcolor || "text-txtPrimary"}`}>{value}</h3>
        <p className="text-textPrimary text-sm font-medium uppercase tracking-wider">{title}</p>
      </div>
    </div>
  )
}

export default StatCard
