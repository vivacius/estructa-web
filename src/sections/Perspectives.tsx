"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const areas = [
  {
    key: "Legal",
    icon: "⚖",
    color: "#C9A84C",
    desc: "Contratos, riesgos, cumplimiento, estructura societaria, relaciones laborales y protección de datos.",
    delay: 0,
  },
  {
    key: "Finanzas",
    icon: "₿",
    color: "#D4B96A",
    desc: "Contabilidad, impuestos, costos, presupuesto, caja, cartera y rentabilidad.",
    delay: 0.15,
  },
  {
    key: "Estrategia",
    icon: "♟",
    color: "#C9A84C",
    desc: "Procesos, prioridades, indicadores y control gerencial.",
    delay: 0.3,
  },
  {
    key: "Tecnología",
    icon: "⬡",
    color: "#D4B96A",
    desc: "Datos, dashboards, automatización, integración, aplicaciones e inteligencia artificial aplicada.",
    delay: 0.45,
  },
];

export default function Perspectives() {
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
      id="que-hacemos"
      style={{
        background: "linear-gradient(160deg, var(--ivory) 0%, var(--white-warm) 100%)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gold glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(184,149,42,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <span className="text-label" style={{ color: "var(--gold-mid)", display: "block", marginBottom: "1rem" }}>
            Nuestro diferencial
          </span>
          <h2
            className="text-display-lg"
            style={{
              color: "var(--navy-deepest)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            Cuatro perspectivas.<br />
            <span style={{ color: "var(--gold-mid)" }}>Un mismo negocio.</span>
          </h2>
          <p
            className="text-body-lg"
            style={{
              color: "var(--text-muted-light)",
              maxWidth: "520px",
              margin: "1.5rem auto 0",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.2s",
            }}
          >
            No vendemos servicios aislados. Resolvemos problemas empresariales desde cuatro ángulos simultáneamente.
          </p>
        </div>

        {/* Main layout: image + areas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}>
          {/* Image */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(0.94)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              boxShadow: "0 20px 60px rgba(9,21,35,0.12)",
            }}
            className="hide-mobile"
          >
            <Image
              src="/images/convergencia.png"
              alt="Legal, Finanzas, Estrategia y Tecnología convergiendo"
              width={600}
              height={700}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay gradient */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "200px",
              background: "linear-gradient(to top, rgba(248,245,239,0.9), transparent)",
            }} />
            {/* Center badge */}
            <div style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(9,21,35,0.82)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(184,149,42,0.3)",
              borderRadius: "12px",
              padding: "0.75rem 1.5rem",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}>
              <div style={{ color: "var(--gold-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 }}>
                Todo converge en una sola solución
              </div>
            </div>
          </div>

          {/* Areas */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {areas.map((area, i) => (
              <div
                key={area.key}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.5rem",
                  background: "#ffffff",
                  boxShadow: "0 2px 16px rgba(13,30,46,0.06)",
                  border: "1px solid rgba(184,149,42,0.15)",
                  borderRadius: "16px",
                  borderLeft: `3px solid ${area.color}`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(32px)",
                  transition: `opacity 0.6s ease ${area.delay + 0.3}s, transform 0.6s ease ${area.delay + 0.3}s`,
                }}
              >
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: `rgba(184,149,42,0.12)`,
                  border: `1px solid ${area.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  flexShrink: 0,
                }}>
                  {area.icon}
                </div>
                <div>
                  <h3 style={{ color: area.color, fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                    {area.key}
                  </h3>
                  <p style={{ color: "var(--text-muted-light)", fontSize: "0.875rem", lineHeight: 1.65 }}>
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          #que-hacemos .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
