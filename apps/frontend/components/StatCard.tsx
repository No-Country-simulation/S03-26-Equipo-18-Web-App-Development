import { IconType } from "react-icons"

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  iconColor: string;
}






const StatCard = ({title, value, icon: Icon, iconColor}: StatCardProps) => {
  return (
<div className="bg-white p-6 rounded-2xl shadow-sm border border-chalk flex flex-col gap-2">
      <div className={`${iconColor} bg-opacity-10 w-10 h-10 rounded-lg flex items-center justify-center mb-2`}>
        <Icon size={24} className={iconColor} />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-dark">{value}</h3>
        <p className="text-medium text-sm font-medium uppercase tracking-wider">{title}</p>
      </div>
    </div>
  )
}

export default StatCard
