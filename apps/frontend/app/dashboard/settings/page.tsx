"use client";

import TituloPage from "@/components/tituloPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface SettingsPageProps {
  currentRole?: "admin" | "moderator" | "user";
}

export default function SettingsPage({
  currentRole = "user",
}: SettingsPageProps) {
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedApi, setCopiedApi] = useState<string | null>(null);

  const apiEndpoint = "/api/testimonials";
  const embedCode = `<script src="${typeof window !== "undefined" ? window.location.origin : ""}/embed.js"><\/script>
<div id="testimonial-cms-embed"><\/div>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedApi(id);
    setTimeout(() => setCopiedApi(null), 2000);
  };

  return (
    <div className="p-6 lg:p-10">
      <TituloPage
        titulo="Configuración"
        descripcion="API pública y scripts de embed."
      />

      {/* API Documentation */}
      <div className="grid gap-6 mb-8">
        <Card className="border-primary/20">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">REST API</h2>
          <p className="text-txtSecondary mb-6">
            Utiliza nuestra API pública para integrar testimonios en sitios
            externos
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg text-txtPrimary mb-3">
                Obtener todos los testimonios publicados
              </h3>
              <div className="flex gap-2 mb-3">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-primary">
                  GET {apiEndpoint}/published
                </div>
                <Button
                  size="icon"
                  onClick={() =>
                    handleCopyCode(`GET ${apiEndpoint}/published`, "api-1")
                  }
                  className="h-fit"
                >
                  {copiedApi === "api-1" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="bg-sidebar p-4 rounded-lg text-sm">
                <p className="font-semibold text-txtPrimary mb-2">
                  Ejemplo de respuesta:
                </p>
                <pre className="overflow-x-auto font-mono text-xs text-txtSecondary">{`{
  "data": [
    {
      "id": "1",
      "authorName": "María González",
      "content": "Este programa transformó mi carrera...",
      "category": "Educación",
      "tags": ["ux-design", "transformación-carrera"],
      "mediaType": "text",
      "rating": 5,
      "views": 342
    }
  ]
}`}</pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-txtPrimary mb-3">
                Obtener testimonios por categoría
              </h3>
              <div className="flex gap-2">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-primary">
                  GET {apiEndpoint}/category/Educación
                </div>
                <Button
                  size="icon"
                  onClick={() =>
                    handleCopyCode(
                      `GET ${apiEndpoint}/category/Educación`,
                      "api-2",
                    )
                  }
                  className="h-fit"
                >
                  {copiedApi === "api-2" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-txtPrimary mb-3">
                Buscar testimonios
              </h3>
              <div className="flex gap-2">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-primary">
                  GET {apiEndpoint}/search?q=transformación
                </div>
                <Button
                  size="icon"
                  onClick={() =>
                    handleCopyCode(
                      `GET ${apiEndpoint}/search?q=transformación`,
                      "api-3",
                    )
                  }
                  className="h-fit"
                >
                  {copiedApi === "api-3" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-txtPrimary mb-3">
                Obtener un testimonio específico
              </h3>
              <div className="flex gap-2">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-primary">
                  GET {apiEndpoint}/id/1
                </div>
                <Button
                  size="icon"
                  onClick={() =>
                    handleCopyCode(`GET ${apiEndpoint}/id/1`, "api-4")
                  }
                  className="h-fit"
                >
                  {copiedApi === "api-4" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Embed Instructions */}
        <Card className="border-primary/20">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">
            Integración de testimonios
          </h2>
          <p className="text-txtSecondary mb-6">
            Agrega un widget de testimonios a tu sitio web con un solo snippet
          </p>

          <div className="space-y-6">
            <div>
              <p className="font-semibold text-txtPrimary mb-3">
                1. Copia este código en tu HTML:
              </p>
              <div className="flex gap-2">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-txtSecondary">
                  <pre>{embedCode}</pre>
                </div>
                <Button size="icon" onClick={handleCopyEmbed} className="h-fit">
                  {copiedEmbed ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-txtPrimary mb-3">
                2. Configura con JavaScript:
              </p>
              <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-txtSecondary">
                <pre>{`window.TestimonialEmbed = {
  apiUrl: '${apiEndpoint}',
  containerId: 'testimonial-cms-embed',
  limit: 5,
  category: 'Educación', // opcional
  style: 'carousel' // o 'grid', 'list'
}`}</pre>
              </div>
            </div>
          </div>
        </Card>

        {/* Integration Examples */}
        <Card className="border-primary/20">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">
            Ejemplos de integración
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-txtPrimary mb-3">
                HTML + CSS Grid
              </h3>
              <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-txtSecondary">
                <pre>{`<div id="testimonial-cms-embed" class="grid grid-cols-1 md:grid-cols-2 gap-6"><\/div>
<script src="${typeof window !== "undefined" ? window.location.origin : ""}/embed.js"><\/script>`}</pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-txtPrimary mb-3">
                Componente React
              </h3>
              <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-txtSecondary">
                <pre>{`import { useEffect } from 'react';

export function TestimonialEmbed() {
  useEffect(() => {
    fetch('${apiEndpoint}/published')
      .then(r => r.json())
      .then(data => {
        // Renderiza testimonios desde data.data
      });
  }, []);
}`}</pre>
              </div>
            </div>
          </div>
        </Card>

        {/* Webhook Configuration (Future) */}
        <Card className="bg-sidebar/50 opacity-50 border-border/50">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">
            Webhooks (Próximamente)
          </h2>
          <p className="text-txtSecondary">
            Recibe notificaciones cuando se publiquen o actualicen testimonios
          </p>
        </Card>
      </div>

      {/* Export Data - Admin Only */}
      {currentRole === "admin" && (
        <Card>
          <h2 className="text-2xl font-bold text-txtPrimary mb-6">
            Gestión de datos
          </h2>
          <div className="space-y-3 grid grid-cols-1 md:grid-cols-2">
            <Button variant="outline" className="w-full text-left">
              📥 Exportar testimonios (CSV)
            </Button>
            <Button variant="outline" className="w-full text-left">
              📥 Exportar testimonios (JSON)
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
