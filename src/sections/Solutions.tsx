"use client";
import { useEffect, useRef, useState } from "react";

const solutions = [
  {
    title: "Control Financiero Pyme",
    desc: "Costos, margen, presupuesto, flujo de caja y punto de equilibrio. Saber realmente cuánto ganas y por qué.",
    num: "01",
    size: "large",
    color: "var(--gold-mid)",
  },
  {
    title: "Cartera Inteligente",
    desc: "Facturas, vencimientos, responsables, alertas y gestión de cobro.",
    num: "02",
    size: "small",
    color: "#D4B96A",
  },
  {
    title: "Gerencia con Datos",
    desc: "Dashboard ejecutivo de ventas, margen, caja, cartera, inventarios e indicadores clave.",
    num: "03",
    size: "small",
    color: "#C9A84C",
  },
  {
    title: "Empresa en Regla",
    desc: "Contratos, cumplimiento, protección de datos y estructura jurídica sólida.",
    num: "04",
    size: "medium",
    color: "#B8952A",
  },
  {
    title: "Digitalización Administrativa",
    desc: "Pedidos, formularios, aprobaciones, documentos, automatizaciones y reportes.",
    num: "05",
    size: "medium",
    color: "#D4B96A",
  },
  {
    title: "Comité Empresarial",
    desc: "Acompañamiento periódico para revisar indicadores, riesgos, avances y decisiones.",
    num: "06",
    size: "wide",
    color: "#C9A84C",
  },
];

export default function Solutions() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
        background: "linear-gradient(180deg, var(--ivory) 0%, var(--white-warm) 100%)",
        padding: "clamp(3rem, 5vw, 4.5rem) 0",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <span className="text-label text-muted-l" style={{ display: "block", marginBottom: "0.75rem" }}>Lo que resolvemos</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", flexWrap: "wrap" }}>
            <h2
              className="text-display-lg text-navy"
              style={{
                maxWidth: "480px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              Soluciones diseñadas<br />
              <span style={{ color: "var(--gold-primary)" }}>para el negocio real.</span>
            </h2>
            <p style={{ color: "var(--text-muted-light)", maxWidth: "320px", fontSize: "0.9rem", lineHeight: 1.7 }}>
              No elegimos un producto antes de entender el problema. Primero diagnosticamos, luego diseñamos el camino.
            </p>
          </div>
        </div>

        {/* Bento grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: "1.25rem",
        }}>
          {solutions.map((sol, i) => (
            <div
              key={sol.title}
              style={{
                gridColumn: sol.size === "large" ? "span 2" : sol.size === "wide" ? "span 3" : "span 1",
                background: "var(--navy-deepest)",
                border: "1px solid rgba(184,149,42,0.12)",
                borderRadius: "20px",
                padding: sol.size === "wide" ? "2rem 2.5rem" : "2rem",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,149,42,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,149,42,0.12)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Background glow */}
              <div style={{
                position: "absolute",
                top: "-30px", right: "-30px",
                width: "120px", height: "120px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${sol.color}22 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              <div style={{
                display: sol.size === "wide" ? "grid" : "flex",
                gridTemplateColumns: sol.size === "wide" ? "auto 1fr" : undefined,
                gap: "1.5rem",
                alignItems: sol.size === "wide" ? "center" : "flex-start",
                flexDirection: sol.size === "wide" ? undefined : "column",
              }}>
                <div style={{ flexShrink: 0 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: sol.color,
                    opacity: 0.7,
                  }}>{sol.num}</span>
                  <div style={{
                    width: "32px",
                    height: "2px",
                    background: `linear-gradient(90deg, ${sol.color}, transparent)`,
                    marginTop: "0.4rem",
                    borderRadius: "1px",
                  }} />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: sol.size === "large" ? "1.5rem" : "1.1rem",
                    fontWeight: 600,
                    color: sol.color,
                    marginBottom: "0.5rem",
                  }}>
                    {sol.title}
                  </h3>
                  <p style={{ color: "var(--text-muted-dark)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                    {sol.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a
            href="#contacto"
            className="btn btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Conversemos sobre tu empresa
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #soluciones .container > div:nth-child(2) > div { grid-template-columns: 1fr !important; }
          #soluciones .container > div:nth-child(2) > div > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
