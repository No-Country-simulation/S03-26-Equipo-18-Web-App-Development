"use client";

import InfoTooltip from "./InfoTooltip";

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';


// Componente para el Gráfico de Tendencias
export const TrendsChart = ({ data }: { data: any[] }) => (
  <div className="bg-dark/40 p-6 rounded-3xl border border-border h-80 w-full lg:w-2/3">
    <h3 className="text-txtPrimary font-bold mb-4">Tendencias de Testimonios</h3>
    
    <InfoTooltip 
        title="¿Qué significa este gráfico?" 
        description="Muestra el crecimiento de tu contenido. La línea sólida es el volumen (cuántos testimonios recibes) y la línea punteada es la calidad (el promedio de estrellas). Si el volumen sube pero la calidad baja, revisa la satisfacción de tus clientes."
    />
    
    <ResponsiveContainer width="100%" height="85%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} />
        <Line type="monotone" dataKey="volumen" stroke="#00CFBA" strokeWidth={3} dot={{ r: 4, fill: '#00CFBA' }} />
        <Line type="monotone" dataKey="puntuacion" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// Componente para el Gráfico de Torta
export const AuthenticityPie = ({ data }: { data: any[] }) => (
  <div className="bg-dark/40 p-6 rounded-3xl border border-border h-80 w-full lg:w-1/3 flex flex-col">
    <h3 className="text-txtPrimary font-bold mb-4">Flujo de Autenticidad</h3>

    <InfoTooltip 
        title="¿Qué significa este gráfico?" 
        description="Compara testimonios que ya pasaron por tu filtro (Aprobados) frente a los que están esperando tu aprobación (Pendientes). Un flujo sano mantiene los pendientes al mínimo."
    />

    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-center gap-4 text-xs mt-2">
      {data.map(item => (
        <div key={item.name} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="text-txtSecondary">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);



