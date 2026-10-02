"use client";
import { useEffect, useState } from "react";
import HeroCanvas from "@/components/canvas/HeroCanvas";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 15%, #FFFFFF 0%, #FAF7F2 50%, #F3ECE1 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        paddingTop: "88px",
      }}
    >
      {/* 1. EXOTIC HORIZONTAL DYNAMIC CANVAS (FULL PROTAGONISM) */}
      <HeroCanvas />

      {/* Decorative Architectural Accent Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(184,149,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Ambient Focal Lighting */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "450px",
          background: "radial-gradient(ellipse, rgba(184, 149, 42, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* MAIN CONTENT: EXPANSIVE & MONUMENTAL */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "3.5rem 1.5rem 2rem",
          maxWidth: "1040px",
        }}
      >
        {/* Main Display Headline */}
        <h1
          className="text-display-xl"
          style={{
            color: "var(--navy-deepest)",
            marginBottom: "1.5rem",
            letterSpacing: "-0.035em",
            lineHeight: 1.04,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
          }}
        >
          Construimos
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #091523 0%, #B8952A 55%, #826315 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "inline-block",
            }}
          >
            empresas más sólidas.
          </span>
        </h1>

        {/* Step 3: Integrated Strategic Pillars Line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.2rem",
            flexWrap: "wrap",
            marginBottom: "1.75rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.38s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.38s",
          }}
        >
          {["LEGAL", "FINANZAS", "ESTRATEGIA", "TECNOLOGÍA"].map((pillar, idx) => (
            <div key={pillar} style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "var(--navy-deepest)",
                  background: "rgba(255, 255, 255, 0.55)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  padding: "0.35rem 0.95rem",
                  borderRadius: "9999px",
                  border: "1px solid rgba(184, 149, 42, 0.2)",
                  boxShadow: "0 4px 16px rgba(13, 30, 46, 0.04)",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = "var(--gold-mid)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(184, 149, 42, 0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(184, 149, 42, 0.2)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(13, 30, 46, 0.04)";
                }}
              >
                {pillar}
              </span>
              {idx < 3 && (
                <span style={{ color: "var(--gold-mid)", fontSize: "0.7rem", opacity: 0.75 }}>
                  ✦
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Step 4: Refined Non-Redundant Value Proposition */}
        <p
          className="text-body-xl"
          style={{
            color: "var(--navy-mid)",
            maxWidth: "680px",
            marginBottom: "2.75rem",
            lineHeight: 1.8,
            fontSize: "1.12rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          Servicios y soluciones empresariales para ordenar y fortalecer tu negocio. Integramos
          asesoría legal, control financiero, estrategia directiva y optimización de procesos en un solo equipo.
        </p>

        {/* Step 5: Focused Executive CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.65s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
          }}
        >
          <a
            href="#que-hacemos"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#que-hacemos")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "1rem 2.4rem",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(184,149,42,0.32)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            Conoce nuestros servicios
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

      </div>

      {/* 2. DYNAMIC BOTTOM STREAM TICKER */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          borderTop: "1px solid rgba(184,149,42,0.2)",
          borderBottom: "1px solid rgba(184,149,42,0.12)",
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          padding: "0.85rem 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "marquee 32s linear infinite",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          {[
            "SOLUCIONES EMPRESARIALES",
            "✦",
            "CONTROL DE CAJA Y FINANZAS",
            "✦",
            "BLINDAJE CONTRACTUAL Y LABORAL",
            "✦",
            "GESTIÓN DE CARTERA",
            "✦",
            "OPTIMIZACIÓN DE PROCESOS",
            "✦",
            "ESTRUCTURA DE COSTOS Y MÁRGENES",
            "✦",
            "COMITÉ DIRECTIVO ACOMPAÑADO",
            "✦",
            "DIAGNÓSTICO INICIAL",
            "✦",
            "SOLUCIONES EMPRESARIALES",
            "✦",
            "CONTROL DE CAJA Y FINANZAS",
            "✦",
            "BLINDAJE CONTRACTUAL Y LABORAL",
            "✦",
            "GESTIÓN DE CARTERA",
            "✦",
            "OPTIMIZACIÓN DE PROCESOS",
            "✦",
            "ESTRUCTURA DE COSTOS Y MÁRGENES",
            "✦",
            "COMITÉ DIRECTIVO ACOMPAÑADO",
            "✦",
            "DIAGNÓSTICO INICIAL",
          ].map((item, index) => (
            <span
              key={index}
              style={{
                fontSize: "0.75rem",
                fontWeight: item === "✦" ? 400 : 700,
                letterSpacing: "0.16em",
                color: item === "✦" ? "var(--gold-mid)" : "var(--navy-deepest)",
                opacity: item === "✦" ? 1 : 0.85,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes pulse-gold {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
