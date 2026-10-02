"use client";
import { useEffect, useRef, useState } from "react";
import SolutionsCanvas from "@/components/canvas/SolutionsCanvas";

const solutions = [
  {
    num: "01",
    tag: "Finanzas & Caja",
    title: "Control Financiero Pyme",
    desc: "Cálculo de costos reales, margen por producto, proyección de flujo de caja semanal y punto de equilibrio para saber con exactitud cuánto ganas.",
    deliverables: ["Flujo de caja proyectado a 13 semanas", "Estructura de costos unitarios", "Política de precios y margen real"],
    highlight: "Rentabilidad Real",
  },
  {
    num: "02",
    tag: "Cobranza & Liquidez",
    title: "Gestión y Cobro de Cartera",
    desc: "Recuperación de cuentas por cobrar vencidas, políticas de crédito claras y rutinas de seguimiento sin deteriorar relaciones comerciales.",
    deliverables: ["Plan de recuperación inmediata", "Política de plazos y cupos", "Rutinas sistemáticas de cobro"],
    highlight: "Recuperación de Flujo",
  },
  {
    num: "03",
    tag: "Control Directivo",
    title: "Tableros de Control Gerencial",
    desc: "Visibilidad en tiempo real de ventas, márgenes, inventario y cuentas clave para tomar decisiones gerenciales fundamentadas en números.",
    deliverables: ["Dashboard directivo móvil", "KPIs de alertas tempranas", "Consolidación de fuentes dispersas"],
    highlight: "Certeza en Números",
  },
  {
    num: "04",
    tag: "Legal & Cumplimiento",
    title: "Blindaje Legal & Contratos",
    desc: "Contratos comerciales, acuerdos entre socios y mitigación de contingencias laborales para proteger el patrimonio de la empresa.",
    deliverables: ["Auditoría de minutas y contratos", "Acuerdos societarios y gobierno", "Blindaje laboral y de personal"],
    highlight: "Protección Patrimonial",
  },
  {
    num: "05",
    tag: "Eficiencia Operativa",
    title: "Optimización y Procesos",
    desc: "Estandarización de flujos de trabajo operativos y eliminación de trámites manuales repetitivos para ahorrar tiempo y evitar errores.",
    deliverables: ["Manuales operativos clave", "Delegación y despersonalización", "Automatización de rutinas administrativas"],
    highlight: "Menor Carga Operativa",
  },
  {
    num: "06",
    tag: "Dirección Estratégica",
    title: "Comité Directivo Acompañado",
    desc: "Acompañamiento periódico como aliados de cabecera: sesionamos mes a mes, vigilamos cifras y guiamos decisiones clave del negocio.",
    deliverables: ["Comité mensual de resultados", "Vigilancia de márgenes y riesgos", "Soporte legal y financiero continuo"],
    highlight: "Acompañamiento Continuo",
  },
];

export default function Solutions() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Automatic gliding / auto-play carousel only when viewing section
  useEffect(() => {
    if (isHovered || !visible) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % solutions.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isHovered, visible]);

  // Smooth scroll sync relative strictly to the track (NEVER scrolls page window)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[activeIdx] as HTMLElement;
    if (card) {
      const trackWidth = track.clientWidth;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const targetScrollLeft = cardLeft - (trackWidth - cardWidth) / 2;
      track.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: "smooth" });
    }
  }, [activeIdx]);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % solutions.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + solutions.length) % solutions.length);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="soluciones"
      style={{
        background: "radial-gradient(ellipse at 50% 15%, #FFFFFF 0%, #FAF7F2 50%, #F3ECE1 100%)",
        padding: "clamp(4.5rem, 6.5vw, 6rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Architectural Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(184,149,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Dynamic Symmetrical Solutions Architectural Canvas (Hero-matching light canvas) */}
      <SolutionsCanvas />

      {/* Clean 1px top border */}
      <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "1px", background: "rgba(184,149,42,0.22)", zIndex: 2 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header with Direct Title "Soluciones" and Controls */}
        <div style={{ marginBottom: "2.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2
              className="text-display-lg"
              style={{
                color: "var(--navy-deepest)",
                lineHeight: 1.1,
                marginBottom: "0.6rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Soluciones
            </h2>

            <p
              style={{
                color: "var(--navy-mid)",
                maxWidth: "520px",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                fontWeight: 500,
                margin: 0,
              }}
            >
              Servicios estructurados y aplicados a la medida de tu operación para resolver problemas de caja, legal y control.
            </p>
          </div>

          {/* Runway Navigation Arrows */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Solución anterior"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1.5px solid rgba(184, 149, 42, 0.35)",
                color: "var(--navy-deepest)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(9, 21, 35, 0.06)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold-mid)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(184, 149, 42, 0.35)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Solución siguiente"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1.5px solid rgba(184, 149, 42, 0.35)",
                color: "var(--navy-deepest)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(9, 21, 35, 0.06)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold-mid)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(184, 149, 42, 0.35)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Dynamic Auto-Scrolling Runway Showcase Track */}
        <div
          ref={trackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="solutions-runway-track"
          style={{
            display: "flex",
            gap: "1.5rem",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            padding: "1rem 0.5rem 2rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {solutions.map((sol, i) => {
            const isCurrent = activeIdx === i;
            return (
              <div
                key={sol.title}
                onClick={() => setActiveIdx(i)}
                style={{
                  flex: "0 0 360px",
                  maxWidth: "360px",
                  scrollSnapAlign: "center",
                  background: "#FFFFFF",
                  border: isCurrent ? "2px solid var(--gold-mid)" : "1.5px solid rgba(184, 149, 42, 0.22)",
                  boxShadow: isCurrent
                    ? "0 22px 48px rgba(184, 149, 42, 0.22), 0 6px 16px rgba(9, 21, 35, 0.07)"
                    : "0 10px 30px rgba(9, 21, 35, 0.05)",
                  borderRadius: "20px",
                  padding: "2rem 1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "360px",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  transform: isCurrent ? "translateY(-6px)" : "translateY(0)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "var(--gold-mid)",
                        background: "rgba(184,149,42,0.12)",
                        padding: "0.22rem 0.65rem",
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
                        background: "rgba(9, 21, 35, 0.05)",
                        padding: "0.25rem 0.65rem",
                        borderRadius: "9999px",
                        border: "1px solid rgba(9, 21, 35, 0.1)",
                      }}
                    >
                      {sol.tag}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      fontWeight: 700,
                      color: "var(--navy-deepest)",
                      marginBottom: "0.75rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {sol.title}
                  </h3>

                  <p
                    style={{
                      color: "var(--navy-mid)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {sol.desc}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", marginBottom: "1.25rem" }}>
                    {sol.deliverables.map((d, dIdx) => (
                      <div key={dIdx} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--navy-deepest)" }}>
                        <span style={{ color: "var(--gold-mid)", fontWeight: 700 }}>✦</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Highlight Anchor */}
                <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(9, 21, 35, 0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gold-primary)" }}>
                    ✦ {sol.highlight}
                  </span>

                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--navy-mid)" }}>
                    Ver más →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Runway Pagination Dot Indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "1rem" }}>
          {solutions.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`Ir a solución ${idx + 1}`}
              style={{
                width: activeIdx === idx ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: activeIdx === idx ? "var(--gold-mid)" : "rgba(9, 21, 35, 0.18)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .solutions-runway-track::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 640px) {
          .solutions-runway-track > div {
            flex: 0 0 290px !important;
            max-width: 290px !important;
            padding: 1.5rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
