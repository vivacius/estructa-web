"use client";
import { useEffect, useRef, useState } from "react";
import ContactCanvas from "@/components/canvas/ContactCanvas";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contacto"
      style={{
        background: "radial-gradient(ellipse at 50% 15%, #FFFFFF 0%, #FAF7F2 50%, #F3ECE1 100%)",
        color: "var(--navy-deepest)",
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

      {/* Dynamic Light Luxury Contact Canvas with wandering & pivoting logo watermark */}
      <ContactCanvas />

      {/* Crisp fine hairline border */}
      <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "1px", background: "rgba(184,149,42,0.22)", zIndex: 2 }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Symmetrical Header */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 3rem" }}>
          <h2
            className="text-display-md"
            style={{
              color: "var(--navy-deepest)",
              marginBottom: "0.6rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
          >
            Contacto y atención <span style={{ color: "var(--gold-primary)" }}>directa</span>
          </h2>

          <p
            style={{
              color: "var(--navy-mid)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s ease 0.1s",
            }}
          >
            Analizamos la situación financiera, jurídica y operativa de tu negocio con total reserva y sin compromisos.
          </p>
        </div>

        {/* Symmetrical 2-Column Action Deck */}
        <div
          style={{
            maxWidth: "980px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem",
            alignItems: "stretch",
          }}
          className="contact-symmetric-grid"
        >
          {/* Left Column: Direct Executive Contact Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.48)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1.5px solid rgba(184, 149, 42, 0.25)",
              borderLeft: "4px solid var(--gold-mid)",
              borderRadius: "20px",
              padding: "2.5rem 2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 18px 48px rgba(9, 21, 35, 0.06)",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--navy-deepest)", marginBottom: "0.6rem" }}>
                Canal de consulta directa
              </h3>

              <p style={{ color: "var(--navy-mid)", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Escríbenos directamente para resolver dudas puntuales sobre tu empresa o coordinar una conversación con nuestro equipo directivo.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.88rem", color: "var(--navy-deepest)" }}>
                  <span style={{ color: "var(--gold-primary)", fontWeight: 700 }}>✦</span>
                  <span>Respuesta ágil en horario laboral</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.88rem", color: "var(--navy-deepest)" }}>
                  <span style={{ color: "var(--gold-primary)", fontWeight: 700 }}>✦</span>
                  <span>Conversación técnica con directores de área</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.88rem", color: "var(--navy-deepest)" }}>
                  <span style={{ color: "var(--gold-primary)", fontWeight: 700 }}>✦</span>
                  <span>Confidencialidad absoluta garantizada</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href="https://wa.me/573013555173"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.65rem",
                  background: "#25D366",
                  color: "#FFFFFF",
                  padding: "0.9rem 1.4rem",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(37,211,102,0.28)",
                  transition: "transform 0.2s ease",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: Symmetrical Form Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.48)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              border: "1.5px solid rgba(184, 149, 42, 0.25)",
              borderRadius: "20px",
              padding: "2.5rem 2.25rem",
              boxShadow: "0 18px 48px rgba(9, 21, 35, 0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", color: "#16a34a", fontSize: "1.6rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  ✓
                </div>
                <h4 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--navy-deepest)", marginBottom: "0.5rem" }}>
                  Mensaje Recibido
                </h4>
                <p style={{ color: "var(--navy-mid)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Nos pondremos en contacto contigo en breve para revisar tu caso con total confidencialidad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem", letterSpacing: "0.06em" }}>
                      Nombre *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre completo"
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.95rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(184, 149, 42, 0.22)",
                        fontSize: "0.88rem",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.72)",
                        backdropFilter: "blur(10px)",
                        color: "var(--navy-deepest)",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem", letterSpacing: "0.06em" }}>
                      Empresa *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Nombre de la empresa"
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.95rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(184, 149, 42, 0.22)",
                        fontSize: "0.88rem",
                        outline: "none",
                        background: "rgba(255, 255, 255, 0.72)",
                        backdropFilter: "blur(10px)",
                        color: "var(--navy-deepest)",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem", letterSpacing: "0.06em" }}>
                    Teléfono o Correo *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="ejemplo@empresa.com o WhatsApp"
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.95rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(184, 149, 42, 0.22)",
                      fontSize: "0.88rem",
                      outline: "none",
                      background: "rgba(255, 255, 255, 0.72)",
                      backdropFilter: "blur(10px)",
                      color: "var(--navy-deepest)",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem", letterSpacing: "0.06em" }}>
                    Área de mayor interés
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.95rem",
                      borderRadius: "10px",
                      border: "1px solid rgba(184, 149, 42, 0.22)",
                      fontSize: "0.88rem",
                      outline: "none",
                      background: "rgba(255, 255, 255, 0.72)",
                      backdropFilter: "blur(10px)",
                      color: "var(--navy-deepest)",
                    }}
                  >
                    <option value="finanzas">Control Financiero & Caja</option>
                    <option value="legal">Legal & Blindaje Contractual</option>
                    <option value="procesos">Procesos & Control Operativo</option>
                    <option value="integral">Acompañamiento Integral</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    borderRadius: "10px",
                    marginTop: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {loading ? "Enviando..." : "Enviar mensaje"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-symmetric-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
