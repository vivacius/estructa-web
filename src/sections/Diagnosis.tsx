"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const metrics = [
  { label: "Legal", value: 68, status: "warn", statusLabel: "Requiere atención" },
  { label: "Contable / Tributario", value: 76, status: "ok", statusLabel: "Adecuado" },
  { label: "Financiero / Gerencial", value: 42, status: "crit", statusLabel: "Prioritario" },
  { label: "Procesos", value: 51, status: "warn", statusLabel: "Requiere atención" },
  { label: "Datos & Tecnología", value: 36, status: "crit", statusLabel: "Prioritario" },
];

const statusColors = { ok: "#4ade80", warn: "#facc15", crit: "#f87171" };
const statusBg = { ok: "rgba(34,197,94,0.12)", warn: "rgba(234,179,8,0.12)", crit: "rgba(239,68,68,0.12)" };
const statusBorder = { ok: "rgba(34,197,94,0.3)", warn: "rgba(234,179,8,0.3)", crit: "rgba(239,68,68,0.3)" };
const statusDot = { ok: "●", warn: "●", crit: "●" };

export default function Diagnosis() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [bars, setBars] = useState(metrics.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    metrics.forEach((m, i) => {
      setTimeout(() => {
        let frame = 0;
        const target = m.value;
        const animate = () => {
          frame += 2.5;
          if (frame >= target) frame = target;
          setBars((prev) => { const next = [...prev]; next[i] = frame; return next; });
          if (frame < target) requestAnimationFrame(animate);
        };
        animate();
      }, 200 + i * 150);
    });
  }, [visible]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="diagnostico"
      style={{
        background: "linear-gradient(160deg, var(--ivory-mid) 0%, var(--white-warm) 100%)",
        padding: "clamp(3rem, 5vw, 4.5rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(184,149,42,0.12)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(184,149,42,0.08)", pointerEvents: "none" }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="text-label" style={{ color: "var(--gold-mid)", display: "block", marginBottom: "0.75rem" }}>
            Nuestro primer paso
          </span>
          <h2
            className="text-display-lg"
            style={{
              color: "var(--navy-deepest)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            Antes de vender una solución,<br />
            <span style={{ color: "var(--gold-mid)" }}>entendemos la empresa.</span>
          </h2>
        </div>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "start",
        }}>
          {/* Left: image + product name */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
          className="hide-mobile">
            <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(9,21,35,0.12)" }}>
              <Image
                src="/images/panel.png"
                alt="Panel de análisis Diagnóstico 360°"
                width={600}
                height={450}
                style={{ width: "100%", height: "auto", display: "block" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(248,245,239,0.7) 0%, transparent 50%)",
              }} />
            </div>
          </div>

          {/* Right: animated metrics */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}>
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(184,149,42,0.15)",
              boxShadow: "0 4px 24px rgba(13,30,46,0.07)",
              borderRadius: "20px",
              padding: "2rem",
            }}>
              <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--navy-deepest)", fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600 }}>Resultados del Diagnóstico</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted-light)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Demo · Empresa tipo</span>
              </div>

              {metrics.map((m, i) => (
                <div key={m.label} style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ color: "var(--navy-deepest)", fontSize: "0.875rem", fontWeight: 500 }}>{m.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: statusColors[m.status as keyof typeof statusColors], fontWeight: 600 }}>
                        {Math.round(bars[i])}%
                      </span>
                      <span
                        className={`badge badge-${m.status}`}
                        style={{ fontSize: "0.6rem", padding: "0.2rem 0.5rem" }}
                      >
                        <span style={{ color: statusColors[m.status as keyof typeof statusColors] }}>{statusDot[m.status as keyof typeof statusDot]}</span>
                        {m.statusLabel}
                      </span>
                    </div>
                  </div>
                  {/* Bar */}
                  <div style={{
                    height: "6px",
                    background: "rgba(13,30,46,0.08)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${bars[i]}%`,
                      background: `linear-gradient(90deg, ${statusColors[m.status as keyof typeof statusColors]}, ${statusColors[m.status as keyof typeof statusColors]}aa)`,
                      borderRadius: "3px",
                      transition: "width 0.05s linear",
                      boxShadow: `0 0 8px ${statusColors[m.status as keyof typeof statusColors]}66`,
                    }} />
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div style={{ borderTop: "1px solid rgba(13,30,46,0.1)", paddingTop: "1rem", marginTop: "0.5rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                {[
                  { s: "ok", l: "Adecuado" },
                  { s: "warn", l: "Requiere atención" },
                  { s: "crit", l: "Prioritario" },
                ].map(({ s, l }) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: statusColors[s as keyof typeof statusColors] }} />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted-light)" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom statement */}
            <div style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(184,149,42,0.07)", border: "1px solid rgba(184,149,42,0.15)", borderRadius: "12px" }}>
              <p style={{ color: "var(--navy-deepest)", fontFamily: "var(--font-display)", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.6 }}>
                "No se trata solamente de decir qué le duele a la empresa. Se trata de <span style={{ color: "var(--gold-mid)", fontStyle: "normal", fontWeight: 600 }}>comenzar a resolverlo.</span>"
              </p>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <a
                href="#contacto"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" }); }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                Solicitar mi diagnóstico
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #diagnostico .container > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
