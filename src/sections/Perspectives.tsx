"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const pillars = [
  {
    key: "legal",
    title: "Legal",
    badge: "Blindaje",
    desc: "Contratos, gobierno societario, protección patrimonial y mitigación de contingencias laborales.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18" /><path d="M6 7l6-4 6 4" /><path d="M4 14l4-7 4 7c-1.5 2-6.5 2-8 0z" /><path d="M12 14l4-7 4 7c-1.5 2-6.5 2-8 0z" />
      </svg>
    ),
  },
  {
    key: "finanzas",
    title: "Finanzas",
    badge: "Control de Caja",
    desc: "Visibilidad de margen real, proyección de liquidez semanal y optimización de cartera.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    key: "estrategia",
    title: "Estrategia",
    badge: "Escalabilidad",
    desc: "Estandarización de procesos críticos, KPIs gerenciales y desvinculación operativa del fundador.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    key: "tecnologia",
    title: "Tecnología",
    badge: "Decisiones con Datos",
    desc: "Dashboards en tiempo real, automatización de tareas repetitivas e integración de sistemas.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        padding: "clamp(2.75rem, 4.5vw, 3.75rem) 0",
        color: "var(--ivory)",
      }}
    >
      {/* Background Image Texture (convergencia.png) with Cinematic Luxury Overlay */}
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
              "linear-gradient(135deg, rgba(9,21,35,0.94) 0%, rgba(9,21,35,0.85) 50%, rgba(13,30,46,0.92) 100%)",
          }}
        />
      </div>

      {/* Top Edge Transition Ramp from light section above */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(to bottom, #F2EDE3 0%, rgba(9,21,35,0.65) 50%, rgba(9,21,35,0.95) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(184,149,42,0.35), transparent)",
          zIndex: 2,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "0.5rem" }}>
        {/* Compact Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 1.75rem" }}>
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
            Cuatro disciplinas. <span style={{ color: "var(--gold-mid)" }}>Un mismo negocio.</span>
          </h2>

          <p
            style={{
              color: "rgba(240,237,232,0.8)",
              fontSize: "0.92rem",
              lineHeight: 1.5,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            Unificamos la verdad jurídica, contable, operativa y de datos sobre la misma mesa directiva.
          </p>
        </div>

        {/* Ultra-Compact 4-Pillars Horizontal Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.2rem",
          }}
        >
          {pillars.map((p, idx) => (
            <div
              key={p.key}
              style={{
                background: "rgba(13, 30, 46, 0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(184,149,42,0.22)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                borderRadius: "16px",
                padding: "1.4rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.25s ease, border-color 0.25s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transitionDelay: `${idx * 0.08}s`,
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(184,149,42,0.18)",
                      color: "var(--gold-mid)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--gold-mid)",
                      background: "rgba(184,149,42,0.12)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                      border: "1px solid rgba(184,149,42,0.25)",
                    }}
                  >
                    {p.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
                  {p.title}
                </h3>

                <p style={{ color: "rgba(240,237,232,0.75)", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
