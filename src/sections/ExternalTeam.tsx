"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const roles = [
  { title: "Director Financiero", desc: "Que entienda tus números y proyecciones" },
  { title: "Abogado Empresarial", desc: "Que proteja y estructure tu empresa" },
  { title: "Analista de Datos", desc: "Que convierta datos en decisiones" },
  { title: "Consultor de Procesos", desc: "Que estandarice y optimice operaciones" },
  { title: "Equipo Tecnológico", desc: "Que digitalice y automatice lo que hoy es manual" },
];

export default function ExternalTeam() {
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
      id="nosotros"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/centro-mando.png"
          alt="Centro de comando estratégico"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(9,21,35,0.92) 0%, rgba(9,21,35,0.75) 50%, rgba(13,30,46,0.88) 100%)",
        }} />
      </div>

      {/* Top Edge Transition Ramp */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(to bottom, #FEFCF8 0%, rgba(9,21,35,0.7) 50%, rgba(9,21,35,0.95) 100%)",
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

      <div className="container" style={{ position: "relative", zIndex: 2, padding: "clamp(3rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* Left */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h2 className="text-display-lg" style={{ color: "var(--ivory)", marginBottom: "1.5rem" }}>
              Una pyme no necesita<br />
              <span style={{ color: "var(--gold-mid)" }}>contratar cinco departamentos.</span>
            </h2>
            <p className="text-body-lg" style={{ color: "var(--text-muted-dark)", marginBottom: "2rem", lineHeight: 1.75 }}>
              Una empresa pequeña normalmente no puede tener internamente a todos los especialistas que necesita. Y no debería.
            </p>
            <div style={{
              padding: "1.5rem 2rem",
              background: "rgba(184,149,42,0.1)",
              border: "1px solid rgba(184,149,42,0.25)",
              borderRadius: "16px",
              marginBottom: "2.5rem",
            }}>
              <p className="text-display-sm" style={{ color: "var(--ivory)", fontStyle: "italic", lineHeight: 1.4 }}>
                "ESTRUCTA puede convertirse en ese <span style={{ color: "var(--gold-mid)", fontStyle: "normal" }}>equipo externo.</span>"
              </p>
            </div>
            <a
              href="#contacto"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Hablemos de tu empresa
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>

          {/* Right: roles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {roles.map((role, i) => (
              <div
                key={role.title}
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  padding: "1rem 1.25rem",
                  background: "rgba(13,30,46,0.65)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(184,149,42,0.15)",
                  borderLeft: "3px solid rgba(184,149,42,0.5)",
                  borderRadius: "12px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(32px)",
                  transition: `opacity 0.5s ease ${0.15 + i * 0.12}s, transform 0.5s ease ${0.15 + i * 0.12}s`,
                }}
              >
                <div>
                  <div style={{ color: "var(--gold-mid)", fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.15rem" }}>{role.title}</div>
                  <div style={{ color: "var(--text-muted-dark)", fontSize: "0.775rem" }}>{role.desc}</div>
                </div>
                <div style={{
                  marginLeft: "auto",
                  width: "8px", height: "8px",
                  borderRadius: "50%",
                  background: "var(--gold-mid)",
                  animation: "pulse-gold 2s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                  flexShrink: 0,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #nosotros .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
