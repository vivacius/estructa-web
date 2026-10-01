"use client";
import { useEffect, useRef, useState } from "react";

const solutions = [
  {
    title: "Control Financiero Pyme",
    desc: "Costos reales, margen por producto, flujo de caja semanal y punto de equilibrio. Saber exactamente cuánto ganas y por qué.",
    num: "01",
    size: "large",
    tag: "Finanzas & Caja",
    highlight: "Rentabilidad Real",
  },
  {
    title: "Cartera Inteligente",
    desc: "Recuperación de cartera vencida, políticas de crédito, alertas tempranas y automatización de cobranza sin dañar la relación comercial.",
    num: "02",
    size: "small",
    tag: "Cobranza",
    highlight: "Recuperación de Liquidez",
  },
  {
    title: "Gerencia con Datos",
    desc: "Dashboards ejecutivos en tiempo real con ventas, margen, inventario y KPIs directivos clave accesibles desde tu celular.",
    num: "03",
    size: "small",
    tag: "Business Intelligence",
    highlight: "Decisiones con Datos",
  },
  {
    title: "Empresa en Regla",
    desc: "Blindaje contractual con clientes, empleados y socios. Mitigación de riesgos laborales y estructura jurídica sólida para proteger tu patrimonio.",
    num: "04",
    size: "medium",
    tag: "Legal & Cumplimiento",
    highlight: "Blindaje 100%",
  },
  {
    title: "Digitalización Administrativa",
    desc: "Eliminación de tareas manuales repetitivas: flujos de aprobación digital, automatización de facturación y estandarización operativa.",
    num: "05",
    size: "medium",
    tag: "Eficiencia",
    highlight: "Automatización",
  },
  {
    title: "Comité Directivo Externo",
    desc: "Acompañamiento periódico multidisciplinario: revisamos mes a mes tus números, alertamos contingencias y guiamos la toma de decisiones estratégicas.",
    num: "06",
    size: "wide",
    tag: "Gobernanza",
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
        background: "linear-gradient(180deg, #FBF9F5 0%, #FFFFFF 50%, #F5F0E6 100%)",
        padding: "clamp(3.5rem, 5.5vw, 4.75rem) 0",
        position: "relative",
      }}
    >
      {/* Dynamic Animated Kinetic Divider */}
      <div className="kinetic-divider" style={{ position: "absolute", top: 0, left: 0 }} />

      <div className="container">
        {/* High-Contrast Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <h2
                className="text-display-lg"
                style={{
                  color: "var(--navy-deepest)",
                  maxWidth: "520px",
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
                    background: "linear-gradient(135deg, #091523 0%, #B8952A 70%)",
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
                color: "var(--navy-mid)",
                maxWidth: "360px",
                fontSize: "0.95rem",
                lineHeight: 1.65,
                fontWeight: 500,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.6s ease 0.15s",
              }}
            >
              No vendemos software genérico. Diagnosticamos primero la raíz del problema y estructuramos soluciones de impacto inmediato.
            </p>
          </div>
        </div>

        {/* High-Contrast Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="solutions-bento"
        >
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              style={{
                gridColumn: sol.size === "large" ? "span 2" : sol.size === "wide" ? "span 3" : "span 1",
                background: "#FFFFFF",
                border: "1.5px solid rgba(13, 30, 46, 0.1)",
                boxShadow: "0 8px 30px rgba(9, 21, 35, 0.05), 0 1px 3px rgba(0,0,0,0.02)",
                borderRadius: "20px",
                padding: sol.size === "wide" ? "1.75rem 2.25rem" : "1.75rem",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--gold-mid)";
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = "0 16px 40px rgba(184, 149, 42, 0.16), 0 2px 8px rgba(9, 21, 35, 0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(13, 30, 46, 0.1)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 8px 30px rgba(9, 21, 35, 0.05)";
              }}
            >
              {/* Header inside card */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--gold-mid)",
                      background: "rgba(184,149,42,0.12)",
                      padding: "0.2rem 0.6rem",
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
                      color: "var(--navy-deepest)",
                      background: "rgba(13, 30, 46, 0.05)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "9999px",
                      border: "1px solid rgba(13, 30, 46, 0.08)",
                    }}
                  >
                    {sol.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: sol.size === "large" ? "1.45rem" : "1.2rem",
                    fontWeight: 700,
                    color: "var(--navy-deepest)",
                    marginBottom: "0.6rem",
                    lineHeight: 1.25,
                  }}
                >
                  {sol.title}
                </h3>

                <p
                  style={{
                    color: "var(--navy-mid)",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    fontWeight: 450,
                  }}
                >
                  {sol.desc}
                </p>
              </div>

              {/* Bottom Feature Pill */}
              <div style={{ marginTop: "1.25rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(13, 30, 46, 0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--gold-mid)" }}>
                  ✦ {sol.highlight}
                </span>

                <a
                  href="#contacto"
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    color: "var(--navy-deepest)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  Consultar <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .solutions-bento {
            grid-template-columns: 1fr !important;
          }
          .solutions-bento > div {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
