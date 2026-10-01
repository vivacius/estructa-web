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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: scrolled ? "rgba(8,20,32,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,149,42,0.12)" : "none",
          padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <div style={{ 
              background: scrolled ? "transparent" : "rgba(248,245,239,0.95)",
              borderRadius: "8px",
              padding: scrolled ? "0" : "6px 12px",
              transition: "all 0.4s ease",
            }}>
              <Image
                src="/images/logo.png"
                alt="ESTRUCTA - Soluciones Empresariales"
                width={180}
                height={54}
                priority
                style={{ 
                  height: scrolled ? "42px" : "50px", 
                  width: "auto",
                  transition: "all 0.4s ease",
                  filter: scrolled ? "brightness(0) invert(1)" : "none",
                }}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hide-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  color: scrolled ? "rgba(240,237,232,0.9)" : "var(--navy-deepest)",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "rgba(240,237,232,0.9)" : "var(--navy-deepest)")}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleNav(e, "#contacto")}
              className="btn btn-primary"
              style={{ padding: "0.6rem 1.4rem", fontSize: "0.75rem" }}
            >
              Conversemos
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile-only"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              padding: "8px",
              background: "transparent",
            }}
            aria-label="Menú"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  background: "#C9A84C",
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                    : i === 1 ? "opacity: 0"
                    : "rotate(-45deg) translate(5px,-5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(9,21,35,0.98)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNav(e, link.href)}
            style={{
              color: "var(--ivory)",
              fontFamily: "var(--font-display)",
              fontSize: "1.8rem",
              fontWeight: 600,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ivory)")}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={(e) => handleNav(e, "#contacto")}
          className="btn btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Conversemos
        </a>
      </div>
    </>
  );
}
