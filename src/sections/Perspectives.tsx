"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const pillars = [
  {
    key: "legal",
    title: "Legal & Corporativo",
    tag: "Seguridad Contractual",
    desc: "Contratos comerciales y con proveedores, acuerdos societarios, mitigación de riesgos laborales y protección patrimonial.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18" /><path d="M6 7l6-4 6 4" /><path d="M4 14l4-7 4 7c-1.5 2-6.5 2-8 0z" /><path d="M12 14l4-7 4 7c-1.5 2-6.5 2-8 0z" />
      </svg>
    ),
  },
  {
    key: "finanzas",
    title: "Finanzas & Control",
    tag: "Control de Flujo",
    desc: "Cálculo de costos y márgenes reales, modelo de flujo de caja proyectado a 13 semanas y gestión de cobro de cartera.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    key: "estrategia",
    title: "Estrategia Directiva",
    tag: "Gobernanza & Orden",
    desc: "Estructuración de procesos clave, orden en la toma de decisiones y desvinculación operativa progresiva del fundador.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    key: "procesos",
    title: "Procesos & Datos",
    tag: "Eficiencia Operativa",
    desc: "Tableros de control gerencial, orden operativo y automatización de flujos rutinarios para eliminar cuellos de botella.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function Perspectives() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="que-hacemos"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(4.5rem, 6.5vw, 6rem) 0",
        color: "var(--ivory)",
      }}
    >
      {/* Background Image Texture (convergencia.png) with Clean Luxury Overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/convergencia.png"
          alt="Convergencia estratégica"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
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

      {/* Clean 1px hairline border at top */}
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
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3rem" }}>
          <h2
            className="text-display-md"
            style={{
              color: "#FFFFFF",
              marginBottom: "0.75rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            Cuatro frentes clave. <span style={{ color: "var(--gold-mid)" }}>Un solo equipo.</span>
          </h2>

          <p
            style={{
              color: "rgba(240,237,232,0.8)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            Alineamos la gestión legal, financiera, estratégica y operativa para que tu empresa funcione ordenada y con rentabilidad sostenible.
          </p>
        </div>

        {/* Symmetrical 4-Card Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
          className="perspectives-symmetric-grid"
        >
          {pillars.map((p, idx) => (
            <div
              key={p.key}
              style={{
                background: "rgba(13, 30, 46, 0.72)",
                backdropFilter: "blur(14px)",
                border: "1px solid rgba(184,149,42,0.18)",
                borderLeft: "3.5px solid rgba(184,149,42,0.65)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
                borderRadius: "16px",
                padding: "1.75rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "230px",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${idx * 0.08}s`,
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
                el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)";
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(184,149,42,0.16)",
                      color: "var(--gold-mid)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    {p.title}
                  </h3>
                </div>

                <p style={{ color: "rgba(240,237,232,0.8)", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </div>

              {/* Bottom Feature Indicator */}
              <div style={{ marginTop: "1.35rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(184, 149, 42, 0.12)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--gold-mid)" }}>
                  ✦ {p.tag}
                </span>

                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--gold-mid)",
                    animation: "pulse-gold 2s ease-in-out infinite",
                    animationDelay: `${idx * 0.3}s`,
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .perspectives-symmetric-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .perspectives-symmetric-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
