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
          Una firma multidisciplinaria que integra control financiero, blindaje jurídico,
          organización directiva e inteligencia de datos sobre el mismo negocio.
        </p>

        {/* Step 5: Focused Executive CTA Group */}
        <div
          style={{
            display: "flex",
            gap: "1.25rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.65s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
          }}
        >
          <a
            href="#contacto"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "1rem 2.2rem",
              fontSize: "0.98rem",
              fontWeight: 600,
              boxShadow: "0 10px 30px rgba(184,149,42,0.32)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            Conversemos sobre tu empresa
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <a
            href="#que-hacemos"
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#que-hacemos")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "1rem 2rem",
              fontSize: "0.98rem",
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(184,149,42,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            Conoce nuestro enfoque
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
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(12px)",
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
            "DIAGNÓSTICO 360°",
            "✦",
            "CONTROL FINANCIERO PYME",
            "✦",
            "BLINDAJE CONTRACTUAL",
            "✦",
            "GERENCIA CON DATOS",
            "✦",
            "CARTERA INTELIGENTE",
            "✦",
            "TRANSFORMACIÓN DIGITAL",
            "✦",
            "ESTRUCTURA SOCIETARIA",
            "✦",
            "DIAGNÓSTICO 360°",
            "✦",
            "CONTROL FINANCIERO PYME",
            "✦",
            "BLINDAJE CONTRACTUAL",
            "✦",
            "GERENCIA CON DATOS",
            "✦",
            "CARTERA INTELIGENTE",
            "✦",
            "TRANSFORMACIÓN DIGITAL",
            "✦",
            "ESTRUCTURA SOCIETARIA",
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
