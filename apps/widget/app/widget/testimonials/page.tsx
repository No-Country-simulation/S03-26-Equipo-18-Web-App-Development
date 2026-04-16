"use client";

import { useEffect, useState } from "react";
import TestimonialsGrid from "../components/TestimonialsGrid";
import ViewAllButton from "../components/ViewAllButton";
import { LoadingState, ErrorState, EmptyState } from "../components/States";

interface Testimonial {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorPosition?: string;
  authorCompany?: string;
  type: string;
  imageUrl?: string;
  videoUrl?: string;
  youtubeId?: string;
  views: number;
  clicks: number;
  isFeatured: boolean;
  publishedAt: string;
}

export default function TestimonialsWidget() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showAll, setShowAll] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const limit = 6; // Default limit
  const urlLimit = showAll ? 50 : limit;

  /* ================== INIT ================== */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setApiUrl(params.get("apiUrl") || "http://localhost:3000");

    const themeParam = params.get("theme");
    if (themeParam === "dark" || themeParam === "light") {
      setTheme(themeParam);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")
        .matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  /* ================== FETCH TESTIMONIALS ================== */
  useEffect(() => {
    if (!apiUrl) return;

    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          limit: urlLimit.toString(),
          sortBy: "publishedAt",
          sortOrder: "desc",
        });

        const res = await fetch(
          `${apiUrl}/api/public/testimonials/published?${params.toString()}`
        );

        if (!res.ok) throw new Error("Fehler beim Abrufen der Testimonials");

        const data = await res.json();
        setTestimonials(data.data || []);
      } catch (err: any) {
        setError(err.message || "Fehler beim Laden der Testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [apiUrl, urlLimit]);

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
  }, [testimonials, showAll, selectedTestimonial]);

  /* ================== HANDLE CLICK ================== */
  const handleTestimonialClick = async (testimonial: Testimonial) => {
    // Register click and open modal
    try {
      await fetch(
        `${apiUrl}/api/public/testimonials/${testimonial.id}/clicks`,
        { method: "POST" }
      );

      // Update local state
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === testimonial.id ? { ...t, clicks: t.clicks + 1 } : t
        )
      );
    } catch (err) {
      console.error("Error registering click:", err);
    }

    // Open modal with updated testimonial
    setSelectedTestimonial({
      ...testimonial,
      clicks: testimonial.clicks + 1,
    });
  };

  /* ================== CONTAINER STYLE ================== */
  const containerStyle = {
    fontFamily: "Inter, system-ui, sans-serif",
    backgroundColor: theme === "dark" ? "#0f172a" : "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
    maxWidth: "900px",
    width: "100%",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: 600 as const,
    color: theme === "dark" ? "#f9fafb" : "#111827",
    marginBottom: "20px",
  };

  if (loading) return <LoadingState theme={theme} />;
  if (error)
    return (
      <div style={containerStyle}>
        <ErrorState theme={theme} error={error} />
      </div>
    );
  if (testimonials.length === 0)
    return (
      <div style={containerStyle}>
        <EmptyState theme={theme} />
      </div>
    );

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Lo que dicen nuestros usuarios</h3>
      <TestimonialsGrid
        testimonials={testimonials}
        theme={theme}
        onTestimonialClick={handleTestimonialClick}
      />
      {!showAll && testimonials.length > limit && (
        <ViewAllButton
          theme={theme}
          onClick={() => setShowAll(true)}
          label="Ver todos los testimonios"
        />
      )}
      {showAll && (
        <ViewAllButton
          theme={theme}
          onClick={() => setShowAll(false)}
          label="Ver menos"
        />
      )}

      {/* MODAL */}
      {selectedTestimonial && (
        <div
          style={{
            position: "fixed" as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex" as const,
            alignItems: "center" as const,
            justifyContent: "center" as const,
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            style={{
              backgroundColor:
                theme === "dark" ? "#1f2937" : "#ffffff",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto" as const,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              position: "relative" as const,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              style={{
                position: "absolute" as const,
                top: "20px",
                right: "20px",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer" as const,
                color:
                  theme === "dark" ? "#9ca3af" : "#6b7280",
                padding: "0",
                width: "32px",
                height: "32px",
                display: "flex" as const,
                alignItems: "center" as const,
                justifyContent: "center" as const,
              }}
              onClick={() => setSelectedTestimonial(null)}
            >
              ✕
            </button>

            {/* Media */}
            {selectedTestimonial.type === "IMAGE" &&
              selectedTestimonial.imageUrl && (
                <img
                  src={selectedTestimonial.imageUrl}
                  alt={selectedTestimonial.authorName}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover" as const,
                    borderRadius: "12px",
                    marginBottom: "24px",
                  }}
                />
              )}

            {selectedTestimonial.type === "VIDEO" &&
              selectedTestimonial.youtubeId && (
                <iframe
                  width="100%"
                  height="300"
                  src={`https://www.youtube.com/embed/${selectedTestimonial.youtubeId}`}
                  style={{
                    borderRadius: "12px",
                    border: "none",
                    marginBottom: "24px",
                  }}
                  allowFullScreen
                />
              )}

            {selectedTestimonial.type === "VIDEO" &&
              selectedTestimonial.videoUrl && (
                <video
                  width="100%"
                  height="300"
                  controls
                  style={{
                    borderRadius: "12px",
                    marginBottom: "24px",
                  }}
                >
                  <source
                    src={selectedTestimonial.videoUrl}
                    type="video/mp4"
                  />
                  Tu navegador no soporta videos HTML5
                </video>
              )}

            {/* Title */}
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700 as const,
                color:
                  theme === "dark" ? "#f9fafb" : "#111827",
                marginBottom: "16px",
              }}
            >
              {selectedTestimonial.title}
            </h2>

            {/* Content */}
            <p
              style={{
                fontSize: "15px",
                lineHeight: "1.8" as const,
                color:
                  theme === "dark" ? "#d1d5db" : "#4b5563",
                marginBottom: "24px",
                whiteSpace: "pre-wrap" as const,
              }}
            >
              {selectedTestimonial.content}
            </p>

            {/* Author */}
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600 as const,
                color:
                  theme === "dark" ? "#f9fafb" : "#111827",
                marginBottom: "8px",
              }}
            >
              {selectedTestimonial.authorName}
              {selectedTestimonial.isFeatured && (
                <span
                  style={{
                    display: "inline-block" as const,
                    fontSize: "12px",
                    fontWeight: 600 as const,
                    color:
                      theme === "dark"
                        ? "#34d399"
                        : "#059669",
                    marginLeft: "8px",
                  }}
                >
                  ★ Destacado
                </span>
              )}
            </div>

            {/* Position & Company */}
            {(selectedTestimonial.authorPosition ||
              selectedTestimonial.authorCompany) && (
              <div
                style={{
                  fontSize: "13px",
                  color:
                    theme === "dark" ? "#9ca3af" : "#6b7280",
                  marginBottom: "20px",
                }}
              >
                {selectedTestimonial.authorPosition}
                {selectedTestimonial.authorPosition &&
                  selectedTestimonial.authorCompany &&
                  " • "}
                {selectedTestimonial.authorCompany}
              </div>
            )}

            {/* Stats */}
            <div
              style={{
                fontSize: "13px",
                color:
                  theme === "dark" ? "#6b7280" : "#9ca3af",
                paddingTop: "16px",
                borderTop:
                  theme === "dark"
                    ? "1px solid #374151"
                    : "1px solid #e5e7eb",
              }}
            >
              <span>👆 {selectedTestimonial.clicks} clicks</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
