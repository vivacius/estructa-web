"use client";
import React, { useEffect, useRef } from "react";

interface WaveRibbon {
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  yRatio: number;
  color: string;
  lineWidth: number;
}

export default function SolutionsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || 650;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    // 3 Fluid architectural solution ribbons
    const ribbons: WaveRibbon[] = [
      {
        amplitude: 36,
        frequency: 0.0022,
        speed: 0.007,
        phase: 0,
        yRatio: 0.35,
        color: "rgba(184, 149, 42, 0.16)",
        lineWidth: 1.8,
      },
      {
        amplitude: 45,
        frequency: 0.0018,
        speed: -0.005,
        phase: Math.PI * 0.4,
        yRatio: 0.65,
        color: "rgba(245, 215, 127, 0.12)",
        lineWidth: 1.5,
      },
      {
        amplitude: 28,
        frequency: 0.0028,
        speed: 0.009,
        phase: Math.PI * 0.8,
        yRatio: 0.5,
        color: "rgba(184, 149, 42, 0.1)",
        lineWidth: 1.2,
      },
    ];

    // Floating solution geometric nodes
    const nodeCount = 20;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 650),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.8 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.35,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // 1. Draw Flowing Harmonic Solution Ribbons
      ribbons.forEach((ribbon) => {
        ribbon.phase += ribbon.speed;
        const baseY = height * ribbon.yRatio;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 8) {
          // Base harmonic sine
          let y = baseY + Math.sin(x * ribbon.frequency + ribbon.phase) * ribbon.amplitude;

          // Mouse subtle ripple
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            y += Math.sin(dist * 0.05) * (1 - dist / 150) * 14;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.stroke();
      });

      // 2. Animate and Render Solution Constellation Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around boundaries
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(184, 149, 42, ${(1 - dist / 130) * 0.1})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 215, 127, ${n.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
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
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
