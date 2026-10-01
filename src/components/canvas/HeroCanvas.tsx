"use client";
import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  label?: string;
  isPillar?: boolean;
  color: string;
  pulsePhase: number;
}

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  alpha: number;
  waveIndex: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

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
      initNodes();
    };

    // Strategic pillars shown on key nodes
    const pillarLabels = ["LEGAL", "FINANZAS", "ESTRATEGIA", "TECNOLOGÍA", "DATOS 360°"];
    let nodes: Node[] = [];
    let particles: Particle[] = [];

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.floor(Math.max(12, Math.min(26, width / 45)));

      for (let i = 0; i < nodeCount; i++) {
        const isPillar = i < pillarLabels.length;
        nodes.push({
          x: (width / (nodeCount + 1)) * (i + 1) + (Math.random() - 0.5) * 60,
          y: height * 0.25 + Math.random() * (height * 0.55),
          vx: (Math.random() * 0.35 + 0.15) * (Math.random() > 0.4 ? 1 : -0.7),
          vy: (Math.random() - 0.5) * 0.25,
          radius: isPillar ? 4.5 : Math.random() * 2 + 1.5,
          baseRadius: isPillar ? 4.5 : Math.random() * 2 + 1.5,
          label: isPillar ? pillarLabels[i] : undefined,
          isPillar,
          color: isPillar ? "#B8952A" : "rgba(13,30,46,0.35)",
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Horizontal streaming particles along the wave lines
      particles = [];
      const particleCount = Math.min(45, Math.floor(width / 25));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          speed: Math.random() * 1.2 + 0.6,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.7 + 0.2,
          waveIndex: Math.floor(Math.random() * 3),
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    handleResize();

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. HORIZONTAL FLOWING HARMONIC WAVES (Exotic Fluid Ribbons)
      const waveConfigs = [
        {
          amplitude: 38,
          frequency: 0.0035,
          speed: 0.7,
          color: "rgba(184, 149, 42, 0.18)", // Gold primary
          lineWidth: 2,
          offsetY: height * 0.48,
          glow: true,
        },
        {
          amplitude: 52,
          frequency: 0.0028,
          speed: -0.5,
          color: "rgba(201, 168, 76, 0.14)", // Pale gold
          lineWidth: 1.5,
          offsetY: height * 0.54,
          glow: false,
        },
        {
          amplitude: 32,
          frequency: 0.0045,
          speed: 0.9,
          color: "rgba(9, 21, 35, 0.07)", // Deep navy subtle
          lineWidth: 1.2,
          offsetY: height * 0.62,
          glow: false,
        },
        {
          amplitude: 24,
          frequency: 0.005,
          speed: 1.1,
          color: "rgba(184, 149, 42, 0.24)", // Fine gold accent
          lineWidth: 1.8,
          offsetY: height * 0.42,
          glow: true,
        },
      ];

      waveConfigs.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          // Interactive distortion from mouse
          let mouseDist = 0;
          let mouseEffect = 0;
          if (mouse.active) {
            const dx = x - mouse.x;
            mouseDist = Math.abs(dx);
            if (mouseDist < 200) {
              mouseEffect = Math.cos((mouseDist / 200) * (Math.PI / 2)) * 30 * Math.sin(time * 3);
            }
          }

          const y =
            wave.offsetY +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.cos(x * 0.0018 + time * 0.4) * (wave.amplitude * 0.35) +
            mouseEffect;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.lineWidth;
        if (wave.glow) {
          ctx.shadowColor = "rgba(184, 149, 42, 0.4)";
          ctx.shadowBlur = 8;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. STREAMING HORIZONTAL PARTICLES (Data Stream)
      particles.forEach((p) => {
        p.x += p.speed;
        if (p.x > width + 20) {
          p.x = -20;
          p.y = height * 0.2 + Math.random() * (height * 0.6);
        }

        // Float particle on wave y
        const wave = waveConfigs[p.waveIndex % waveConfigs.length];
        const targetY =
          wave.offsetY +
          Math.sin(p.x * wave.frequency + time * wave.speed) * wave.amplitude;

        p.y += (targetY - p.y) * 0.05;

        // Draw particle with trail
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 149, 42, ${p.alpha})`;
        ctx.fill();

        // Horizontal velocity trail
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.speed * 8, p.y);
        ctx.strokeStyle = `rgba(184, 149, 42, ${p.alpha * 0.35})`;
        ctx.lineWidth = p.size * 0.7;
        ctx.stroke();
      });

      // 3. CONSTELLATION INTERCONNECTIONS (Architectural Filaments)
      const maxConnectDistance = Math.min(180, width * 0.18);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const alpha = (1 - dist / maxConnectDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            // If either node is a strategic pillar, color the link with gold
            if (nodes[i].isPillar || nodes[j].isPillar) {
              ctx.strokeStyle = `rgba(184, 149, 42, ${alpha * 1.5})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = `rgba(13, 30, 46, ${alpha * 0.4})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();

            // Occasional traveling data pulse along line
            const pulse = (time * 1.5 + (i + j)) % 1;
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulse;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulse;
            ctx.beginPath();
            ctx.arc(px, py, 1.4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(184, 149, 42, 0.7)";
            ctx.fill();
          }
        }
      }

      // 4. DRAW NODES & LABELS
      nodes.forEach((node) => {
        // Physics & drifting
        node.x += node.vx;
        node.y += node.vy;
        node.pulsePhase += 0.03;

        // Bounce / wrap horizontal
        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < height * 0.15 || node.y > height * 0.85) {
          node.vy *= -1;
        }

        // Mouse attraction
        if (mouse.active) {
          const mdx = mouse.x - node.x;
          const mdy = mouse.y - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160 && mdist > 5) {
            const force = (1 - mdist / 160) * 0.8;
            node.x += (mdx / mdist) * force;
            node.y += (mdy / mdist) * force;
          }
        }

        // Pulse size
        const pulse = Math.sin(node.pulsePhase) * 1.5;
        const currentRadius = Math.max(1, node.baseRadius + (node.isPillar ? pulse : 0));

        // Draw halo for pillar nodes
        if (node.isPillar) {
          const haloGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            2,
            node.x,
            node.y,
            currentRadius * 5
          );
          haloGrad.addColorStop(0, "rgba(184, 149, 42, 0.35)");
          haloGrad.addColorStop(0.6, "rgba(201, 168, 76, 0.12)");
          haloGrad.addColorStop(1, "rgba(184, 149, 42, 0)");

          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 5, 0, Math.PI * 2);
          ctx.fillStyle = haloGrad;
          ctx.fill();

          // Outer glowing ring
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius * 2.8, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(184, 149, 42, 0.4)";
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.isPillar ? "rgba(184, 149, 42, 0.6)" : "transparent";
        ctx.shadowBlur = node.isPillar ? 10 : 0;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pillar Labels (Crisp, High-end Architectural typography)
        if (node.label && width > 768) {
          ctx.font = "600 9px 'Inter', sans-serif";
          ctx.fillStyle = "#091523";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";

          // Micro badge pill behind text
          const textMetrics = ctx.measureText(node.label);
          const badgeWidth = textMetrics.width + 14;
          const badgeHeight = 16;
          const badgeX = node.x - badgeWidth / 2;
          const badgeY = node.y - currentRadius - badgeHeight - 4;

          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.strokeStyle = "rgba(184, 149, 42, 0.3)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 4);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#091523";
          ctx.fillText(node.label, node.x, badgeY + 12);
        }
      });

      // 5. AMBIENT MOUSE LIGHTING SPOTLIGHT
      if (mouse.active) {
        const mouseGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180
        );
        mouseGrad.addColorStop(0, "rgba(184, 149, 42, 0.12)");
        mouseGrad.addColorStop(0.5, "rgba(201, 168, 76, 0.04)");
        mouseGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fillStyle = mouseGrad;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
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
        opacity: 0.95,
      }}
    />
  );
}
