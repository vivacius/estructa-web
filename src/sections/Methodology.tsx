"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Phase {
  num: string;
  name: string;
  badge: string;
  headline: string;
  desc: string;
  deliverables: string[];
  duration: string;
}

const phases: Phase[] = [
  {
    num: "01",
    name: "Auditoría 360°",
    badge: "Diagnóstico",
    headline: "Radiografía integral de la empresa",
    desc: "Evaluamos simultáneamente la verdad legal, contable, financiera y de procesos. Identificamos con precisión matemática dónde se está perdiendo dinero y dónde hay contingencias jurídicas ocultas.",
    deliverables: [
      "Informe diagnóstico 360° con índice de salud empresarial",
      "Matriz de prioridades (urgente vs impacto real)",
      "Plan de choque preliminar para la gerencia",
    ],
    duration: "Semanas 1 y 2",
  },
  {
    num: "02",
    name: "Plan de Choque",
    badge: "Estructuración",
    headline: "Blindaje de caja y contratos",
    desc: "Intervenimos los puntos críticos: saneamos la cartera, ordenamos el flujo de caja semanal y reestructuramos los contratos comerciales y laborales para eliminar la vulnerabilidad patrimonial.",
    deliverables: [
      "Modelo de flujo de caja proyectado a 13 semanas",
      "Minutas y acuerdos contractuales blindados",
      "Política de margen de contribución por línea",
    ],
    duration: "Semanas 3 a 6",
  },
  {
    num: "03",
    name: "Datos & Procesos",
    badge: "Automatización",
    headline: "Control gerencial en tiempo real",
    desc: "Estandarizamos los procesos para que la empresa no dependa de la memoria de nadie. Conectamos los datos operativos a un tablero ejecutivo para que tomes decisiones con números vivos, no con intuiciones.",
    deliverables: [
      "Dashboard directivo en tiempo real accesible desde móvil",
      "Manuales de procesos clave despersonalizados",
      "Automatización de cobranza y reportes rutinarios",
    ],
    duration: "Semanas 7 a 10",
  },
  {
    num: "04",
    name: "Acompañamiento",
    badge: "Dirección Continua",
    headline: "Tu equipo directivo permanente",
    desc: "No te dejamos un documento y nos vamos. Permanecemos como tu comité directivo externo de cabecera: sesionamos contigo cada mes, vigilamos tus números y blindamos cada nuevo paso del negocio.",
    deliverables: [
      "Comité directivo mensual de resultados y estrategia",
      "Soporte legal y financiero prioritario continuo",
      "Auditoría recurrente de cumplimiento y márgenes",
    ],
    duration: "Acompañamiento Continuo",
  },
];

export default function Methodology() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activePhase, setActivePhase] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const current = phases[activePhase];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(3rem, 5vw, 4.5rem) 0",
        background: "radial-gradient(ellipse at 50% 15%, #FAF7F2 0%, #F5EFE6 55%, #EFE8DC 100%)",
      }}
    >
      {/* Top Edge Transition Ramp from section above */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(to bottom, rgba(9,21,35,0.85) 0%, rgba(9,21,35,0.2) 50%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(184,149,42,0.35), transparent)",
          zIndex: 2,
        }}
      />

      {/* Atmospheric Background Image Texture (camino.png) */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none", zIndex: 0 }}>
        <Image src="/images/camino.png" alt="Ruta metodológica" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Clean Header (no generic pill) */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 2.25rem" }}>
          <h2
            className="text-display-md"
            style={{
              color: "var(--navy-deepest)",
              marginBottom: "0.6rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            De diagnóstico a acción: <span style={{ color: "var(--gold-mid)" }}>un método en 4 fases</span>
          </h2>

          <p
            style={{
              color: "var(--navy-mid)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            No entregamos carpetas con teorías. Ejecutamos un camino estructurado para ordenar, proteger y potenciar tu empresa con resultados verificables.
          </p>
        </div>

        {/* 4-Step Interactive Milestone Navigation Rail */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.75rem",
            marginBottom: "1.75rem",
          }}
          className="milestones-nav"
        >
          {phases.map((phase, idx) => {
            const isActive = activePhase === idx;
            return (
              <button
                key={phase.num}
                type="button"
                onClick={() => setActivePhase(idx)}
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "14px",
                  background: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)",
                  border: isActive ? "1.5px solid var(--gold-mid)" : "1px solid rgba(13,30,46,0.08)",
                  boxShadow: isActive ? "0 8px 24px rgba(184,149,42,0.18)" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.25s ease",
                  transform: isActive ? "translateY(-3px)" : "translateY(0)",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: isActive ? "var(--gold-mid)" : "var(--text-muted-light)",
                    }}
                  >
                    FASE {phase.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.45rem",
                      borderRadius: "9999px",
                      background: isActive ? "rgba(184,149,42,0.15)" : "rgba(13,30,46,0.05)",
                      color: isActive ? "var(--gold-mid)" : "var(--navy-mid)",
                    }}
                  >
                    {phase.badge}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: isActive ? "var(--navy-deepest)" : "var(--navy-mid)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {phase.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Phase Stage Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(184,149,42,0.25)",
            boxShadow: "0 16px 40px rgba(13,30,46,0.08)",
            borderRadius: "20px",
            padding: "2rem 2.25rem",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
          className="phase-detail-grid"
        >
          {/* Left: Phase Narrative */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--gold-mid)",
                  background: "rgba(184,149,42,0.12)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "6px",
                }}
              >
                FASE {current.num}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted-light)", fontWeight: 600 }}>
                Duración: {current.duration}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--navy-deepest)",
                marginBottom: "0.75rem",
              }}
            >
              {current.headline}
            </h3>

            <p style={{ color: "var(--navy-mid)", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
              {current.desc}
            </p>

            <a
              href="#contacto"
              className="btn btn-primary"
              style={{
                padding: "0.65rem 1.4rem",
                fontSize: "0.82rem",
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Iniciar con la Fase {current.num}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </a>
          </div>

          {/* Right: Concrete Deliverables Box */}
          <div
            style={{
              background: "radial-gradient(ellipse at top left, #FAF7F2 0%, #F3ECE1 100%)",
              border: "1px solid rgba(184,149,42,0.2)",
              borderRadius: "16px",
              padding: "1.5rem 1.75rem",
            }}
          >
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-mid)",
                marginBottom: "0.85rem",
              }}
            >
              ENTREGABLES & RESULTADOS TANGIBLES
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {current.deliverables.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    fontSize: "0.88rem",
                    color: "var(--navy-deepest)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "var(--gold-mid)", fontWeight: 700, lineHeight: 1.3 }}>✦</span>
                  <span style={{ fontWeight: 500 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Edge Transition Ramp into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40px",
          background: "linear-gradient(to bottom, transparent, rgba(248, 245, 239, 0.8))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(184,149,42,0.3), transparent)",
          zIndex: 2,
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          .milestones-nav {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .phase-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
