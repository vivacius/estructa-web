"use client";
import { useEffect, useRef, useState } from "react";
import DiagnosisCanvas from "@/components/canvas/DiagnosisCanvas";

interface AuditTrack {
  id: string;
  name: string;
  score: number;
  finding: string;
  solution: string;
}

const auditTracks: AuditTrack[] = [
  {
    id: "legal",
    name: "Legal & Contratos",
    score: 48,
    finding: "Contratos ambiguos, acuerdos verbales con socios y contingencias laborales.",
    solution: "Auditoría legal express y blindaje contractual societario.",
  },
  {
    id: "financiero",
    name: "Finanzas & Caja",
    score: 42,
    finding: "Se vende pero no se conoce el margen real; la caja se administra al día.",
    solution: "Modelo de flujo de caja semanal y control presupuestal estricto.",
  },
  {
    id: "costos",
    name: "Costos & Márgenes",
    score: 55,
    finding: "Líneas de negocio deficitarias subsidiadas por las pocas rentables.",
    solution: "Estructura de costos unitarios y política de márgenes claros.",
  },
  {
    id: "procesos",
    name: "Operación & Procesos",
    score: 51,
    finding: "Fuerte dependencia del dueño; los procesos rutinarios no están estandarizados.",
    solution: "Manuales operativos clave y delegación estructurada.",
  },
  {
    id: "datos",
    name: "Datos & Reportes",
    score: 36,
    finding: "Múltiples Excels aislados; decisiones tomadas a ciegas con retraso de semanas.",
    solution: "Automatización de reportes e integración de dashboard directivo.",
  },
];

export default function Diagnosis() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [animatedScores, setAnimatedScores] = useState<number[]>(auditTracks.map(() => 0));
  const [isHovered, setIsHovered] = useState(false);
  const [animatingContent, setAnimatingContent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    auditTracks.forEach((track, i) => {
      setTimeout(() => {
        setAnimatedScores((prev) => {
          const next = [...prev];
          next[i] = track.score;
          return next;
        });
      }, 100 + i * 80);
    });
  }, [visible]);

  // Autonomous dynamic cycling: advances every 4.2s if user is not hovering
  useEffect(() => {
    if (!visible || isHovered) return;
    const timer = setInterval(() => {
      setAnimatingContent(true);
      setTimeout(() => {
        setSelectedTrack((prev) => (prev + 1) % auditTracks.length);
        setAnimatingContent(false);
      }, 200);
    }, 4200);

    return () => clearInterval(timer);
  }, [visible, isHovered]);

  const selectTrackDirectly = (idx: number) => {
    if (idx === selectedTrack) return;
    setAnimatingContent(true);
    setTimeout(() => {
      setSelectedTrack(idx);
      setAnimatingContent(false);
    }, 180);
  };

  const current = auditTracks[selectedTrack];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="diagnostico"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(4.5rem, 6.5vw, 6.5rem) 0",
        background: "radial-gradient(ellipse at 50% 20%, #FFFFFF 0%, #FAF7F2 50%, #F3ECE1 100%)",
        color: "var(--navy-deepest)",
      }}
    >
      {/* Light Luxury Scanning & Telemetry Canvas (Hero aesthetic) */}
      <DiagnosisCanvas />

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
          width: "750px",
          height: "420px",
          background: "radial-gradient(ellipse, rgba(184, 149, 42, 0.09) 0%, rgba(255, 255, 255, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Symmetrical Header */}
        <div style={{ textAlign: "center", maxWidth: "740px", margin: "0 auto 3rem" }}>
          {/* Subtle live radar scanning pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              background: "rgba(184, 149, 42, 0.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(184, 149, 42, 0.28)",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              marginBottom: "1rem",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--gold-mid)",
                boxShadow: "0 0 10px var(--gold-mid)",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-deep)",
              }}
            >
              Auditoría Preventiva Directa
            </span>
          </div>

          <h2
            className="text-display-md"
            style={{
              color: "#091523",
              marginBottom: "0.6rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            Diagnóstico inicial: <span style={{ color: "var(--gold-deep)" }}>la situación real de tu empresa</span>
          </h2>

          <p
            style={{
              color: "rgba(9, 21, 35, 0.72)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.15s",
            }}
          >
            Selecciona cada área para conocer las alertas habituales y la solución directiva que implementamos.
          </p>
        </div>

        {/* Symmetrical Diagnostic Cockpit with Translucent Glass Panels showing Canvas behind */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            alignItems: "stretch",
          }}
          className="diagnosis-grid"
        >
          {/* Left Column: Translucent Track Bars with Living Indicators */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.42)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1.5px solid rgba(184, 149, 42, 0.22)",
              boxShadow: "0 16px 44px rgba(13, 30, 46, 0.05)",
              borderRadius: "20px",
              padding: "1.4rem 1.6rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.75rem",
              transition: "background 0.3s ease, border-color 0.3s ease",
            }}
          >
            {auditTracks.map((track, idx) => {
              const isSelected = selectedTrack === idx;
              const score = animatedScores[idx];

              return (
                <button
                  key={track.id}
                  onClick={() => selectTrackDirectly(idx)}
                  type="button"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.85rem 1.15rem",
                    borderRadius: "14px",
                    background: isSelected
                      ? "rgba(184, 149, 42, 0.16)"
                      : "rgba(255, 255, 255, 0.36)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: isSelected
                      ? "1.5px solid var(--gold-mid)"
                      : "1px solid rgba(184, 149, 42, 0.14)",
                    boxShadow: isSelected
                      ? "0 8px 24px rgba(184, 149, 42, 0.18)"
                      : "0 2px 8px rgba(9, 21, 35, 0.02)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
                    transform: isSelected ? "translateX(6px)" : "translateX(0)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.45rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                      {isSelected && (
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--gold-mid)",
                            boxShadow: "0 0 8px var(--gold-mid)",
                          }}
                        />
                      )}
                      <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#091523" }}>
                        {track.name}
                      </span>
                    </div>

                    <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--gold-deep)", minWidth: "32px", textAlign: "right" }}>
                      {score}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: "4px", background: "rgba(9, 21, 35, 0.08)", borderRadius: "2px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${score}%`,
                        background: isSelected
                          ? "linear-gradient(90deg, #D4AF37, #B8952A)"
                          : "linear-gradient(90deg, #B8952A, #8F721E)",
                        borderRadius: "2px",
                        transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Translucent Prescription Box with Dynamic Disappearing/Appearing Content */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.46)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1.5px solid rgba(184, 149, 42, 0.28)",
              boxShadow: "0 20px 48px rgba(13, 30, 46, 0.07)",
              borderRadius: "20px",
              padding: "1.85rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "border-color 0.3s ease",
            }}
          >
            <div
              style={{
                opacity: animatingContent ? 0 : 1,
                transform: animatingContent ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
                  HALLAZGO & SOLUCIÓN
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(9, 21, 35, 0.5)" }}>
                  Dimensión {selectedTrack + 1} de 5
                </span>
              </div>

              <h3 style={{ fontSize: "1.38rem", fontWeight: 700, color: "#091523", marginBottom: "1.1rem" }}>
                {current.name}
              </h3>

              {/* Finding */}
              <div style={{ marginBottom: "1.2rem" }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#991b1b", marginBottom: "0.3rem" }}>
                  Situación habitual:
                </div>
                <p style={{ color: "rgba(9, 21, 35, 0.78)", fontSize: "0.92rem", lineHeight: 1.55, margin: 0 }}>
                  {current.finding}
                </p>
              </div>

              {/* Solution Box */}
              <div
                style={{
                  background: "rgba(184, 149, 42, 0.1)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(184, 149, 42, 0.25)",
                  borderRadius: "14px",
                  padding: "1.1rem 1.2rem",
                  boxShadow: "0 6px 18px rgba(184, 149, 42, 0.08)",
                }}
              >
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-deep)", marginBottom: "0.3rem" }}>
                  Solución directiva que aplicamos:
                </div>
                <p style={{ color: "#091523", fontSize: "0.93rem", fontWeight: 600, lineHeight: 1.55, margin: 0 }}>
                  {current.solution}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1.25rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(184, 149, 42, 0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "rgba(9, 21, 35, 0.55)" }}>
                Confidencialidad empresarial garantizada
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--gold-deep)", fontWeight: 700 }}>
                ESTRUCTA · Soluciones Integradas
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }
        @media (max-width: 820px) {
          .diagnosis-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
