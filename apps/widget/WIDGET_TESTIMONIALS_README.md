# Widget de Testimonios

Widget embebible para mostrar testimonios publicados en sitios externos.

## 🎯 Características

- **Testimonios destacados primero** - Los testimonios con `isFeatured: true` aparecen al inicio
- **Contenido completo** - Se muestra el testimonio completo, no resumen
- **Tracking automático** - Registra clicks y vistas de cada testimonio
- **Múltiples tipos** - Soporta texto, imágenes y videos (YouTube)
- **Tema personalizable** - Modo claro/oscuro
- **Responsive** - Se adapta automáticamente a cualquier tamaño
- **Auto-height** - El iframe se ajusta automáticamente según el contenido

## 📖 Uso Rápido

```html
<div id="testimonials-widget"></div>

<script src="https://widgets.tudominio.com/widget/testimonials.js"></script>
<script>
  TestimonialsWidget.init({
    containerId: 'testimonials-widget',
    apiUrl: 'https://api.tudominio.com',
    widgetUrl: 'https://widgets.tudominio.com',
    theme: 'light',
    limit: '6'
  });
</script>
```

## ⚙️ Configuración

| Opción | Tipo | Descripción |
|--------|------|-------------|
| `containerId` | string | ID del elemento HTML (REQUERIDO) |
| `apiUrl` | string | URL de la API backend |
| `widgetUrl` | string | URL del servicio widget |
| `theme` | string | 'light' o 'dark' |
| `limit` | string | Número de testimonios a mostrar |
| `featured` | boolean | Solo mostrar destacados |

## 🔧 Tecnología

- **Frontend**: React + TypeScript
- **Comunicación**: postMessage API para auto-height del iframe
- **Fetch**: Obtiene testimonios desde `/api/public/testimonials/published`
- **Tracking**: Registra vistas y clicks en endpoints públicos

Ver `WIDGET_TESTIMONIALS_EXAMPLE.html` para un ejemplo completo de implementación.
