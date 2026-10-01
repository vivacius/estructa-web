"use client";
import { useEffect, useRef, useState } from "react";

const questions = [
  "¿Puede mejorarse el proceso?",
  "¿Falta información?",
  "¿Necesitamos un indicador?",
  "¿Puede automatizarse?",
  "¿Hace falta realmente una aplicación?",
];

export default function Technology() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeQ, setActiveQ] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    questions.forEach((_, i) => {
      setTimeout(() => setActiveQ(i), 400 + i * 300);
    });
  }, [visible]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "var(--ivory)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,149,42,0.3), transparent)" }} />

      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* Left: Main copy */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="text-label text-muted-l" style={{ display: "block", marginBottom: "1.25rem" }}>Nuestra visión tecnológica</span>

            <h2 className="text-display-lg text-navy" style={{ marginBottom: "1.5rem" }}>
              No empezamos preguntando<br />
              <span style={{ color: "var(--gold-primary)" }}>qué software vender.</span>
            </h2>

            <div style={{
              padding: "1.5rem",
              background: "var(--navy-deepest)",
              borderRadius: "16px",
              marginBottom: "2rem",
            }}>
              <p className="text-display-sm" style={{ color: "var(--ivory)", fontStyle: "italic" }}>
                "Empezamos preguntando <span style={{ color: "var(--gold-mid)", fontStyle: "normal" }}>qué problema tiene la empresa.</span>"
              </p>
            </div>

          </div>

          {/* Right: Questions sequence */}
          <div style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.2s",
          }}>
            <div style={{
              background: "var(--navy-deepest)",
              borderRadius: "20px",
              padding: "2.5rem",
              border: "1px solid rgba(184,149,42,0.12)",
            }}>
              <div style={{ marginBottom: "2rem" }}>
                <span style={{ color: "var(--gold-mid)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Primero nos preguntamos
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {questions.map((q, i) => (
                  <div
                    key={q}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem 1.25rem",
                      borderRadius: "12px",
                      background: i <= activeQ ? "rgba(184,149,42,0.08)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${i <= activeQ ? "rgba(184,149,42,0.2)" : "rgba(255,255,255,0.05)"}`,
                      opacity: i <= activeQ ? 1 : 0.3,
                      transform: i <= activeQ ? "translateX(0)" : "translateX(-12px)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    <div style={{
                      width: "32px", height: "32px",
                      borderRadius: "50%",
                      background: i <= activeQ ? "var(--gold-mid)" : "rgba(184,149,42,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.3s ease",
                    }}>
                      {i <= activeQ ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--navy-deepest)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <span style={{ color: "rgba(184,149,42,0.4)", fontSize: "0.75rem", fontWeight: 700 }}>{i + 1}</span>
                      )}
                    </div>
                    <span style={{
                      color: i <= activeQ ? "var(--text-on-dark)" : "var(--text-muted-dark)",
                      fontSize: "0.9rem",
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      transition: "color 0.3s ease",
                    }}>
                      {q}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: "2rem",
                padding: "1rem 1.25rem",
                background: "rgba(184,149,42,0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(184,149,42,0.25)",
                opacity: activeQ >= questions.length - 1 ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}>
                <p style={{ color: "var(--gold-light)", fontSize: "0.875rem", fontStyle: "italic" }}>
                  Solo después diseñamos la solución tecnológica adecuada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          section[style*="var(--ivory)"] .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
