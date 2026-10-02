"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface AuditTrack {
  id: string;
  name: string;
  score: number;
  status: "crit" | "warn" | "ok";
  statusLabel: string;
  finding: string;
  solution: string;
}

const auditTracks: AuditTrack[] = [
  {
    id: "legal",
    name: "Legal & Contratos",
    score: 48,
    status: "crit",
    statusLabel: "Riesgo Crítico",
    finding: "Contratos ambiguos, acuerdos verbales con socios y contingencias laborales.",
    solution: "Auditoría legal express y blindaje contractual societario.",
  },
  {
    id: "financiero",
    name: "Finanzas & Caja",
    score: 42,
    status: "crit",
    statusLabel: "Prioritario",
    finding: "Se vende pero no se conoce el margen real; la caja se administra al día.",
    solution: "Modelo de flujo de caja semanal y control presupuestal estricto.",
  },
  {
    id: "costos",
    name: "Costos & Márgenes",
    score: 55,
    status: "warn",
    statusLabel: "Atención",
    finding: "Líneas de negocio deficitarias subsidiadas por las pocas rentables.",
    solution: "Estructura de costos unitarios y política de márgenes claros.",
  },
  {
    id: "procesos",
    name: "Operación & Procesos",
    score: 51,
    status: "warn",
    statusLabel: "Atención",
    finding: "Fuerte dependencia del dueño; los procesos rutinarios no están estandarizados.",
    solution: "Manuales operativos clave y delegación estructurada.",
  },
  {
    id: "datos",
    name: "Datos & Reportes",
    score: 36,
    status: "crit",
    statusLabel: "Prioritario",
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
        padding: "clamp(4.5rem, 6.5vw, 6rem) 0",
        color: "var(--ivory)",
      }}
    >
      {/* Background Image Texture (panel.png) with Sleek Luxury Overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/panel.png"
          alt="Panel de análisis diagnóstico"
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(9,21,35,0.96) 0%, rgba(9,21,35,0.88) 50%, rgba(13,30,46,0.95) 100%)",
          }}
        />
      </div>

      {/* Top Edge Transition Line */}
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

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Symmetrical Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem" }}>
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
            Diagnóstico inicial: <span style={{ color: "var(--gold-mid)" }}>la situación real de tu empresa</span>
          </h2>

          <p
            style={{
              color: "rgba(240,237,232,0.8)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.15s",
            }}
          >
            Selecciona cada área para conocer los problemas más comunes que resolvemos y las soluciones que implementamos.
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
          {/* Left Column: Compact Track Bars */}
          <div
            style={{
              background: "rgba(13, 30, 46, 0.7)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(184,149,42,0.22)",
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
              const isCrit = track.status === "crit";

              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(idx)}
                  type="button"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "12px",
                    background: isSelected ? "rgba(184,149,42,0.18)" : "rgba(255,255,255,0.04)",
                    border: isSelected ? "1.5px solid var(--gold-mid)" : "1px solid rgba(255,255,255,0.06)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                    transform: isSelected ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#FFFFFF" }}>
                      {track.name}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                      <span
                        style={{
                          fontSize: "0.64rem",
                          fontWeight: 700,
                          padding: "0.15rem 0.5rem",
                          borderRadius: "9999px",
                          background: isCrit ? "rgba(239,68,68,0.2)" : "rgba(234,179,8,0.2)",
                          color: isCrit ? "#fca5a5" : "#fde047",
                        }}
                      >
                        {track.statusLabel}
                      </span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--gold-mid)", minWidth: "32px", textAlign: "right" }}>
                        {score}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${score}%`,
                        background: isCrit
                          ? "linear-gradient(90deg, #ef4444, #f97316)"
                          : "linear-gradient(90deg, #eab308, #C9A84C)",
                        borderRadius: "2px",
                        transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Compact Prescription Box */}
          <div
            style={{
              background: "rgba(9, 21, 35, 0.85)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(184,149,42,0.3)",
              borderRadius: "18px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-mid)" }}>
                  HALLAZGO & SOLUCIÓN DIRECTA
                </span>
                <span style={{ fontSize: "0.72rem", color: "rgba(240,237,232,0.6)" }}>
                  Dimensión {selectedTrack + 1} de 5
                </span>
              </div>

              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "1rem" }}>
                {current.name}
              </h3>

              {/* Finding */}
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#f87171", marginBottom: "0.25rem" }}>
                  Situación habitual:
                </div>
                <p style={{ color: "rgba(240,237,232,0.85)", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
                  {current.finding}
                </p>
              </div>

              {/* Solution */}
              <div
                style={{
                  background: "rgba(184,149,42,0.12)",
                  border: "1px solid rgba(184,149,42,0.25)",
                  borderRadius: "12px",
                  padding: "0.9rem 1rem",
                }}
              >
                <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gold-mid)", marginBottom: "0.25rem" }}>
                  Solución o servicio que aplicamos:
                </div>
                <p style={{ color: "var(--ivory)", fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.5, margin: 0 }}>
                  {current.solution}
                </p>
              </div>
            </div>

            <div style={{ marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(184,149,42,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", color: "rgba(240,237,232,0.6)" }}>
                Atención directa y confidencial
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--gold-mid)", fontWeight: 600 }}>
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
