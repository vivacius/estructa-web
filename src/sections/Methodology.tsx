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
    name: "Diagnóstico Inicial",
    badge: "Evaluación",
    headline: "Radiografía de la situación real",
    desc: "Evaluamos en conjunto el estado legal, contable, financiero y operativo de tu empresa. Identificamos con claridad fugas de liquidez, cartera estancada y contingencias contractuales o laborales.",
    deliverables: [
      "Informe diagnóstico con estado actual del negocio",
      "Matriz de prioridades (urgencia vs impacto operativo)",
      "Plan de choque y ruta de trabajo recomendada",
    ],
    duration: "Semanas 1 y 2",
  },
  {
    num: "02",
    name: "Plan de Choque",
    badge: "Estructuración",
    headline: "Orden de caja y contratos clave",
    desc: "Atacamos los puntos críticos: organizamos la cobranza de cartera, proyectamos el flujo de caja semanal y redactamos o ajustamos los contratos comerciales, laborales y societarios para proteger tu patrimonio.",
    deliverables: [
      "Modelo de flujo de caja proyectado a 13 semanas",
      "Contratos y acuerdos comerciales blindados",
      "Estructura de costos y política de márgenes claros",
    ],
    duration: "Semanas 3 a 6",
  },
  {
    num: "03",
    name: "Procesos & Control",
    badge: "Estandarización",
    headline: "Operación ordenada y números al día",
    desc: "Estandarizamos los procesos operativos para que el negocio no dependa únicamente del dueño o de la memoria de nadie. Dejamos funcionando un tablero con indicadores directivos claros.",
    deliverables: [
      "Tablero gerencial con indicadores clave del negocio",
      "Procesos operativos clave documentados y delegados",
      "Rutinas de control y reportes directivos periódicos",
    ],
    duration: "Semanas 7 a 10",
  },
  {
    num: "04",
    name: "Acompañamiento",
    badge: "Continuidad",
    headline: "Comité directivo y soporte continuo",
    desc: "No entregamos un informe para guardarlo en un cajón. Actuamos como tu comité directivo externo: nos reunimos mes a mes para revisar cifras, evaluar decisiones y dar soporte legal y financiero permanente.",
    deliverables: [
      "Reunión mensual de seguimiento directivo y resultados",
      "Asesoría legal y financiera continua ante nuevas situaciones",
      "Revisión periódica de márgenes y cumplimiento",
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
        padding: "clamp(4.5rem, 6.5vw, 6rem) 0",
        background: "linear-gradient(135deg, rgba(9,21,35,0.97) 0%, rgba(9,21,35,0.91) 50%, rgba(13,30,46,0.96) 100%)",
        color: "var(--ivory)",
      }}
    >
      {/* Clean 1px top hairline rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background: "rgba(184,149,42,0.22)",
          zIndex: 2,
        }}
      />

      {/* Atmospheric Background Image Texture (camino.png) */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none", zIndex: 0 }}>
        <Image src="/images/camino.png" alt="Ruta metodológica" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Symmetrical Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 2.75rem" }}>
          <h2
            className="text-display-md"
            style={{
              color: "#FFFFFF",
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
              color: "rgba(240, 237, 232, 0.8)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            Un camino ordenado para proteger la caja, blindar los contratos y estructurar la empresa con resultados verificables.
          </p>
        </div>

        {/* Symmetrical 4-Step Interactive Navigation Rail */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
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
                  padding: "1rem 1.15rem",
                  borderRadius: "14px",
                  background: isActive ? "rgba(184,149,42,0.18)" : "rgba(13,30,46,0.65)",
                  backdropFilter: "blur(12px)",
                  border: isActive ? "1.5px solid var(--gold-mid)" : "1px solid rgba(184,149,42,0.15)",
                  boxShadow: isActive ? "0 8px 24px rgba(184,149,42,0.2)" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.25s ease",
                  transform: isActive ? "translateY(-3px)" : "translateY(0)",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: isActive ? "var(--gold-mid)" : "rgba(240, 237, 232, 0.5)",
                    }}
                  >
                    FASE {phase.num}
                  </span>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      background: isActive ? "rgba(184,149,42,0.25)" : "rgba(255,255,255,0.05)",
                      color: isActive ? "#FFFFFF" : "rgba(240, 237, 232, 0.6)",
                      border: "1px solid rgba(184,149,42,0.15)",
                    }}
                  >
                    {phase.badge}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: isActive ? "#FFFFFF" : "rgba(240, 237, 232, 0.75)",
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

        {/* Symmetrical 2-Column Detail Stage Card */}
        <div
          style={{
            background: "rgba(13, 30, 46, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(184,149,42,0.25)",
            borderLeft: "4px solid var(--gold-mid)",
            boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
            borderRadius: "20px",
            padding: "2.5rem 2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            minHeight: "260px",
          }}
          className="phase-detail-grid"
        >
          {/* Left: Phase Narrative */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "var(--gold-mid)",
                  background: "rgba(184,149,42,0.15)",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "6px",
                  letterSpacing: "0.08em",
                }}
              >
                FASE {current.num}
              </span>
              <span style={{ fontSize: "0.82rem", color: "rgba(240,237,232,0.65)", fontWeight: 500 }}>
                Duración estimada: {current.duration}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.55rem",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "0.85rem",
                lineHeight: 1.2,
              }}
            >
              {current.headline}
            </h3>

            <p
              style={{
                color: "rgba(240, 237, 232, 0.82)",
                fontSize: "0.94rem",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {current.desc}
            </p>
          </div>

          {/* Right: Deliverables List */}
          <div
            style={{
              background: "rgba(9, 21, 35, 0.7)",
              border: "1px solid rgba(184,149,42,0.18)",
              borderRadius: "14px",
              padding: "1.6rem 1.75rem",
            }}
          >
            <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-mid)", marginBottom: "1rem" }}>
              Entregables concretos de la fase
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {current.deliverables.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    fontSize: "0.88rem",
                    color: "rgba(240, 237, 232, 0.9)",
                    lineHeight: 1.45,
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

      <style>{`
        @media (max-width: 900px) {
          .milestones-nav {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .phase-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
