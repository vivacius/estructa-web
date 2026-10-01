"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#que-hacemos", label: "Qué hacemos" },
  { href: "#diagnostico", label: "Diagnóstico 360°" },
  { href: "#soluciones", label: "Soluciones" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
              ? "rgba(9, 21, 35, 0.92)"
              : "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid rgba(184, 149, 42, 0.25)"
              : "1px solid rgba(184, 149, 42, 0.2)",
            boxShadow: scrolled
              ? "0 12px 32px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(184, 149, 42, 0.15)"
              : "0 8px 30px rgba(13, 30, 46, 0.06), 0 2px 8px rgba(184, 149, 42, 0.08)",
            borderRadius: "9999px",
            padding: "0.6rem 1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.4s ease",
          }}
        >
          {/* Logo — Clean transparent blend, no clumsy box */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: "0.75rem",
            }}
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
                transition: "filter 0.3s ease",
                filter: scrolled ? "brightness(0) invert(1)" : "none",
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "2.2rem" }}
            className="hide-mobile"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  color: scrolled ? "rgba(240, 237, 232, 0.85)" : "var(--navy-deepest)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  transition: "all 0.2s ease",
                  position: "relative",
                  textDecoration: "none",
                  padding: "0.2rem 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#B8952A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled
                    ? "rgba(240, 237, 232, 0.85)"
                    : "var(--navy-deepest)";
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA Button in Navbar */}
            <a
              href="#contacto"
              onClick={(e) => handleNav(e, "#contacto")}
              className="btn btn-primary"
              style={{
                padding: "0.55rem 1.4rem",
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
            background: "rgba(9, 21, 35, 0.97)",
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
                color: "var(--ivory)",
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
