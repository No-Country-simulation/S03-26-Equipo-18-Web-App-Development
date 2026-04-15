(function () {
  window.TestimonialWidget = {
    init: function (options) {
      const container = document.getElementById(options.containerId);

      if (!container) {
        console.error("Container not found");
        return;
      }

      // Limpiar iframes anteriores para evitar duplicados
      const existingIframes = container.querySelectorAll('iframe');
      existingIframes.forEach(iframe => iframe.remove());

      const iframe = document.createElement("iframe");

      const params = new URLSearchParams({
        apiUrl: options.apiUrl,
        categoryId: options.categoryId || "",
        theme: options.theme || "light",
      });

      iframe.src = `${options.widgetUrl}/widget/form?${params.toString()}`;
      iframe.width = "100%";
      iframe.style.border = "none";
      iframe.style.display = "block";

      // altura inicial (temporal)
      iframe.style.height = "400px";

      //  escucha el resize del widget
      window.addEventListener("message", function (event) {
        if (event.data?.type === "WIDGET_HEIGHT") {
          iframe.style.height = event.data.height + "px";
        }
      });

      container.appendChild(iframe);
    },
  };
})();