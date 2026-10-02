"use client";
import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "6.2rem",
        right: "2.1rem",
        zIndex: 990,
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-3px) scale(1.06)"
            : "translateY(0) scale(1)"
          : "translateY(16px) scale(0.85)",
        transition: "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        type="button"
        aria-label="Ir al inicio"
        title="Ir al inicio"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: hovered ? "0.65rem 1.1rem" : "0.75rem",
          borderRadius: "9999px",
          background: "rgba(9, 21, 35, 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: hovered
            ? "1.5px solid var(--gold-mid)"
            : "1px solid rgba(184, 149, 42, 0.35)",
          boxShadow: hovered
            ? "0 10px 28px rgba(0, 0, 0, 0.35), 0 2px 10px rgba(184, 149, 42, 0.3)"
            : "0 6px 20px rgba(0, 0, 0, 0.25)",
          color: "var(--gold-mid)",
          cursor: "pointer",
          transition: "all 0.25s ease",
          outline: "none",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            transition: "transform 0.2s ease",
          }}
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>

        {hovered && (
          <span
            style={{
              fontSize: "0.76rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            Inicio
          </span>
        )}
      </button>
    </div>
  );
}
