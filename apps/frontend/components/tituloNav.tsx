"use client";



interface TitleProps {
  label: string;
  isCollapsed?: boolean;
}

const TituloNav = ({label, isCollapsed}: TitleProps) => {
  return (
    <h5 className="text-sm">
        { !isCollapsed ? <span>{label}</span> : null }
    </h5>
  )
}
export default TituloNav
