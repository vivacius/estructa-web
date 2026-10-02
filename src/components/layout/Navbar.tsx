"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#que-hacemos", label: "Servicios", id: "que-hacemos" },
  { href: "#diagnostico", label: "Diagnóstico", id: "diagnostico" },
  { href: "#soluciones", label: "Soluciones", id: "soluciones" },
  { href: "#nosotros", label: "Equipo", id: "nosotros" },
  { href: "#contacto", label: "Contacto", id: "contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");

  useEffect(() => {
    const sections = ["inicio", "que-hacemos", "diagnostico", "soluciones", "nosotros", "contacto"];

    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      // Section spy detection
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("inicio");
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: scrolled ? "0.75rem" : "1.25rem",
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            width: "100%",
            maxWidth: "1180px",
            background: scrolled
              ? "rgba(9, 21, 35, 0.94)"
              : "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(184, 149, 42, 0.25)"
              : "1px solid rgba(184, 149, 42, 0.2)",
            boxShadow: scrolled
              ? "0 12px 32px rgba(0, 0, 0, 0.28), 0 2px 8px rgba(184, 149, 42, 0.15)"
              : "0 8px 30px rgba(13, 30, 46, 0.06), 0 2px 8px rgba(184, 149, 42, 0.08)",
            borderRadius: "9999px",
            padding: "0.55rem 1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.4s ease",
          }}
        >
          {/* Logo — Clicking takes you smoothly to hero / top */}
          <a
            href="#inicio"
            onClick={handleLogoClick}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              cursor: "pointer",
            }}
            title="Ir al inicio"
          >
            <Image
              src="/images/logo.png"
              alt="ESTRUCTA · Soluciones Empresariales"
              width={160}
              height={44}
              priority
              style={{
                height: "38px",
                width: "auto",
                transition: "filter 0.3s ease, transform 0.2s ease",
                filter: scrolled ? "brightness(0) invert(1)" : "none",
              }}
            />
          </a>

          {/* Desktop Navigation Links with Live Section Spy Tracker */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "2.2rem" }}
            className="hide-mobile"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  style={{
                    color: isActive
                      ? "var(--gold-mid)"
                      : scrolled
                      ? "rgba(240, 237, 232, 0.85)"
                      : "var(--navy-deepest)",
                    fontSize: "0.82rem",
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transition: "all 0.2s ease",
                    position: "relative",
                    textDecoration: "none",
                    padding: "0.25rem 0",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#B8952A";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = scrolled
                        ? "rgba(240, 237, 232, 0.85)"
                        : "var(--navy-deepest)";
                    }
                  }}
                >
                  {link.label}

                  {/* Active Section Underline Indicator */}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "18px",
                        height: "2px",
                        background: "var(--gold-mid)",
                        borderRadius: "2px",
                        boxShadow: "0 0 8px rgba(184,149,42,0.8)",
                      }}
                    />
                  )}
                </a>
              );
            })}

            {/* CTA Button in Navbar */}
            <a
              href="#contacto"
              onClick={(e) => handleNav(e, "#contacto")}
              className="btn btn-primary"
              style={{
                padding: "0.52rem 1.4rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                borderRadius: "9999px",
                boxShadow: "0 4px 14px rgba(184, 149, 42, 0.25)",
              }}
            >
              Conversemos
            </a>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile-only"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Abrir Menú"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: scrolled ? "#FFFFFF" : "#091523",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(5px,5px)"
                      : i === 1
                      ? "opacity: 0"
                      : "rotate(-45deg) translate(5px,-5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(9, 21, 35, 0.98)",
            backdropFilter: "blur(24px)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            padding: "2rem",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <Image
              src="/images/logo.png"
              alt="ESTRUCTA"
              width={160}
              height={44}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              style={{
                color: activeSection === link.id ? "var(--gold-mid)" : "var(--ivory)",
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={(e) => handleNav(e, "#contacto")}
            className="btn btn-primary"
            style={{
              marginTop: "1rem",
              padding: "0.85rem 2rem",
              fontSize: "0.95rem",
            }}
          >
            Conversemos sobre tu empresa
          </a>
        </div>
      )}
    </>
  );
}
