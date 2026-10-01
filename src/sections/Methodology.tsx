"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const steps = [
  { num: "01", title: "Diagnóstico", desc: "Evaluación 360° del estado actual de la empresa." },
  { num: "02", title: "Hallazgos", desc: "Identificamos con precisión qué está frenando el negocio." },
  { num: "03", title: "Prioridades", desc: "Ordenamos por impacto real, no por urgencia aparente." },
  { num: "04", title: "Plan", desc: "Diseñamos el camino concreto con responsables y fechas." },
  { num: "05", title: "Implementación", desc: "Ejecutamos junto al equipo de la empresa." },
  { num: "06", title: "Medición", desc: "Medimos resultados con indicadores definidos." },
  { num: "07", title: "Acompañamiento", desc: "Permanecemos como equipo externo de gestión." },
];

const example = {
  problem: "No sabemos cuánto ganamos por producto.",
  finding: "La empresa no tiene estructura de margen por línea.",
  solution: "Control Financiero Pyme",
  result: "Saber qué vender, qué corregir y dónde se genera realmente la utilidad.",
};

export default function Methodology() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    steps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), 300 + i * 220);
    });
  }, [visible]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "var(--ivory)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
        <Image src="/images/camino.png" alt="" fill style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--ivory) 0%, rgba(248,245,239,0.5) 50%, var(--ivory) 100%)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span className="text-label" style={{ color: "var(--gold-mid)", display: "block", marginBottom: "1rem" }}>Metodología</span>
          <h2
            className="text-display-lg"
            style={{
              color: "var(--navy-deepest)",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease",
            }}
          >
            De diagnóstico <span style={{ color: "var(--gold-mid)" }}>a acción.</span>
          </h2>
        </div>

        {/* Steps timeline */}
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto 5rem" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "30px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "rgba(13,30,46,0.1)",
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to bottom, var(--gold-mid), transparent)",
              height: `${((activeStep + 1) / steps.length) * 100}%`,
              transition: "height 0.3s ease",
            }} />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "2rem",
                paddingLeft: "80px",
                marginBottom: "2rem",
                position: "relative",
                opacity: i <= activeStep ? 1 : 0.2,
                transform: i <= activeStep ? "translateX(0)" : "translateX(-16px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {/* Step dot */}
              <div style={{
                position: "absolute",
                left: "18px",
                top: "4px",
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: i <= activeStep ? "var(--gold-mid)" : "rgba(184,149,42,0.15)",
                border: "2px solid",
                borderColor: i <= activeStep ? "var(--gold-light)" : "rgba(184,149,42,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                boxShadow: i <= activeStep ? "0 0 12px rgba(184,149,42,0.4)" : "none",
              }}>
                {i <= activeStep && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--navy-deepest)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--gold-mid)", letterSpacing: "0.1em" }}>{step.num}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: i <= activeStep ? "var(--navy-deepest)" : "var(--text-muted-light)", fontWeight: 600 }}>
                    {step.title}
                  </h3>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted-light)", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Example case */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid rgba(184,149,42,0.15)",
            boxShadow: "0 4px 24px rgba(13,30,46,0.07)",
            borderRadius: "20px",
            padding: "2.5rem",
            maxWidth: "900px",
            margin: "0 auto",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 1.5s",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <span className="badge badge-gold">Caso de ejemplo</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
            {[
              { label: "Problema", text: example.problem, color: "#f87171" },
              { label: "Hallazgo", text: example.finding, color: "#facc15" },
              { label: "Solución ESTRUCTA", text: example.solution, color: "#C9A84C" },
              { label: "Resultado esperado", text: example.result, color: "#4ade80" },
            ].map(({ label, text, color }) => (
              <div key={label} style={{ padding: "1.25rem", background: "var(--ivory-mid)", borderRadius: "12px", borderLeft: `3px solid ${color}` }}>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: color, fontWeight: 600, marginBottom: "0.5rem" }}>{label}</div>
                <p style={{ color: "var(--navy-mid)", fontSize: "0.875rem", lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
