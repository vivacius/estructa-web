"use client";
import { useEffect, useRef, useState } from "react";

const solutions = [
  {
    title: "Control Financiero Pyme",
    desc: "Cálculo de costos reales, margen por producto, flujo de caja semanal y punto de equilibrio para saber con exactitud cuánto ganas.",
    num: "01",
    tag: "Finanzas & Caja",
    highlight: "Rentabilidad Real",
  },
  {
    title: "Gestión y Cobro de Cartera",
    desc: "Recuperación de cuentas por cobrar vencidas, políticas de crédito claras y rutinas de seguimiento sin deteriorar relaciones comerciales.",
    num: "02",
    tag: "Cobranza & Liquidez",
    highlight: "Recuperación de Flujo",
  },
  {
    title: "Tableros de Control Gerencial",
    desc: "Visibilidad en tiempo real de ventas, márgenes, inventario y cuentas clave para tomar decisiones gerenciales con datos seguros.",
    num: "03",
    tag: "Control Directivo",
    highlight: "Certeza en Números",
  },
  {
    title: "Blindaje Legal & Contratos",
    desc: "Contratos comerciales, acuerdos entre socios y prevención de contingencias laborales para proteger el patrimonio de la empresa.",
    num: "04",
    tag: "Legal & Cumplimiento",
    highlight: "Protección Patrimonial",
  },
  {
    title: "Optimización y Automatización",
    desc: "Estandarización de flujos de trabajo operativos y eliminación de trámites manuales repetitivos para ahorrar tiempo y evitar reprocesos.",
    num: "05",
    tag: "Eficiencia Operativa",
    highlight: "Menor Carga Operativa",
  },
  {
    title: "Comité Directivo Acompañado",
    desc: "Acompañamiento periódico como aliados de cabecera: sesionamos mes a mes, vigilamos cifras y guiamos decisiones clave del negocio.",
    num: "06",
    tag: "Dirección Estratégica",
    highlight: "Acompañamiento Continuo",
  },
];

export default function Solutions() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="soluciones"
      style={{
        background: "linear-gradient(135deg, rgba(9,21,35,0.96) 0%, rgba(9,21,35,0.88) 50%, rgba(13,30,46,0.95) 100%)",
        padding: "clamp(4.5rem, 6.5vw, 6rem) 0",
        position: "relative",
        overflow: "hidden",
        color: "var(--ivory)",
      }}
    >
      {/* Clean 1px top border */}
      <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "1px", background: "rgba(184,149,42,0.22)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Symmetrical High-Contrast Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <h2
                className="text-display-lg"
                style={{
                  color: "#FFFFFF",
                  maxWidth: "540px",
                  lineHeight: 1.1,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                Soluciones diseñadas
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #FFFFFF 0%, #B8952A 70%, #F5D77F 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  para el negocio real.
                </span>
              </h2>
            </div>

            <p
              style={{
                color: "rgba(240, 237, 232, 0.8)",
                maxWidth: "440px",
                fontSize: "0.95rem",
                lineHeight: 1.65,
                fontWeight: 450,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.15s",
              }}
            >
              Servicios y soluciones a la medida de tu operación. Diagnosticamos primero la causa del problema y estructuramos un plan de acción concreto.
            </p>
          </div>
        </div>

        {/* Perfectly Symmetrical 3x2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          className="solutions-symmetric-grid"
        >
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              style={{
                background: "rgba(13, 30, 46, 0.72)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(184, 149, 42, 0.18)",
                borderLeft: "3.5px solid rgba(184, 149, 42, 0.65)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.25)",
                borderRadius: "16px",
                padding: "1.75rem 1.6rem",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "220px",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(184, 149, 42, 0.45)";
                el.style.borderLeftColor = "var(--gold-mid)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 18px 40px rgba(0,0,0,0.35), 0 0 20px rgba(184,149,42,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(184, 149, 42, 0.18)";
                el.style.borderLeftColor = "rgba(184, 149, 42, 0.65)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.25)";
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--gold-mid)",
                      background: "rgba(184,149,42,0.12)",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "6px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    SOLUCIÓN {sol.num}
                  </span>

                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(240, 237, 232, 0.75)",
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "0.22rem 0.6rem",
                      borderRadius: "9999px",
                      border: "1px solid rgba(184, 149, 42, 0.15)",
                    }}
                  >
                    {sol.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.22rem",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "0.65rem",
                    lineHeight: 1.25,
                  }}
                >
                  {sol.title}
                </h3>

                <p
                  style={{
                    color: "rgba(240, 237, 232, 0.8)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {sol.desc}
                </p>
              </div>

              {/* Bottom Feature Indicator */}
              <div style={{ marginTop: "1.35rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(184, 149, 42, 0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--gold-mid)" }}>
                  ✦ {sol.highlight}
                </span>

                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--gold-mid)",
                    animation: "pulse-gold 2s ease-in-out infinite",
                    animationDelay: `${i * 0.3}s`,
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .solutions-symmetric-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .solutions-symmetric-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
