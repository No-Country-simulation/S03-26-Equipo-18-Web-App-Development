"use client";

import { useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";

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

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  theme: string;
  mode: "grid" | "carousel";
  onTestimonialClick: (testimonial: Testimonial) => void;
}

export default function TestimonialsGrid({
  testimonials,
  theme,
  mode,
  onTestimonialClick,
}: TestimonialsGridProps) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Handle resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel mode logic
  const itemsPerSlide = windowWidth >= 768 ? 3 : 1;
  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleTestimonials =
    mode === "carousel"
      ? testimonials.slice(
          currentIndex * itemsPerSlide,
          currentIndex * itemsPerSlide + itemsPerSlide
        )
      : testimonials;

  const gridStyle =
    mode === "grid"
      ? {
          display: "grid",
          gridTemplateColumns: windowWidth >= 768 ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }
      : {
          display: "grid",
          gridTemplateColumns:
            windowWidth >= 768 ? "repeat(3, 1fr)" : "repeat(1, 1fr)",
          gap: "20px",
          marginBottom: "30px",
          animation: "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        };

  const containerStyle = {
    position: "relative" as const,
  };

  const arrowStyle = (direction: "left" | "right") => ({
    position: "absolute" as const,
    top: "50%",
    [direction]: "-50px",
    transform: "translateY(-50%)",
    background: theme === "dark" ? "#374151" : "#e5e7eb",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme === "dark" ? "#f3f4f6" : "#1f2937",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "background 0.2s",
  });

  const dotsContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "20px",
  };

  const dotStyle = (isActive: boolean) => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: isActive
      ? theme === "dark"
        ? "#3b82f6"
        : "#1e40af"
      : theme === "dark"
      ? "#6b7280"
      : "#d1d5db",
    cursor: "pointer",
    transition: "background 0.2s",
    border: "none",
    padding: "0",
  });

  return (
    <div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              theme={theme}
              onClick={() => onTestimonialClick(testimonial)}
            />
          ))}
        </div>

        {/* Navigation Arrows - Only for carousel mode */}
        {mode === "carousel" && totalSlides > 1 && (
          <>
            <button
              onClick={handlePrev}
              style={arrowStyle("left")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  theme === "dark" ? "#4b5563" : "#d1d5db")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  theme === "dark" ? "#374151" : "#e5e7eb")
              }
              aria-label="Previous slide"
            >
              &#10094;
            </button>
            <button
              onClick={handleNext}
              style={arrowStyle("right")}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  theme === "dark" ? "#4b5563" : "#d1d5db")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  theme === "dark" ? "#374151" : "#e5e7eb")
              }
              aria-label="Next slide"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators - Only for carousel mode */}
      {mode === "carousel" && totalSlides > 1 && (
        <div style={dotsContainerStyle}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              style={dotStyle(index === currentIndex)}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
