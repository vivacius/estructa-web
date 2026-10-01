"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HeroCanvas from "@/components/canvas/HeroCanvas";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [activePillar, setActivePillar] = useState<number>(0);
  const imgCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Auto rotate pillars highlight
    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % 4);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Parallax tilt on image card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgCardRef.current || window.innerWidth < 1024) return;
    const rect = imgCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    imgCardRef.current.style.transform = `perspective(1000px) rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!imgCardRef.current) return;
    imgCardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)";
  };

  const pillars = [
    { title: "Legal", desc: "Blindaje contractual y societario", icon: "⚖️" },
    { title: "Finanzas", desc: "Control de flujo de caja y rentabilidad", icon: "📈" },
    { title: "Estrategia", desc: "Diagnóstico 360° y visión directiva", icon: "🧭" },
    { title: "Tecnología", desc: "Automatización y decisiones con datos", icon: "⚡" },
  ];

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 0%, #FFFFFF 0%, #FAF7F2 45%, #F4EFE6 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        paddingTop: "90px",
      }}
    >
      {/* 1. EXOTIC HORIZONTAL ANIMATED CANVAS */}
      <HeroCanvas />

      {/* Decorative Subtle Grid Lines for Architectural Depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(184,149,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Radial soft glow focus */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(184, 149, 42, 0.08) 0%, rgba(255,255,255,0) 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* MAIN HERO CONTENT */}
      <div className="container" style={{ position: "relative", zIndex: 3, flex: 1, display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "3.5rem",
            alignItems: "center",
            width: "100%",
            padding: "2rem 0 3.5rem",
          }}
          className="hero-grid"
        >
          {/* LEFT: Progressive Reveal Typography & Interactive Flow */}
          <div>
            {/* Step 1: Eyebrow Capsule */}
            <div
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "rgba(255, 255, 255, 0.88)",
                border: "1px solid rgba(184,149,42,0.3)",
                boxShadow: "0 4px 16px rgba(184,149,42,0.1)",
                borderRadius: "9999px",
                padding: "0.4rem 1.1rem",
                marginBottom: "1.5rem",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#B8952A",
                  boxShadow: "0 0 10px #B8952A",
                  animation: "pulse-gold 2s infinite",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--navy-deepest)",
                }}
              >
                Firma de Soluciones Empresariales Integrales
              </span>
            </div>

            {/* Step 2: Main Display Headline */}
            <h1
              className="text-display-xl"
              style={{
                color: "var(--navy-deepest)",
                marginBottom: "1.25rem",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
              }}
            >
              Construimos
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #091523 0%, #B8952A 60%, #8A6B1A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                empresas más sólidas.
              </span>
            </h1>

            {/* Step 3: Interactive Staggered Pillars Navigation */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: "0.6rem",
                marginBottom: "1.75rem",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            >
              {pillars.map((p, idx) => {
                const isActive = activePillar === idx;
                return (
                  <button
                    key={p.title}
                    onClick={() => setActivePillar(idx)}
                    type="button"
                    style={{
                      padding: "0.65rem 0.85rem",
                      borderRadius: "10px",
                      background: isActive ? "rgba(184,149,42,0.12)" : "rgba(255,255,255,0.7)",
                      border: isActive ? "1px solid var(--gold-mid)" : "1px solid rgba(13,30,46,0.08)",
                      boxShadow: isActive ? "0 4px 14px rgba(184,149,42,0.18)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: isActive ? "scale(1.03)" : "scale(1)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", width: "100%" }}>
                      <span style={{ fontSize: "1rem" }}>{p.icon}</span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "0.78rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: isActive ? "var(--gold-mid)" : "var(--navy-deepest)",
                        }}
                      >
                        {p.title}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: isActive ? "var(--navy-mid)" : "var(--text-muted-light)",
                        marginTop: "0.2rem",
                        lineHeight: 1.25,
                      }}
                    >
                      {p.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Step 4: Value Proposition Body */}
            <p
              className="text-body-xl"
              style={{
                color: "var(--navy-mid)",
                maxWidth: "520px",
                marginBottom: "2.25rem",
                lineHeight: 1.75,
                fontSize: "1.05rem",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
              }}
            >
              Unificamos legal, finanzas, estrategia y tecnología bajo un solo método.
              Diagnóstico 360°, control de números, reducción de riesgos y tecnología de datos
              para transformar la dirección de tu empresa.
            </p>

            {/* Step 5: High-Impact Action CTAs */}
            <div
              style={{
                display: "flex",
                gap: "1.1rem",
                flexWrap: "wrap",
                alignItems: "center",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
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
                  padding: "0.95rem 1.9rem",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  boxShadow: "0 8px 24px rgba(184,149,42,0.3)",
                }}
              >
                Conversemos sobre tu empresa
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              <a
                href="https://wa.me/573013555173"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: "0.95rem 1.6rem",
                  fontSize: "0.92rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  background: "#ffffff",
                  border: "1px solid rgba(184,149,42,0.35)",
                }}
              >
                <span style={{ color: "#25D366", fontSize: "1.1rem", lineHeight: 1 }}>●</span>
                WhatsApp: 301 355 5173
              </a>
            </div>
          </div>

          {/* RIGHT: High-Tech Glass Architectural Horizon Matrix */}
          <div
            style={{
              position: "relative",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.95)",
              transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
            className="hero-media-wrapper"
          >
            {/* Luminous ambient halo behind card */}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                background: "linear-gradient(135deg, rgba(184,149,42,0.2) 0%, rgba(9,21,35,0.06) 100%)",
                borderRadius: "32px",
                filter: "blur(24px)",
                zIndex: 0,
              }}
            />

            {/* Geometric Gold Corner Accents */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                width: "48px",
                height: "48px",
                borderTop: "2px solid var(--gold-mid)",
                borderLeft: "2px solid var(--gold-mid)",
                borderRadius: "8px 0 0 0",
                zIndex: 4,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "-10px",
                width: "48px",
                height: "48px",
                borderBottom: "2px solid var(--gold-mid)",
                borderRight: "2px solid var(--gold-mid)",
                borderRadius: "0 0 8px 0",
                zIndex: 4,
                pointerEvents: "none",
              }}
            />

            {/* Main Interactive 3D Card */}
            <div
              ref={imgCardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: "relative",
                zIndex: 2,
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(9,21,35,0.14), 0 4px 16px rgba(184,149,42,0.12)",
                border: "1px solid rgba(184,149,42,0.3)",
                background: "#091523",
                transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
                minHeight: "480px",
                height: "540px",
              }}
            >
              <Image
                src="/images/horizonte.png"
                alt="Arquitectura empresarial Estructa"
                fill
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "center 35%",
                  filter: "brightness(0.92) contrast(1.05)",
                }}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              {/* Luminous Gradient Overlays */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(9,21,35,0.15) 0%, rgba(9,21,35,0.4) 60%, rgba(9,21,35,0.88) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Top Floating Telemetry Capsule */}
              <div
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    background: "rgba(9, 21, 35, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(184,149,42,0.35)",
                    borderRadius: "9999px",
                    padding: "0.4rem 0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 8px #22c55e",
                      display: "inline-block",
                    }}
                  />
                  <span style={{ fontSize: "0.72rem", color: "var(--ivory)", fontWeight: 600, letterSpacing: "0.08em" }}>
                    DIAGNÓSTICO 360° ACTIVO
                  </span>
                </div>

                <div
                  style={{
                    background: "rgba(9, 21, 35, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(184,149,42,0.25)",
                    borderRadius: "9999px",
                    padding: "0.4rem 0.8rem",
                    color: "var(--gold-mid)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                  }}
                >
                  4 PILARES INTEGRADOS
                </div>
              </div>

              {/* Bottom Glass Insight Deck */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                  background: "rgba(9, 21, 35, 0.88)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(184,149,42,0.3)",
                  borderRadius: "16px",
                  padding: "1.2rem 1.4rem",
                  zIndex: 3,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--gold-mid)",
                    }}
                  >
                    ARQUITECTURA CORPORATIVA
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "rgba(248,245,239,0.6)" }}>
                    Resolución en tiempo real
                  </span>
                </div>

                <div style={{ color: "var(--ivory)", fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.5 }}>
                  Unificamos la verdad jurídica, contable y operativa para una toma de decisiones sin incertidumbre.
                </div>

                {/* Micro indicators bar */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "0.5rem",
                    marginTop: "0.9rem",
                    paddingTop: "0.75rem",
                    borderTop: "1px solid rgba(184,149,42,0.15)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(248,245,239,0.5)" }}>Visibilidad</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold-pale)" }}>100%</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(248,245,239,0.5)" }}>Blindaje</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold-pale)" }}>Integral</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(248,245,239,0.5)" }}>Decisiones</div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold-pale)" }}>Con Datos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC HORIZONTAL CONTINUOUS MARQUEE / TICKER */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          borderTop: "1px solid rgba(184,149,42,0.18)",
          borderBottom: "1px solid rgba(184,149,42,0.1)",
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(10px)",
          padding: "0.75rem 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "marquee 28s linear infinite",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          {[
            "LEGAL CONTRACTUAL",
            "✦",
            "CONTROL FINANCIERO PYME",
            "✦",
            "DIAGNÓSTICO 360°",
            "✦",
            "ARQUITECTURA DE DATOS",
            "✦",
            "CARTERA INTELIGENTE",
            "✦",
            "GOBERNANZA & ESTRATEGIA",
            "✦",
            "DIGITALIZACIÓN ADMINISTRATIVA",
            "✦",
            "BLINDAJE SOCIETARIO",
            "✦",
            "LEGAL CONTRACTUAL",
            "✦",
            "CONTROL FINANCIERO PYME",
            "✦",
            "DIAGNÓSTICO 360°",
            "✦",
            "ARQUITECTURA DE DATOS",
            "✦",
            "CARTERA INTELIGENTE",
            "✦",
            "GOBERNANZA & ESTRATEGIA",
            "✦",
            "DIGITALIZACIÓN ADMINISTRATIVA",
            "✦",
            "BLINDAJE SOCIETARIO",
          ].map((item, index) => (
            <span
              key={index}
              style={{
                fontSize: "0.74rem",
                fontWeight: item === "✦" ? 400 : 700,
                letterSpacing: "0.14em",
                color: item === "✦" ? "var(--gold-mid)" : "var(--navy-deepest)",
                opacity: item === "✦" ? 1 : 0.85,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Responsive adjustments & Keyframe Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes pulse-gold {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-media-wrapper {
            max-width: 580px;
            margin: 0 auto;
          }
        }

        @media (max-width: 640px) {
          #inicio {
            padding-top: 80px !important;
          }
          .hero-media-wrapper > div:last-child {
            height: 380px !important;
            min-height: 380px !important;
          }
        }
      `}</style>
    </section>
  );
}
