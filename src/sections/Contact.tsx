"use client";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [priority, setPriority] = useState<string>("Diagnóstico 360° Integral");
  const [sent, setSent] = useState(false);

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
    setSent(true);
  };

  const priorities = [
    "Diagnóstico 360° Integral",
    "Control Financiero & Caja",
    "Blindaje Legal & Contratos",
    "Datos & Automatización",
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contacto"
      style={{
        background: "linear-gradient(180deg, #091523 0%, #060F1A 100%)",
        color: "var(--ivory)",
        padding: "clamp(3.5rem, 6vw, 5.5rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial gold glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(circle, rgba(184,149,42,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Edge Transition Ramp from light section into deep navy */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "linear-gradient(to bottom, #F8F5EF 0%, rgba(9,21,35,0.8) 60%, rgba(9,21,35,1) 100%)",
          pointerEvents: "none",
          zIndex: 1,
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

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "1rem" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 2.5rem" }}>
          <h2
            className="text-display-lg"
            style={{
              color: "#FFFFFF",
              marginBottom: "1rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Hablemos de tu empresa
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #B8952A 0%, #E8D28E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              con números claros y sin rodeos.
            </span>
          </h2>

          <p
            className="text-body-lg"
            style={{
              color: "rgba(240,237,232,0.8)",
              lineHeight: 1.7,
              fontSize: "1.05rem",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease 0.15s",
            }}
          >
            Agenda una conversación preliminar directa con nuestro equipo multidisciplinario.
            Entendemos tu contexto y te entregamos claridad desde el primer contacto.
          </p>
        </div>

        {/* Contact Grid: Left Concierge Details + Right Bespoke Form */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left Column: Executive Concierge */}
          <div>
            <div
              style={{
                background: "rgba(13,30,46,0.6)",
                border: "1px solid rgba(184,149,42,0.25)",
                borderRadius: "20px",
                padding: "2rem",
                backdropFilter: "blur(12px)",
                marginBottom: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-mid)" }}>
                  Canal de Respuesta Rápida
                </span>
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.6rem" }}>
                ¿Prefieres conversar de inmediato?
              </h3>
              <p style={{ color: "rgba(240,237,232,0.75)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                Escríbenos directamente a nuestro WhatsApp directivo. Tiempo de respuesta estimado: menos de 15 minutos en horario comercial.
              </p>

              <a
                href="https://wa.me/573013555173"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  background: "#25D366",
                  color: "#FFFFFF",
                  padding: "0.95rem 1.5rem",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>

            {/* Direct Assurance Badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { title: "Acuerdo de Confidencialidad (NDA)", desc: "Tu información contable, legal y societaria está 100% protegida." },
                { title: "Evaluación sin Compromiso", desc: "La sesión inicial nos permite conocer el reto y plantearte la ruta exacta." },
                { title: "Cobertura Nacional", desc: "Atención presencial en Medellín y Bogotá, y virtual para toda Colombia y la región." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(184,149,42,0.2)", color: "var(--gold-mid)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", flexShrink: 0, marginTop: "2px" }}>
                    ✓
                  </div>
                  <div>
                    <div style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "0.88rem" }}>{item.title}</div>
                    <div style={{ color: "rgba(240,237,232,0.65)", fontSize: "0.8rem", lineHeight: 1.45 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Priority Diagnostic Booking Form */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "2.5rem",
              color: "var(--navy-deepest)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              border: "1px solid rgba(184,149,42,0.3)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", color: "#16a34a", fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  ✓
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy-deepest)", marginBottom: "0.75rem" }}>
                  Solicitud Recibida
                </h3>
                <p style={{ color: "var(--navy-mid)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 1.5rem" }}>
                  Uno de nuestros directores se pondrá en contacto contigo para coordinar la sesión diagnóstica confidencial.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="btn btn-secondary"
                  style={{ fontSize: "0.85rem", padding: "0.65rem 1.5rem" }}
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--navy-deepest)", marginBottom: "0.5rem" }}>
                  Solicitar Sesión Diagnóstica
                </h3>
                <p style={{ fontSize: "0.86rem", color: "var(--text-muted-light)", marginBottom: "1.5rem" }}>
                  Selecciona la prioridad principal de tu empresa:
                </p>

                {/* Priority Selection Pills */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  {priorities.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPriority(item)}
                      style={{
                        padding: "0.6rem 0.8rem",
                        borderRadius: "10px",
                        fontSize: "0.76rem",
                        fontWeight: 600,
                        textAlign: "center",
                        border: priority === item ? "1.5px solid var(--gold-mid)" : "1px solid rgba(13,30,46,0.12)",
                        background: priority === item ? "rgba(184,149,42,0.12)" : "rgba(248,245,239,0.5)",
                        color: priority === item ? "var(--gold-mid)" : "var(--navy-deepest)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                {/* Input Fields */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem" }}>
                      Nombre del Directivo o Propietario *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Carlos Restrepo"
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(13,30,46,0.18)",
                        fontSize: "0.9rem",
                        outline: "none",
                        background: "#FAF7F2",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem" }}>
                        Empresa / Sector *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Ej. Distribución / Servicios"
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(13,30,46,0.18)",
                          fontSize: "0.9rem",
                          outline: "none",
                          background: "#FAF7F2",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem" }}>
                        WhatsApp o Teléfono *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+57 300 000 0000"
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem",
                          borderRadius: "10px",
                          border: "1px solid rgba(13,30,46,0.18)",
                          fontSize: "0.9rem",
                          outline: "none",
                          background: "#FAF7F2",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--navy-deepest)", marginBottom: "0.35rem" }}>
                      ¿Cuál es el principal obstáculo actual de la empresa?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ej. Falta de control de caja, contratos desactualizados o procesos que dependen del fundador..."
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        borderRadius: "10px",
                        border: "1px solid rgba(13,30,46,0.18)",
                        fontSize: "0.9rem",
                        outline: "none",
                        background: "#FAF7F2",
                        resize: "vertical",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "0.95rem",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  Solicitar Diagnóstico Confidencial
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
