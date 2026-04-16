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
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const copyButton = (code: string, id: string) => (
    <Button
      size="icon"
      onClick={() => handleCopyCode(code, id)}
      className="h-fit"
    >
      {copiedCode === id ? (
        <Check className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </Button>
  );

  return (
    <div className="p-6 lg:p-10">
      <TituloPage
        titulo="Documentación de Widgets"
        descripcion="Guía completa para integrar los widgets de testimonios y formularios en tu sitio."
      />

      <div className="grid gap-8">
        {/* ============================================
            CONFIGURACIÓN CENTRALIZADA
            ============================================ */}
        <Card className="border-primary/40 bg-sidebar/50">
          <h2 className="text-2xl font-bold text-primary mb-4">
            ⚙️ Configuración Centralizada
          </h2>
          <p className="text-txtSecondary mb-6">
            Todos los widgets usan esta configuración. Cambiar aquí afecta a
            toda la aplicación.
          </p>

          <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-gray-300 mb-4 border border-primary/30">
            <pre>{`// Archivo: src/app/config/widgets.ts

export const WIDGETS_CONFIG = {
  api: {
    url: 'http://localhost:3000',        // URL del Backend
  },
  widget: {
    url: 'http://localhost:3002',        // URL del Servidor de Widgets
  },

  // Testimonio
  testimonials: {
    theme: 'light',                       // 'light' | 'dark'
    limit: 6,                             // 1-50 testimonios
    mode: 'grid',                         // 'grid' | 'carousel'
  },

  // Formulario
  form: {
    theme: 'light',                       // 'light' | 'dark'
  },
};`}</pre>
          </div>

          <div className="bg-sidebar/50 border-l-4 border-primary/50 p-4 rounded">
            <p className="text-txtSecondary text-sm">
              <strong>💡 Tip:</strong> Para cambiar la configuración global,
              edita solo este archivo. No necesitas cambiar nada en otros
              lugares.
            </p>
          </div>
        </Card>

        {/* ============================================
            WIDGETS TESTIMONIOS
            ============================================ */}
        <Card className="border-primary/20">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">
            📝 Widget de Testimonios
          </h2>
          <p className="text-txtSecondary mb-6">
            Muestra testimonios en modo grid o carrusel. Los usuarios pueden ver
            el contenido completo en un modal.
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <h3 className="font-semibold text-txtPrimary mb-3">
                1️⃣ HTML - Agregar contenedor
              </h3>
              <p className="text-sm text-txtSecondary mb-3">
                Este es el lugar donde aparecerá el widget:
              </p>
              <div className="flex gap-2 mb-3">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-gray-300">
                  <pre>{`<div id="testimonials-widget"></div>`}</pre>
                </div>
                {copyButton(
                  `<div id="testimonials-widget"></div>`,
                  "testimonials-container",
                )}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="font-semibold text-txtPrimary mb-3">
                2️⃣ Cargar el script
              </h3>
              <p className="text-sm text-txtSecondary mb-3">
                Ejecuta esto en tu HTML o app:
              </p>
              <div className="flex gap-2 mb-3">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-gray-300">
                  <pre>{`<script src="http://localhost:3002/widget/widget.js"><\\/script>`}</pre>
                </div>
                {copyButton(
                  `<script src="http://localhost:3002/widget/widget.js"></script>`,
                  "testimonials-script",
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="font-semibold text-txtPrimary mb-3">
                3️⃣ Inicializar el widget
              </h3>
              <p className="text-sm text-txtSecondary mb-3">
                Llama a init() después de que el script cargue:
              </p>
              <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-gray-300 mb-3">
                <pre>{`<script>
  window.TestimonialWidget.init({
    apiUrl: 'http://localhost:3000',
    widgetUrl: 'http://localhost:3002',
    theme: 'light',                    // 'light' | 'dark'
    
    testimonials: {
      containerId: 'testimonials-widget',
      limit: '6',                      // Cuántos mostrar (1-50)
      mode: 'grid',                    // 'grid' | 'carousel'
    },
  });
<\\/script>`}</pre>
              </div>
              {copyButton(
                `<script>
  window.TestimonialWidget.init({
    apiUrl: 'http://localhost:3000',
    widgetUrl: 'http://localhost:3002',
    theme: 'light',
    testimonials: {
      containerId: 'testimonials-widget',
      limit: '6',
      mode: 'grid',
    },
  });
</script>`,
                "testimonials-init",
              )}
            </div>

            {/* Options */}
            <div>
              <h3 className="font-semibold text-txtPrimary mb-3">
                ⚙️ Opciones disponibles
              </h3>
              <div className="bg-sidebar p-4 rounded-lg space-y-2 text-sm">
                <p className="text-gray-300">
                  <span className="font-mono bg-gray-700 px-2 py-1 rounded mr-2">
                    theme
                  </span>
                  <span className="text-gray-300">'light' | 'dark'</span>
                </p>
                <p className="text-gray-300">
                  <span className="font-mono bg-gray-700 px-2 py-1 rounded mr-2">
                    limit
                  </span>
                  <span className="text-gray-300">
                    Número de testimonios (1-50)
                  </span>
                </p>
                <p className="text-gray-300">
                  <span className="font-mono bg-gray-700 px-2 py-1 rounded mr-2">
                    mode
                  </span>
                  <span className="text-gray-300">
                    'grid' (2-3 columnas) | 'carousel' (carrusel)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* ============================================
            WIDGETS FORMULARIO
            ============================================ */}
        <Card className="border-primary/20">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">
            📋 Widget de Formulario
          </h2>
          <p className="text-txtSecondary mb-6">
            Formulario para que los usuarios envíen testimonios directamente
            desde tu sitio web.
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <h3 className="font-semibold text-txtPrimary mb-3">
                1️⃣ HTML - Agregar contenedor
              </h3>
              <div className="flex gap-2 mb-3">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-txtSecondary">
                  <pre>{`<div id="testimonial-form-widget"></div>`}</pre>
                </div>
                {copyButton(
                  `<div id="testimonial-form-widget"></div>`,
                  "form-container",
                )}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="font-semibold text-txtPrimary mb-3">
                2️⃣ Cargar el script
              </h3>
              <p className="text-sm text-txtSecondary mb-3">
                Es el mismo script que para testimonios:
              </p>
              <div className="flex gap-2 mb-3">
                <div className="bg-sidebar p-4 rounded-lg flex-1 font-mono text-sm overflow-x-auto text-txtSecondary">
                  <pre>{`<script src="http://localhost:3002/widget/widget.js"><\\/script>`}</pre>
                </div>
                {copyButton(
                  `<script src="http://localhost:3002/widget/widget.js"></script>`,
                  "form-script",
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="font-semibold text-txtPrimary mb-3">
                3️⃣ Inicializar (agregar form config)
              </h3>
              <p className="text-sm text-txtSecondary mb-3">
                Agregá la propiedad 'form' al init():
              </p>
              <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-txtSecondary mb-3">
                <pre>{`<script>
  window.TestimonialWidget.init({
    apiUrl: 'http://localhost:3000',
    widgetUrl: 'http://localhost:3002',
    theme: 'light',
    
    // ← Agregar esto
    form: {
      containerId: 'testimonial-form-widget',
    },
  });
<\\/script>`}</pre>
              </div>
            </div>
          </div>
        </Card>

        {/* ============================================
            AMBOS JUNTOS
            ============================================ */}
        <Card className="border-primary/40 bg-sidebar/50">
          <h2 className="text-2xl font-bold text-primary mb-4">
            ✨ Usar Testimonios + Formulario
          </h2>
          <p className="text-txtSecondary mb-6">
            Combiná ambos widgets en una sola inicialización:
          </p>

          <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-gray-300 border border-primary/30">
            <pre>{`<div id="testimonials-widget"></div>
<div id="testimonial-form-widget"></div>

<script src="http://localhost:3002/widget/widget.js"><\\/script>
<script>
  window.TestimonialWidget.init({
    apiUrl: 'http://localhost:3000',
    widgetUrl: 'http://localhost:3002',
    theme: 'light',

    // Testimonios
    testimonials: {
      containerId: 'testimonials-widget',
      limit: '6',
      mode: 'grid',
    },

    // Formulario
    form: {
      containerId: 'testimonial-form-widget',
    },
  });
<\\/script>`}</pre>
          </div>
        </Card>

        {/* ============================================
            REACT/NEXT.JS
            ============================================ */}
        <Card className="border-primary/40 bg-sidebar/50">
          <h2 className="text-2xl font-bold text-primary mb-4">
            ⚛️ Usar en React / Next.js
          </h2>
          <p className="text-txtSecondary mb-6">
            Si usas React o Next.js, puedes usar el widget dentro de un useEffect para asegurarte de que se inicialice después de que el componente se monte:
          </p>

          <div className="bg-sidebar p-4 rounded-lg font-mono text-sm overflow-x-auto text-gray-300 border border-primary/30 mb-4">
            <pre>{`// TestimonialsSection.tsx
import { useEffect } from 'react';
import { WIDGETS_CONFIG } from '@/config/widgets';

export function TestimonialsSection() {
  useEffect(() => {
    if (!window.TestimonialWidget) return;

    window.TestimonialWidget.init({
      apiUrl: WIDGETS_CONFIG.api.url,
      widgetUrl: WIDGETS_CONFIG.widget.url,
      theme: WIDGETS_CONFIG.testimonials.theme,

      testimonials: {
        containerId: 'testimonials-widget',
        limit: WIDGETS_CONFIG.testimonials.limit.toString(),
        mode: WIDGETS_CONFIG.testimonials.mode,
      },

      form: {
        containerId: 'testimonial-form-widget',
      },
    });
  }, []);

  return (
    <>
      <div id="testimonials-widget" />
      <div id="testimonial-form-widget" />
    </>
  );
}`}</pre>
          </div>

          <div className="bg-sidebar/50 border-l-4 border-primary/50 p-4 rounded">
            <p className="text-txtSecondary text-sm">
              <strong>✅ Ventaja:</strong> Cambias la configuración en un solo
              lugar (config/widgets.ts) y todos los widgets se actualizan
              automáticamente.
            </p>
          </div>
        </Card>

        {/* ============================================
            TROUBLESHOOTING
            ============================================ */}
        <Card className="border-red-900/30 bg-red-950/20">
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            🔧 Solución de Problemas
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-red-400 mb-2">
                ❌ "TestimonialWidget is not defined"
              </h3>
              <p className="text-txtSecondary text-sm">
                El script no cargó correctamente. Verifica:
              </p>
              <ul className="list-disc list-inside text-txtSecondary text-sm mt-2 ml-2">
                <li>
                  ¿El servidor de widgets está corriendo en
                  http://localhost:3002?
                </li>
                <li>¿La URL del script es correcta?</li>
                <li>Abre DevTools (F12) y mira la pestaña Network</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-400 mb-2">
                ❌ "Container not found"
              </h3>
              <p className="text-txtSecondary text-sm">
                El div no existe. Verifica:
              </p>
              <ul className="list-disc list-inside text-txtSecondary text-sm mt-2 ml-2">
                <li>El id del div coincide con containerId</li>
                <li>El div existe en el HTML antes de llamar a init()</li>
                <li>No hay typos en el nombre</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-red-400 mb-2">
                ❌ El iframe no muestra contenido
              </h3>
              <p className="text-txtSecondary text-sm">Verifica:</p>
              <ul className="list-disc list-inside text-txtSecondary text-sm mt-2 ml-2">
                <li>¿El backend está corriendo en http://localhost:3000?</li>
                <li>¿Hay testimonios en la base de datos?</li>
                <li>Abre la consola del navegador (F12 → Console)</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* ============================================
            URLS IMPORTANTES
            ============================================ */}
        <Card className="border-gray-200">
          <h2 className="text-2xl font-bold text-txtPrimary mb-4">
            🔗 URLs Importantes
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-sidebar rounded">
              <span className="text-txtSecondary">Backend API:</span>
              <span className="font-mono text-sm">http://localhost:3000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-sidebar rounded">
              <span className="text-txtSecondary">Widget Server:</span>
              <span className="font-mono text-sm">http://localhost:3002</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-sidebar rounded">
              <span className="text-txtSecondary">Script Widget:</span>
              <span className="font-mono text-sm">
                http://localhost:3002/widget/widget.js
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
