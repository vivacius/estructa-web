"use client";
import { useEffect, useRef, useState } from "react";

const phrases = [
  "Vendo, pero no sé realmente cuánto gano.",
  "Mi cartera depende de un Excel.",
  "Todo pasa por mí.",
  "Tenemos información, pero no sabemos qué mirar.",
  "Cada persona hace el proceso de una manera diferente.",
  "Mi contador me dice cuánto pagar, no qué está pasando con mi negocio.",
  "Tenemos herramientas, pero la operación diaria sigue siendo manual y desordenada.",
  "Quiero crecer, pero no sé si mi empresa está preparada.",
];

export default function Problems() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIdx((i) => (i + 1) % phrases.length);
        setFade(true);
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: "linear-gradient(180deg, #F5EFE6 0%, #102133 45%, #091523 100%)",
        padding: "clamp(5rem, 7.5vw, 7rem) 0",
        overflow: "hidden",
        position: "relative",
        color: "var(--ivory)",
      }}
    >
      {/* Crisp fine hairline border */}
      <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "1px", background: "rgba(184,149,42,0.22)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Rotating phrase in grand, symmetrical container */}
        <div style={{ textAlign: "center", minHeight: "220px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "relative",
            maxWidth: "880px",
            margin: "0 auto",
          }}>
            <span style={{
              color: "var(--gold-mid)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              lineHeight: 1.2,
              marginRight: "0.5rem",
              verticalAlign: "top",
              opacity: 0.6,
              fontSize: "2.4rem",
            }}>"</span>
            <h2
              className="text-display-md"
              style={{
                color: "#FFFFFF",
                fontStyle: "italic",
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                display: "inline",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {phrases[activeIdx]}
            </h2>
            <span style={{
              fontSize: "2.4rem",
              color: "var(--gold-mid)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              lineHeight: 1.2,
              marginLeft: "0.5rem",
              opacity: 0.6,
            }}>"</span>
          </div>

          {/* Phrase indicators */}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "2.5rem" }}>
            {phrases.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setActiveIdx(i); setFade(true); }, 300); }}
                style={{
                  width: i === activeIdx ? "28px" : "8px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === activeIdx ? "var(--gold-mid)" : "rgba(255,255,255,0.2)",
                  transition: "all 0.3s ease",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Symmetrical Resolution block */}
        <div
          className={`reveal ${visible ? "visible" : ""}`}
          style={{ textAlign: "center", marginTop: "2.5rem" }}
        >
          <div style={{
            display: "inline-block",
            width: "1px",
            height: "44px",
            background: "linear-gradient(to bottom, transparent, var(--gold-mid))",
            marginBottom: "1.25rem",
          }} />
          <h3
            className="text-display-md"
            style={{ color: "#FFFFFF", marginBottom: "0.5rem" }}
          >
            Ahí empieza <span style={{ color: "var(--gold-mid)" }}>ESTRUCTA.</span>
          </h3>
          <p style={{ color: "rgba(240,237,232,0.75)", fontSize: "0.95rem", margin: 0 }}>
            Servicios y soluciones empresariales integradas para tomar el control de tu negocio.
          </p>
        </div>
      </div>
    </section>
  );
}
