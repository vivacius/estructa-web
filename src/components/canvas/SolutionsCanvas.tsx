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
    let radarAngle = 0;

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
    let logoVx = 0.4;
    let logoVy = 0.22;

    // 4 Fluid architectural solution ribbons tailored for LIGHT luxury background
    const ribbons: WaveRibbon[] = [
      {
        amplitude: 36,
        frequency: 0.0024,
        speed: 0.008,
        phase: 0,
        yRatio: 0.32,
        color: "rgba(184, 149, 42, 0.34)", // Primary Gold
        lineWidth: 1.8,
      },
      {
        amplitude: 48,
        frequency: 0.0018,
        speed: -0.006,
        phase: Math.PI * 0.35,
        yRatio: 0.68,
        color: "rgba(9, 21, 35, 0.12)", // Soft Deep Navy
        lineWidth: 1.6,
      },
      {
        amplitude: 30,
        frequency: 0.003,
        speed: 0.01,
        phase: Math.PI * 0.75,
        yRatio: 0.5,
        color: "rgba(201, 168, 76, 0.26)", // Pale Gold
        lineWidth: 1.3,
      },
      {
        amplitude: 40,
        frequency: 0.002,
        speed: -0.008,
        phase: Math.PI * 1.2,
        yRatio: 0.78,
        color: "rgba(143, 114, 30, 0.28)", // Deep Gold
        lineWidth: 1.4,
      },
    ];

    // Constellation / Telemetry nodes
    const nodeCount = 22;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulse: number;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 650),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.4 + Math.random() * 2,
        alpha: 0.25 + Math.random() * 0.45,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxRadius = Math.min(width, height) * 0.46;

      // 1. RADAR: Concentric Coordinate Rings
      const ringCount = 4;
      for (let r = 1; r <= ringCount; r++) {
        const radius = (maxRadius / ringCount) * r;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(184, 149, 42, 0.1)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. RADAR: Fine Crosshair Axes
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.strokeStyle = "rgba(184, 149, 42, 0.07)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. RADAR: Subtle Rotating Radar Sweep
      radarAngle += 0.007;
      const sweepGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      sweepGradient.addColorStop(0, "rgba(184, 149, 42, 0.08)");
      sweepGradient.addColorStop(0.7, "rgba(184, 149, 42, 0.02)");
      sweepGradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, radarAngle - 0.4, radarAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Sweep front line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(radarAngle) * maxRadius, centerY + Math.sin(radarAngle) * maxRadius);
      ctx.strokeStyle = "rgba(184, 149, 42, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 4. DYNAMIC PIVOTING & BREATHING LOGO WATERMARK
      if (logoLoaded && logoImg && logoImg.width > 0) {
        ctx.save();

        // Autonomous wandering movement across canvas
        logoX += logoVx;
        logoY += logoVy;

        // Soft magnetic pull toward mouse
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = mouse.x - logoX;
          const mdy = mouse.y - logoY;
          logoX += mdx * 0.007;
          logoY += mdy * 0.007;
        }

        // Breathing scale (crecer y decrecer)
        const breathingScale = 1 + Math.sin(time * 1.1) * 0.12;

        // Pivoting rotation oscillation
        const pivotAngle = Math.sin(time * 0.8) * 0.08;

        const baseTargetWidth = Math.min(width * 0.58, 640);
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

        // Watermark opacity tuned for warm light ivory background
        ctx.globalAlpha = 0.08 + Math.sin(time * 1.1) * 0.02;
        ctx.drawImage(logoImg, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

        ctx.restore();
      }

      // 5. FLUID ARCHITECTURAL HARMONIC RIBBONS
      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        const baseY = height * ribbon.yRatio;
        const step = 22;

        for (let x = 0; x <= width + step; x += step) {
          // Subtle mouse wave repulsion
          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let mouseDisplacement = 0;
          if (dist < 180 && dist > 0) {
            mouseDisplacement = Math.sin((dist / 180) * Math.PI) * 16 * (dy > 0 ? 1 : -1);
          }

          const waveY =
            baseY +
            Math.sin(x * ribbon.frequency + ribbon.phase + time * ribbon.speed * 60) * ribbon.amplitude +
            Math.cos(x * ribbon.frequency * 0.5 + time * 0.2) * (ribbon.amplitude * 0.35) +
            mouseDisplacement;

          if (x === 0) {
            ctx.moveTo(x, waveY);
          } else {
            ctx.lineTo(x, waveY);
          }
        }

        ctx.strokeStyle = ribbon.color;
        ctx.lineWidth = ribbon.lineWidth;
        ctx.stroke();
      });

      // 6. TELEMETRY NODES & CONSTELLATION MESH
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Proximity lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(184, 149, 42, ${(1 - dist / 130) * 0.14})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw node dot
        const currentR = n.radius + Math.sin(n.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 149, 42, ${n.alpha * (0.6 + Math.sin(n.pulse) * 0.3)})`;
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
