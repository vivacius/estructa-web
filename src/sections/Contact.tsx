"use client";
import { useState, useEffect, useRef } from "react";

const interests = [
  "Entender mejor mis finanzas",
  "Gestión de cartera",
  "Dashboard e indicadores",
  "Estructura jurídica",
  "Digitalización de procesos",
  "Diagnóstico 360°",
  "Acompañamiento empresarial",
  "Otro",
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", whatsapp: "", email: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contacto"
      style={{
        background: "linear-gradient(160deg, var(--ivory) 0%, var(--white-warm) 100%)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold glow */}
      <div style={{
        position: "absolute",
        bottom: "-100px", right: "-100px",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(184,149,42,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          {/* Left copy */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="text-label" style={{ color: "var(--gold-mid)", display: "block", marginBottom: "1.25rem" }}>Primer paso</span>
            <h2 className="text-display-lg" style={{ color: "var(--navy-deepest)", marginBottom: "1.5rem" }}>
              Conversemos<br />
              <span style={{ color: "var(--gold-mid)" }}>sobre tu empresa.</span>
            </h2>
            <p className="text-body-lg" style={{ color: "var(--text-muted-light)", marginBottom: "2.5rem", lineHeight: 1.75 }}>
              Sin compromisos. Sin productos predefinidos. Solo una conversación honesta sobre lo que está pasando en tu empresa y cómo podríamos ayudarte.
            </p>

            {/* What to expect */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "Escuchamos primero tu situación actual",
                "Identificamos los puntos críticos de tu negocio",
                "Proponemos un camino concreto si hay fit",
                "Sin compromiso, sin presión de venta",
              ].map((text) => (
                <div key={text} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  <span style={{
                    display: "block",
                    width: "16px",
                    height: "2px",
                    background: "var(--gold-mid)",
                    marginTop: "0.55rem",
                    flexShrink: 0,
                    borderRadius: "1px",
                  }} />
                  <span style={{ color: "var(--text-muted-light)", fontSize: "0.9rem", lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div style={{ marginTop: "3rem" }}>
              <a
                href="https://wa.me/573013555173"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          {/* Right form */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(184,149,42,0.15)",
              boxShadow: "0 8px 40px rgba(13,30,46,0.08)",
              borderRadius: "24px",
              padding: "2.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ color: "var(--gold-mid)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Nombre *</label>
                    <input
                      type="text"
                      required
                      className="input"
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "var(--gold-mid)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Empresa</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Nombre de tu empresa"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ color: "var(--gold-mid)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      className="input"
                      placeholder="+57 300 000 0000"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ color: "var(--gold-mid)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Correo</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="tu@empresa.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ color: "var(--gold-mid)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>¿Qué te gustaría mejorar?</label>
                  <select
                    className="input"
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">Selecciona una opción</option>
                    {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ color: "var(--gold-mid)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Cuéntanos más (opcional)</label>
                  <textarea
                    className="input textarea"
                    placeholder="¿Qué está pasando en tu empresa? ¿Cuál es el principal desafío?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
                  Hablemos
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{
                  width: "56px", height: "56px",
                  borderRadius: "50%",
                  background: "rgba(184,149,42,0.12)",
                  border: "1px solid rgba(184,149,42,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.25rem",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--gold-mid)", fontSize: "1.5rem", marginBottom: "1rem" }}>¡Mensaje recibido!</h3>
                <p style={{ color: "var(--text-muted-light)", lineHeight: 1.7 }}>
                  Nos pondremos en contacto contigo muy pronto para agendar una conversación inicial.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #contacto .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
