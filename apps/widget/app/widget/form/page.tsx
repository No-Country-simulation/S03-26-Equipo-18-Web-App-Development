"use client";

import { useEffect, useState, FormEvent } from "react";

export default function WidgetForm() {
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("TEXT");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  /* ================== INIT ================== */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setApiUrl(params.get("apiUrl") || "http://localhost:3000");
    setCategoryId(params.get("categoryId"));

    const themeParam = params.get("theme");

    // ✅ PRIORIDAD: lo que venga desde afuera
    if (themeParam === "dark" || themeParam === "light") {
      setTheme(themeParam);
    } else {
      // fallback (opcional)
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  /* ================== AUTO HEIGHT ================== */
  useEffect(() => {
    const sendHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage(
        { type: "WIDGET_HEIGHT", height },
        "*"
      );
    };

    sendHeight();

    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  /* ================== SUBMIT ================== */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const contenido = formData.get("contenido") as string;
    const titulo = formData.get("titulo") as string;

    if (!contenido || contenido.trim().length < 10) {
      setError("El contenido debe tener al menos 10 caracteres");
      setLoading(false);
      return;
    }

    if (!titulo || titulo.trim().length < 2) {
      setError("El título es demasiado corto");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/public/testimonials`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Error al enviar");

      setSuccess(true);
      form.reset();
      setType("TEXT");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  /* ================== SUCCESS ================== */
  if (success) {
    return (
      <div style={getContainerStyle(theme)}>
        <div style={getSuccessStyle(theme)}>
          ✅ ¡Gracias! Tu testimonio fue enviado
        </div>
      </div>
    );
  }

  /* ================== FORM ================== */
  return (
    <div style={getContainerStyle(theme)}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3 style={getTitleStyle(theme)}>Dejanos tu testimonio</h3>

        <div>
          <label style={getLabelStyle(theme)}>Título</label>
          <input name="titulo" required style={getInputStyle(theme)} />
        </div>

        <div>
          <label style={getLabelStyle(theme)}>Contenido</label>
          <textarea name="contenido" required style={getTextareaStyle(theme)} />
        </div>

        <div style={grid2}>
          <div>
            <label style={getLabelStyle(theme)}>Nombre</label>
            <input name="autorNombre" required style={getInputStyle(theme)} />
          </div>

          <div>
            <label style={getLabelStyle(theme)}>Email</label>
            <input name="autorEmail" type="email" style={getInputStyle(theme)} />
          </div>
        </div>

        <div style={grid2}>
          <div>
            <label style={getLabelStyle(theme)}>Puesto</label>
            <input name="autorPosition" style={getInputStyle(theme)} />
          </div>

          <div>
            <label style={getLabelStyle(theme)}>Empresa</label>
            <input name="autorCompany" style={getInputStyle(theme)} />
          </div>
        </div>

        <div>
          <label style={getLabelStyle(theme)}>Tipo</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={getInputStyle(theme)}
          >
            <option value="TEXT">Texto</option>
            <option value="IMAGE">Imagen</option>
            <option value="VIDEO">Video</option>
          </select>
        </div>

        {type !== "TEXT" && (
          <div>
            <label style={getLabelStyle(theme)}>Archivo</label>
            <input type="file" name="file" />
          </div>
        )}

        <button disabled={loading} style={getButtonStyle(theme)}>
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
}

/* ================== STYLES ================== */

const getContainerStyle = (theme: string) => ({
  fontFamily: "Inter, system-ui, sans-serif",
  backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
  padding: "20px", // 👈 menos padding (mejor embed)
  borderRadius: "16px",
  border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
  maxWidth: "600px",
  width: "100%",
  margin: "0 auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
});

const getTitleStyle = (theme: string) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme === "dark" ? "#f9fafb" : "#111827",
});

const getLabelStyle = (theme: string) => ({
  fontSize: "12px",
  color: theme === "dark" ? "#9ca3af" : "#6b7280",
  marginBottom: "4px",
  display: "block",
});

const getInputStyle = (theme: string) => ({
  padding: "10px 12px",
  borderRadius: "8px",
  border: theme === "dark" ? "1px solid #374151" : "1px solid #d1d5db",
  background: theme === "dark" ? "#1f2937" : "#ffffff",
  color: theme === "dark" ? "#f9fafb" : "#111827",
  fontSize: "14px",
  width: "100%",
});

const getTextareaStyle = (theme: string) => ({
  ...getInputStyle(theme),
  minHeight: "90px",
  resize: "none" as const,
});

const getButtonStyle = (theme: string) => ({
  background: theme === "dark" ? "#f9fafb" : "#111827",
  color: theme === "dark" ? "#111827" : "#ffffff",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: 500,
});

const getSuccessStyle = (theme: string) => ({
  background: theme === "dark" ? "#064e3b" : "#ecfdf5",
  color: theme === "dark" ? "#6ee7b7" : "#065f46",
  padding: "14px",
  borderRadius: "8px",
  textAlign: "center" as const,
});

const formStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "16px",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
};

const errorStyle = {
  color: "#dc2626",
  fontSize: "13px",
  textAlign: "center" as const,
};