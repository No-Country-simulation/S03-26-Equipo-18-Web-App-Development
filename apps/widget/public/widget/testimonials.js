(function () {
  window.TestimonialsWidget = {
    init: function (options) {
      const container = document.getElementById(options.containerId);

      if (!container) {
        console.error("Container not found");
        return;
      }

      // Limpiar iframes anteriores para evitar duplicados
      const existingIframes = container.querySelectorAll("iframe");
      existingIframes.forEach((iframe) => iframe.remove());

      const iframe = document.createElement("iframe");

      const params = new URLSearchParams({
        apiUrl: options.apiUrl || "http://localhost:3000",
        widgetUrl: options.widgetUrl || "http://localhost:3001",
        theme: options.theme || "light",
        limit: options.limit || "6",
        featured: options.featured || "",
      });

      iframe.src = `${options.widgetUrl}/widget/testimonials?${params.toString()}`;
      iframe.width = "100%";
      iframe.style.border = "none";
      iframe.style.display = "block";

      // altura inicial (temporal)
      iframe.style.height = "400px";

      // escucha el resize del widget
      window.addEventListener("message", function (event) {
        if (event.data?.type === "WIDGET_HEIGHT") {
          iframe.style.height = event.data.height + "px";
        }
      });

      container.appendChild(iframe);
    },
  };
})();
