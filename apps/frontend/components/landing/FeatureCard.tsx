
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-dark mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-primary/40 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}