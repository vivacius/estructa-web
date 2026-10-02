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
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(184, 149, 42, 0.08) 0%, rgba(255, 255, 255, 0) 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Symmetrical Header */}
        <div style={{ textAlign: "center", maxWidth: "740px", margin: "0 auto 3rem" }}>
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

        {/* Symmetrical Diagnostic Cockpit: Left Track List + Right Prescription Box */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            alignItems: "stretch",
          }}
          className="diagnosis-grid"
        >
          {/* Left Column: Compact Track Bars without status pills */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(184, 149, 42, 0.22)",
              boxShadow: "0 12px 32px rgba(13, 30, 46, 0.06)",
              borderRadius: "18px",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "0.65rem",
            }}
          >
            {auditTracks.map((track, idx) => {
              const isSelected = selectedTrack === idx;
              const score = animatedScores[idx];

              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(idx)}
                  type="button"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.85rem 1.1rem",
                    borderRadius: "12px",
                    background: isSelected ? "rgba(184, 149, 42, 0.12)" : "rgba(247, 244, 238, 0.65)",
                    border: isSelected ? "1.5px solid var(--gold-mid)" : "1px solid rgba(184, 149, 42, 0.12)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    transform: isSelected ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#091523" }}>
                      {track.name}
                    </span>

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
                        background: "linear-gradient(90deg, #B8952A, #8F721E)",
                        borderRadius: "2px",
                        transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Prescription Box */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(184, 149, 42, 0.28)",
              boxShadow: "0 16px 40px rgba(13, 30, 46, 0.08)",
              borderRadius: "18px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-deep)" }}>
                  HALLAZGO & SOLUCIÓN
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(9, 21, 35, 0.5)" }}>
                  Dimensión {selectedTrack + 1} de 5
                </span>
              </div>

              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#091523", marginBottom: "1.1rem" }}>
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

              {/* Solution */}
              <div
                style={{
                  background: "rgba(184, 149, 42, 0.08)",
                  border: "1px solid rgba(184, 149, 42, 0.22)",
                  borderRadius: "12px",
                  padding: "1rem 1.1rem",
                }}
              >
                <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-deep)", marginBottom: "0.3rem" }}>
                  Solución directiva que aplicamos:
                </div>
                <p style={{ color: "#091523", fontSize: "0.92rem", fontWeight: 600, lineHeight: 1.55, margin: 0 }}>
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
        @media (max-width: 820px) {
          .diagnosis-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
