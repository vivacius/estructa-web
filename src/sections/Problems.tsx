"use client";
import { useEffect, useRef, useState } from "react";

const phrases = [
  "Vendo, pero no sé realmente cuánto gano.",
  "Mi cartera depende de un Excel.",
  "Todo pasa por mí.",
  "Tenemos información, pero no sabemos qué mirar.",
  "Cada persona hace el proceso de una manera diferente.",
  "Mi contador me dice cuánto pagar, no qué está pasando con mi negocio.",
  "Tenemos software, pero seguimos haciendo muchas cosas manualmente.",
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
        background: "var(--ivory-mid)",
        padding: "clamp(3.5rem, 5vw, 4.5rem) 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle background accent */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, transparent, var(--gold-mid), transparent)",
      }} />

      <div className="container">
        {/* Section label */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}
          className={`reveal ${visible ? "visible" : ""}`}>
          <span className="text-label text-muted-l">El dilema empresarial</span>
          <span className="gold-line" style={{ margin: "0.5rem auto 0" }} />
        </div>

        {/* Rotating phrase */}
        <div style={{ textAlign: "center", minHeight: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            position: "relative",
            maxWidth: "820px",
            margin: "0 auto",
          }}>
            <span style={{
              color: "var(--text-muted-light)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              lineHeight: 1.3,
              marginRight: "0.5rem",
              verticalAlign: "top",
              opacity: 0.4,
              fontSize: "2rem",
            }}>"</span>
            <h2
              className="text-display-md"
              style={{
                color: "var(--navy-deepest)",
                fontStyle: "italic",
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                display: "inline",
                fontWeight: 500,
              }}
            >
              {phrases[activeIdx]}
            </h2>
            <span style={{
              fontSize: "2rem",
              color: "var(--text-muted-light)",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              lineHeight: 1.3,
              marginLeft: "0.5rem",
              opacity: 0.4,
            }}>"</span>
          </div>

          {/* Phrase indicators */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
            {phrases.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setActiveIdx(i); setFade(true); }, 300); }}
                style={{
                  width: i === activeIdx ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === activeIdx ? "var(--gold-mid)" : "rgba(13,30,46,0.2)",
                  transition: "all 0.3s ease",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Resolution line */}
        <div
          className={`reveal ${visible ? "visible" : ""}`}
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          <div style={{
            display: "inline-block",
            width: "1px",
            height: "36px",
            background: "linear-gradient(to bottom, transparent, var(--gold-mid))",
            marginBottom: "1rem",
          }} />
          <h3
            className="text-display-md"
            style={{ color: "var(--navy-deepest)" }}
          >
            Ahí empieza <span style={{ color: "var(--gold-mid)" }}>ESTRUCTA.</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
