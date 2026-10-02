import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--navy-deepest)",
      borderTop: "1px solid rgba(184,149,42,0.15)",
      padding: "3rem 0 2rem",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}>
          <div>
            <div style={{ marginBottom: "1.2rem" }}>
              <Image
                src="/images/logo.png"
                alt="ESTRUCTA"
                width={150}
                height={45}
                style={{
                  height: "36px",
                  width: "auto",
                  filter: "brightness(0) invert(1)",
                  display: "block",
                }}
              />
            </div>
            <p style={{ color: "var(--text-muted-dark)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "280px" }}>
              Firma de soluciones empresariales integrales. Legal · Finanzas · Estrategia · Tecnología.
            </p>
          </div>
          <div>
            <h4 style={{ color: "var(--gold-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>Navegación</h4>
            {["Qué hacemos", "Diagnóstico 360°", "Soluciones", "Contacto"].map(l => (
              <div key={l} style={{ marginBottom: "0.6rem" }}>
                <span style={{ color: "var(--text-muted-dark)", fontSize: "0.875rem", cursor: "pointer" }}>{l}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: "var(--gold-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>Soluciones</h4>
            {["Control Financiero Pyme", "Cartera Inteligente", "Gerencia con Datos", "Empresa en Regla", "Digitalización Administrativa"].map(l => (
              <div key={l} style={{ marginBottom: "0.6rem" }}>
                <span style={{ color: "var(--text-muted-dark)", fontSize: "0.875rem" }}>{l}</span>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: "var(--gold-mid)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1rem" }}>Contacto</h4>
            <p style={{ color: "var(--text-muted-dark)", fontSize: "0.875rem", lineHeight: 1.8, marginBottom: "0.5rem" }}>
              Atención directa y diagnóstico:
            </p>
            <a
              href="https://wa.me/573013555173"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--ivory)", fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}
            >
              <span style={{ color: "#25D366" }}>●</span> Canal de WhatsApp Directo
            </a>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(184,149,42,0.1)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ color: "var(--text-muted-dark)", fontSize: "0.75rem" }}>
            © 2025 ESTRUCTA · Soluciones Empresariales. Todos los derechos reservados.
          </p>
          <p style={{ color: "var(--text-muted-dark)", fontSize: "0.75rem" }}>
            Legal · Finanzas · Estrategia · Tecnología
          </p>
        </div>
      </div>
    </footer>
  );
}
