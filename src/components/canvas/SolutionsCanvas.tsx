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

    // 4 Fluid architectural solution ribbons tailored for LIGHT luxury background
    const ribbons: WaveRibbon[] = [
      {
        amplitude: 38,
        frequency: 0.0024,
        speed: 0.008,
        phase: 0,
        yRatio: 0.32,
        color: "rgba(184, 149, 42, 0.38)", // Primary Gold
        lineWidth: 2,
      },
      {
        amplitude: 50,
        frequency: 0.0018,
        speed: -0.006,
        phase: Math.PI * 0.35,
        yRatio: 0.68,
        color: "rgba(9, 21, 35, 0.14)", // Soft Deep Navy
        lineWidth: 1.8,
      },
      {
        amplitude: 30,
        frequency: 0.003,
        speed: 0.01,
        phase: Math.PI * 0.75,
        yRatio: 0.5,
        color: "rgba(201, 168, 76, 0.28)", // Pale Gold
        lineWidth: 1.4,
      },
      {
        amplitude: 42,
        frequency: 0.002,
        speed: -0.009,
        phase: Math.PI * 1.2,
        yRatio: 0.82,
        color: "rgba(184, 149, 42, 0.22)",
        lineWidth: 1.5,
      },
    ];

    // Floating solution geometric nodes
    const nodeCount = 24;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number; pulse: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 650),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 2 + Math.random() * 2.2,
        alpha: 0.35 + Math.random() * 0.45,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Flowing Harmonic Solution Ribbons
      ribbons.forEach((ribbon) => {
        ribbon.phase += ribbon.speed;
        const baseY = height * ribbon.yRatio;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          let y = baseY + Math.sin(x * ribbon.frequency + ribbon.phase) * ribbon.amplitude;

          // Mouse subtle wave ripple
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            y += Math.sin(dist * 0.04) * (1 - dist / 180) * 16;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.stroke();
      });

      // 2. Animate and Render Solution Constellation Nodes & Connecting Threads
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        // Wrap around boundaries
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Connect nearby nodes with fine gold threads
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(184, 149, 42, ${(1 - dist / 140) * 0.22})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw node
        const dynamicRadius = n.radius + Math.sin(n.pulse) * 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, dynamicRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 149, 42, ${n.alpha})`;
        ctx.fill();

        // Node halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, dynamicRadius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 149, 42, ${n.alpha * 0.2})`;
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
