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

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

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
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    // Load Logo for dynamic watermark animation
    const logoImg = typeof window !== "undefined" ? new window.Image() : null;
    let logoLoaded = false;
    if (logoImg) {
      logoImg.src = "/images/logo.png";
      logoImg.onload = () => {
        logoLoaded = true;
      };
    }

    // Dynamic autonomous wandering and pivoting logo state
    let logoX = (width || 1200) * 0.5;
    let logoY = (height || 650) * 0.48;
    let logoVx = 0.42;
    let logoVy = 0.24;

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
      time += 0.018;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // 1. DYNAMIC PIVOTING & BREATHING LOGO WATERMARK
      if (logoLoaded && logoImg && logoImg.width > 0) {
        ctx.save();

        // Autonomous wandering movement across canvas
        logoX += logoVx;
        logoY += logoVy;

        // Soft magnetic pull toward mouse
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = mouse.x - logoX;
          const mdy = mouse.y - logoY;
          logoX += mdx * 0.008;
          logoY += mdy * 0.008;
        }

        // Breathing scale (crecer / decrecer)
        const breathingScale = 1 + Math.sin(time * 1.2) * 0.12;

        // Pivoting rotation oscillation
        const pivotAngle = Math.sin(time * 0.85) * 0.08;

        const baseTargetWidth = Math.min(width * 0.55, 620);
        const targetWidth = baseTargetWidth * breathingScale;
        const aspectRatio = logoImg.height / logoImg.width;
        const targetHeight = targetWidth * aspectRatio;

        // Bounds bounce
        const padX = targetWidth * 0.35;
        const padY = targetHeight * 0.4;
        if (logoX < padX) {
          logoX = padX;
          logoVx = Math.abs(logoVx);
        } else if (logoX > width - padX) {
          logoX = width - padX;
          logoVx = -Math.abs(logoVx);
        }

        if (logoY < padY) {
          logoY = padY;
          logoVy = Math.abs(logoVy);
        } else if (logoY > height - padY) {
          logoY = height - padY;
          logoVy = -Math.abs(logoVy);
        }

        // Move to logo center, rotate to pivot, draw centered
        ctx.translate(logoX, logoY);
        ctx.rotate(pivotAngle);

        // Watermark opacity with gentle pulse
        ctx.globalAlpha = 0.13 + Math.sin(time * 1.2) * 0.04;
        ctx.drawImage(logoImg, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

        ctx.restore();
      }

      // 2. Draw Flowing Harmonic Solution Ribbons
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

      // 3. Animate and Render Solution Constellation Nodes & Connecting Threads
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
