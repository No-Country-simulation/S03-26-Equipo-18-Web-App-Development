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
  const [copiedApi, setCopiedApi] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedApi(id);
    setTimeout(() => setCopiedApi(null), 2000);
  };

  return (
    <div className="p-6 lg:p-10">
      <TituloPage
        titulo="Configuración"
        descripcion="Widget de formulario para sitios externos."
      />

      <div className="grid gap-6 mb-8">
        {/* Widget de Formulario para Sitios Externos */}
        <Card className="border-primary/20">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">
            Widget de Formulario para Sitios Externos
          </h2>
          <p className="text-txtSecondary mb-6">
            Integra el formulario de testimonios en tu sitio web. Los usuarios
            pueden enviar testimonios directamente desde tu plataforma y se
            asociarán automáticamente a tu organización usando una API key.
          </p>

          <div className="space-y-8">
            <div>
              <p className="font-semibold text-txtPrimary mb-3">
                1. Agregar el contenedor HTML:
              </p>
              <div className="flex gap-2 mb-3">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-txtSecondary">
                  <pre>{`<div id="testimonial-widget"><\/div>`}</pre>
                </div>
                <Button
                  size="icon"
                  onClick={() =>
                    handleCopyCode(
                      `<div id="testimonial-widget"><\/div>`,
                      "widget-1",
                    )
                  }
                  className="h-fit"
                >
                  {copiedApi === "widget-1" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-txtSecondary">
                Este contenedor es donde se incrustará el iframe del formulario.
              </p>
            </div>

            <div>
              <p className="font-semibold text-txtPrimary mb-3">
                2. Cargar el script del widget:
              </p>
              <div className="flex gap-2 mb-3">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-txtSecondary">
                  <pre>{`<script src="http://localhost:3002/widget/widget.js"><\/script>`}</pre>
                </div>
                <Button
                  size="icon"
                  onClick={() =>
                    handleCopyCode(
                      `<script src="http://localhost:3002/widget/widget.js"><\/script>`,
                      "widget-2",
                    )
                  }
                  className="h-fit"
                >
                  {copiedApi === "widget-2" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <p className="font-semibold text-txtPrimary mb-3">
                3. Inicializar el widget con tu configuración:
              </p>
              <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-txtSecondary">
                <pre>{`<script>
  window.TestimonialWidget.init({
    containerId: "testimonial-widget",
    apiUrl: "http://localhost:3000",
    widgetUrl: "http://localhost:3002",
    theme: "light",
    apiKey: "tu-api-key-aqui" // 🔑 Requerida para asociar testimonios a tu org
  });
<\/script>`}</pre>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Nota sobre API Key:</strong> La funcionalidad de API
                key para asociar testimonios a organizaciones está en
                desarrollo. Próximamente podrás registrarte para obtener tu API
                key única desde el panel de administración.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
