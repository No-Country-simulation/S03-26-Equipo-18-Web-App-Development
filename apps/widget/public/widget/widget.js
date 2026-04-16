(function () {
  let listenerAdded = false;

  window.TestimonialWidget = {
    init: function (options) {
      const {
        apiUrl,
        widgetUrl,
        theme = "light",
        testimonials,
        form,
      } = options;

      const allowedOrigin = new URL(widgetUrl).origin;

      // 🔒 Listener global (una sola vez)
      if (!listenerAdded) {
        window.addEventListener("message", (event) => {
          if (event.origin !== allowedOrigin) return;

          if (event.data?.type === "WIDGET_HEIGHT") {
            const iframe = document.querySelector(
              `iframe[data-widget-id="${event.data.id}"]`
            );

            if (iframe) {
              iframe.style.height = event.data.height + "px";
            }
          }
        });

        listenerAdded = true;
      }

      // =========================
      // 👉 TESTIMONIALS
      // =========================
      if (testimonials) {
        const container = document.getElementById(testimonials.containerId);
        if (!container) {
          console.error("Testimonials container not found");
          return;
        }

        const iframe = document.createElement("iframe");
        const id = "tw-" + Math.random().toString(36).slice(2);

        iframe.dataset.widgetId = id;

        const params = new URLSearchParams({
          apiUrl,
          widgetUrl,
          theme,
          limit: testimonials.limit || "10",
          mode: testimonials.mode || "grid",
          widgetId: id,
        });

        iframe.src = `${widgetUrl}/widget/testimonials?${params}`;
        iframe.style.width = "100%";
        iframe.style.border = "none";
        iframe.style.height = "200px";

        container.innerHTML = "";
        container.appendChild(iframe);
      }

      // =========================
      // 👉 FORM
      // =========================
      if (form) {
        const container = document.getElementById(form.containerId);
        if (!container) {
          console.error("Form container not found");
          return;
        }

        const iframe = document.createElement("iframe");
        const id = "fw-" + Math.random().toString(36).slice(2);

        iframe.dataset.widgetId = id;

        const params = new URLSearchParams({
          apiUrl,
          theme,
          categoryId: form.categoryId || "",
          widgetId: id,
        });

        iframe.src = `${widgetUrl}/widget/form?${params}`;
        iframe.style.width = "100%";
        iframe.style.border = "none";
        iframe.style.height = "400px";

        container.innerHTML = "";
        container.appendChild(iframe);
      }
    },
  };
})();