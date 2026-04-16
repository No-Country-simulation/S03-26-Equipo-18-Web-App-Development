interface StatesProps {
  theme: string;
  error?: string;
}

export function LoadingState({ theme }: StatesProps) {
  const skeletonStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  };

  const skeletonItemStyle = {
    border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
    animation: "pulse 2s infinite",
  };

  return (
    <div style={skeletonStyle}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={skeletonItemStyle}>
          <div
            style={{
              height: "20px",
              backgroundColor: theme === "dark" ? "#374151" : "#e5e7eb",
              borderRadius: "4px",
              marginBottom: "12px",
            }}
          />
          <div
            style={{
              height: "60px",
              backgroundColor: theme === "dark" ? "#374151" : "#e5e7eb",
              borderRadius: "4px",
              marginBottom: "12px",
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export function ErrorState({ theme, error }: StatesProps) {
  const containerStyle = {
    padding: "20px",
    backgroundColor: theme === "dark" ? "#7f1d1d" : "#fee2e2",
    borderRadius: "8px",
    border: theme === "dark" ? "1px solid #991b1b" : "1px solid #fecaca",
  };

  const titleStyle = {
    fontSize: "14px",
    fontWeight: 600 as const,
    color: theme === "dark" ? "#fca5a5" : "#dc2626",
    marginBottom: "8px",
  };

  const messageStyle = {
    fontSize: "13px",
    color: theme === "dark" ? "#f87171" : "#b91c1c",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Error al cargar los testimonios</h3>
      <p style={messageStyle}>{error || "Intenta de nuevo más tarde"}</p>
    </div>
  );
}

export function EmptyState({ theme }: StatesProps) {
  const containerStyle = {
    textAlign: "center" as const,
    padding: "40px 20px",
    color: theme === "dark" ? "#9ca3af" : "#6b7280",
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: 600 as const,
    marginBottom: "8px",
  };

  const messageStyle = {
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>No hay testimonios disponibles</h3>
      <p style={messageStyle}>
        Vuelve pronto para ver lo que dicen nuestros usuarios
      </p>
    </div>
  );
}
