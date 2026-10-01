"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY * 0.18;
        imgRef.current.style.transform = `scale(1.04) translateY(${y}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F8F5EF 0%, #FEFCF8 55%, #F2EDE3 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Background texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 80%, rgba(184,149,42,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(13,30,46,0.04) 0%, transparent 50%)",
        pointerEvents: "none",
      }} />

      {/* Gold grid accent */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(184,149,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,42,0.04) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none",
        maskImage: "linear-gradient(to right, transparent, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.5) 70%, transparent)",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)",
          paddingBottom: "4rem",
        }}>
          {/* LEFT: Text */}
          <div style={{ animation: "fadeInUp 0.9s ease forwards" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(184,149,42,0.1)",
              border: "1px solid rgba(184,149,42,0.25)",
              borderRadius: "9999px",
              padding: "0.3rem 1rem",
              marginBottom: "2rem",
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#B8952A", animation: "pulse-gold 2s infinite", display: "inline-block" }} />
              <span className="text-label" style={{ color: "var(--gold-mid)" }}>Soluciones Empresariales Integrales</span>
            </div>

            <h1 className="text-display-xl" style={{ color: "var(--navy-deepest)", marginBottom: "1rem" }}>
              Construimos<br />
              <span style={{
                background: "linear-gradient(135deg, #B8952A, #D4B96A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>empresas más sólidas.</span>
            </h1>

            <p style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted-light)",
              marginBottom: "1.75rem",
              borderLeft: "2px solid var(--gold-mid)",
              paddingLeft: "0.75rem",
            }}>
              Legal · Finanzas · Estrategia · Tecnología
            </p>

            <p className="text-body-xl" style={{ color: "var(--navy-mid)", maxWidth: "480px", marginBottom: "2.5rem", lineHeight: 1.75 }}>
              Ayudamos a empresas a organizarse, entender mejor sus números, reducir riesgos, mejorar sus procesos y usar datos y tecnología para tomar mejores decisiones.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="#contacto"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Conversemos sobre tu empresa
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </a>
              <a
                href="#que-hacemos"
                className="btn btn-secondary"
                onClick={(e) => { e.preventDefault(); document.querySelector("#que-hacemos")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Conoce nuestro enfoque
              </a>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div
            style={{
              position: "relative",
              height: "600px",
              animation: "scaleIn 1.1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
            className="hide-mobile"
          >
            {/* Decorative frame */}
            <div style={{
              position: "absolute",
              inset: "-16px",
              border: "1px solid rgba(184,149,42,0.2)",
              borderRadius: "20px",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              top: "-8px", right: "-8px",
              width: "120px", height: "120px",
              borderTop: "2px solid var(--gold-mid)",
              borderRight: "2px solid var(--gold-mid)",
              borderRadius: "0 16px 0 0",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              bottom: "-8px", left: "-8px",
              width: "120px", height: "120px",
              borderBottom: "2px solid var(--gold-mid)",
              borderLeft: "2px solid var(--gold-mid)",
              borderRadius: "0 0 0 16px",
              pointerEvents: "none",
            }} />

            <div ref={imgRef} style={{ position: "relative", height: "100%", borderRadius: "16px", overflow: "hidden", transform: "scale(1.04)", transition: "transform 0.1s linear" }}>
              <Image
                src="/images/horizonte.png"
                alt="Arquitectura empresarial y tecnología"
                fill
                priority
                style={{ objectFit: "cover", objectPosition: "center 30%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Glass badge */}
            <div style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              background: "rgba(9,21,35,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(184,149,42,0.25)",
              borderRadius: "12px",
              padding: "1rem 1.25rem",
              maxWidth: "240px",
            }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-mid)", marginBottom: "0.4rem", fontWeight: 600 }}>Diagnóstico 360°</div>
              <div style={{ color: "var(--ivory)", fontSize: "0.85rem", lineHeight: 1.5 }}>Entendemos primero el negocio, luego lo resolvemos.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        animation: "float 2.5s ease-in-out infinite",
      }}>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--gold-mid), transparent)" }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold-mid)" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          #inicio .container > div {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
