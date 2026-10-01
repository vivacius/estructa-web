"use client";
import React, { useEffect, useRef } from "react";

interface Wave {
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  lineWidth: number;
  offsetYRatio: number;
  glowColor?: string;
  glowBlur?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  size: number;
  alpha: number;
  waveIndex: number;
  hue: string;
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label?: string;
  color: string;
  pulse: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Mouse state
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      down: false,
    };

    const ripples: Ripple[] = [];

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initScene();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.65,
      });
    };

    // Strategic pillars anchored along the horizontal canvas
    const labels = ["LEGAL", "FINANZAS", "ESTRATEGIA", "TECNOLOGÍA", "INTELIGENCIA 360°"];
    let nodes: NodePoint[] = [];
    let particles: Particle[] = [];

    // Waves definition
    const waves: Wave[] = [
      {
        amplitude: 35,
        frequency: 0.0028,
        speed: 0.8,
        color: "rgba(184, 149, 42, 0.28)", // Primary Gold
        lineWidth: 2.2,
        offsetYRatio: 0.52,
        glowColor: "rgba(184, 149, 42, 0.45)",
        glowBlur: 10,
      },
      {
        amplitude: 48,
        frequency: 0.0022,
        speed: -0.6,
        color: "rgba(201, 168, 76, 0.2)", // Pale Gold
        lineWidth: 1.6,
        offsetYRatio: 0.48,
      },
      {
        amplitude: 28,
        frequency: 0.0042,
        speed: 1.1,
        color: "rgba(9, 21, 35, 0.12)", // Deep Navy filament
        lineWidth: 1.4,
        offsetYRatio: 0.58,
      },
      {
        amplitude: 60,
        frequency: 0.0018,
        speed: 0.4,
        color: "rgba(184, 149, 42, 0.15)", // Broad golden sweep
        lineWidth: 1.2,
        offsetYRatio: 0.44,
      },
      {
        amplitude: 20,
        frequency: 0.0055,
        speed: -0.9,
        color: "rgba(212, 185, 106, 0.3)", // Vibrant gold accent
        lineWidth: 1.8,
        offsetYRatio: 0.55,
        glowColor: "rgba(212, 185, 106, 0.5)",
        glowBlur: 8,
      },
    ];

    const initScene = () => {
      // Create Nodes
      nodes = [];
      const nodeCount = Math.max(8, Math.min(18, Math.floor(width / 75)));

      for (let i = 0; i < nodeCount; i++) {
        const isLabeled = i < labels.length;
        const segmentX = (width / (labels.length + 1)) * (i + 1);
        const x = isLabeled ? segmentX + (Math.random() - 0.5) * 50 : Math.random() * width;
        const y = height * 0.3 + Math.random() * (height * 0.45);

        nodes.push({
          x,
          y,
          vx: (Math.random() * 0.3 + 0.1) * (Math.random() > 0.35 ? 1 : -0.8),
          vy: (Math.random() - 0.5) * 0.25,
          radius: isLabeled ? 4.5 : Math.random() * 2 + 1.5,
          label: isLabeled ? labels[i] : undefined,
          color: isLabeled ? "#B8952A" : "rgba(13, 30, 46, 0.35)",
          pulse: Math.random() * Math.PI * 2,
        });
      }

      // Create Fast Horizontal Stream Particles
      particles = [];
      const count = Math.min(65, Math.floor(width / 20));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.random() * 1.6 + 0.8,
          size: Math.random() * 2.2 + 1,
          alpha: Math.random() * 0.65 + 0.25,
          waveIndex: Math.floor(Math.random() * waves.length),
          hue: Math.random() > 0.2 ? "184, 149, 42" : "9, 21, 35",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    handleResize();

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // --- 1. ARCHITECTURAL GRID ACCENTS & HORIZON CROSSHAIRS ---
      ctx.save();
      ctx.strokeStyle = "rgba(184, 149, 42, 0.06)";
      ctx.lineWidth = 1;
      const step = 80;
      for (let x = 0; x < width; x += step) {
        // Subtle vertical ticks
        ctx.beginPath();
        ctx.moveTo(x, height * 0.46);
        ctx.lineTo(x, height * 0.46 + 6);
        ctx.stroke();
      }
      ctx.restore();

      // --- 2. RIPPLE PROPAGATION ON CLICK ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4.5;
        r.alpha *= 0.965;

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184, 149, 42, ${r.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "rgba(184, 149, 42, 0.5)";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();

        if (r.alpha < 0.01 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // --- 3. EXOTIC HORIZONTAL HARMONIC WAVES ---
      waves.forEach((w) => {
        ctx.save();
        ctx.beginPath();

        const baseOffsetY = height * w.offsetYRatio;

        for (let x = 0; x <= width; x += 5) {
          // Mouse deflection
          let mouseDisplacement = 0;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dist = Math.abs(dx);
            if (dist < 260) {
              const factor = (1 - dist / 260);
              mouseDisplacement = Math.sin(factor * Math.PI) * 36 * Math.sin(time * 3);
            }
          }

          // Ripple effect
          let rippleDisplacement = 0;
          for (const rip of ripples) {
            const dx = x - rip.x;
            const dist = Math.abs(dx);
            if (Math.abs(dist - rip.radius) < 40) {
              rippleDisplacement += (1 - Math.abs(dist - rip.radius) / 40) * 16 * rip.alpha;
            }
          }

          const y =
            baseOffsetY +
            Math.sin(x * w.frequency + time * w.speed) * w.amplitude +
            Math.cos(x * (w.frequency * 0.6) + time * 0.3) * (w.amplitude * 0.4) +
            mouseDisplacement +
            rippleDisplacement;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.lineWidth;
        if (w.glowColor) {
          ctx.shadowColor = w.glowColor;
          ctx.shadowBlur = w.glowBlur || 8;
        }
        ctx.stroke();
        ctx.restore();
      });

      // --- 4. STREAMING PARTICLES WITH HORIZONTAL LIGHT TRAILS ---
      particles.forEach((p) => {
        p.x += p.vx;
        if (p.x > width + 30) {
          p.x = -30;
          p.y = height * 0.25 + Math.random() * (height * 0.5);
        }

        const wave = waves[p.waveIndex % waves.length];
        const targetY =
          height * wave.offsetYRatio +
          Math.sin(p.x * wave.frequency + time * wave.speed) * wave.amplitude;

        p.y += (targetY - p.y) * 0.08;

        // Particle Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
        ctx.fill();

        // Horizontal light speed trail
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 12, p.y);
        ctx.strokeStyle = `rgba(${p.hue}, ${p.alpha * 0.4})`;
        ctx.lineWidth = p.size * 0.8;
        ctx.stroke();
      });

      // --- 5. INTERCONNECTED CONSTELLATION MESH ---
      const maxDist = Math.min(220, width * 0.22);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const hasPillar = nodes[i].label || nodes[j].label;
            ctx.strokeStyle = hasPillar
              ? `rgba(184, 149, 42, ${alpha * 1.4})`
              : `rgba(9, 21, 35, ${alpha * 0.35})`;
            ctx.lineWidth = hasPillar ? 1.2 : 0.8;
            ctx.stroke();

            // Energy spark traveling between nodes
            const progress = (time * 1.2 + (i * 0.3 + j * 0.5)) % 1;
            const sx = nodes[i].x + (nodes[j].x - nodes[i].x) * progress;
            const sy = nodes[i].y + (nodes[j].y - nodes[i].y) * progress;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(184, 149, 42, 0.75)";
            ctx.fill();
          }
        }
      }

      // --- 6. NODES, CROSSHAIRS & STRATEGIC PILLARS ---
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.035;

        // Wrap around smoothly
        if (node.x < -40) node.x = width + 40;
        if (node.x > width + 40) node.x = -40;
        if (node.y < height * 0.2 || node.y > height * 0.8) {
          node.vy *= -1;
        }

        // Magnetic attraction to cursor
        if (mouse.active) {
          const mdx = mouse.x - node.x;
          const mdy = mouse.y - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 200 && mdist > 8) {
            const force = (1 - mdist / 200) * 1.2;
            node.x += (mdx / mdist) * force;
            node.y += (mdy / mdist) * force;
          }
        }

        const isPillar = !!node.label;
        const pulseVal = Math.sin(node.pulse);
        const radius = isPillar ? node.radius + pulseVal * 1.2 : node.radius;

        // Pillar Halo Ring
        if (isPillar) {
          ctx.save();
          // Outer halo
          const halo = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, 26);
          halo.addColorStop(0, "rgba(184, 149, 42, 0.4)");
          halo.addColorStop(0.6, "rgba(201, 168, 76, 0.1)");
          halo.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.beginPath();
          ctx.arc(node.x, node.y, 26, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();

          // Delicate dashed orbital ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(184, 149, 42, 0.45)";
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }

        // Node Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1.5, radius), 0, Math.PI * 2);
        ctx.fillStyle = isPillar ? "#B8952A" : node.color;
        if (isPillar) {
          ctx.shadowColor = "rgba(184, 149, 42, 0.7)";
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Architectural crosshair on pillar nodes
        if (isPillar) {
          ctx.save();
          ctx.strokeStyle = "rgba(184, 149, 42, 0.6)";
          ctx.lineWidth = 1;
          const arm = 6;
          ctx.beginPath();
          ctx.moveTo(node.x - arm, node.y);
          ctx.lineTo(node.x + arm, node.y);
          ctx.moveTo(node.x, node.y - arm);
          ctx.lineTo(node.x, node.y + arm);
          ctx.stroke();
          ctx.restore();
        }

      });

      // --- 7. AMBIENT MOUSE SPOTLIGHT GLOW ---
      if (mouse.active) {
        ctx.save();
        const mouseGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          240
        );
        mouseGlow.addColorStop(0, "rgba(184, 149, 42, 0.12)");
        mouseGlow.addColorStop(0.5, "rgba(201, 168, 76, 0.04)");
        mouseGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 240, 0, Math.PI * 2);
        ctx.fillStyle = mouseGlow;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
        zIndex: 1,
        cursor: "crosshair",
      }}
    />
  );
}
