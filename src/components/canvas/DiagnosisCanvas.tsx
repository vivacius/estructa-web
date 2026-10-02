"use client";
import React, { useEffect, useRef } from "react";

export default function DiagnosisCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let angle = 0;
    let time = 0;

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || 600;
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

    // Dynamic wandering & pivoting logo state
    let logoX = (width || 1200) * 0.5;
    let logoY = (height || 600) * 0.48;
    let logoVx = 0.45;
    let logoVy = 0.28;

    // Diagnostic telemetry nodes
    const nodeCount = 24;
    const nodes: { x: number; y: number; baseRadius: number; pulse: number; speed: number; alpha: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 600),
        baseRadius: 1.5 + Math.random() * 2,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        alpha: 0.25 + Math.random() * 0.45,
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
      const maxRadius = Math.min(width, height) * 0.48;

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

        // Breathing scale (crecer y decrecer)
        const breathingScale = 1 + Math.sin(time * 1.1) * 0.13;

        // Pivoting rotation oscillation
        const pivotAngle = Math.sin(time * 0.8) * 0.08;

        const baseTargetWidth = Math.min(width * 0.58, 650);
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

        // Watermark opacity tuned for dark navy background
        ctx.globalAlpha = 0.12 + Math.sin(time * 1.1) * 0.035;
        ctx.drawImage(logoImg, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

        ctx.restore();
      }

      // 2. Concentric Diagnostic Coordinate Rings
      const ringCount = 4;
      for (let r = 1; r <= ringCount; r++) {
        const radius = (maxRadius / ringCount) * r;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(184, 149, 42, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Fine Crosshair Axes
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.strokeStyle = "rgba(184, 149, 42, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Subtle Rotating Radar Sweep
      angle += 0.008;
      const sweepGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      sweepGradient.addColorStop(0, "rgba(184, 149, 42, 0.12)");
      sweepGradient.addColorStop(0.7, "rgba(184, 149, 42, 0.03)");
      sweepGradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, angle - 0.4, angle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Sweep front line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
      ctx.strokeStyle = "rgba(245, 215, 127, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 5. Telemetry Metric Nodes & Constellation Links
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulse += n.speed;

        // Subtle mouse repulsion
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          n.x += (dx / dist) * 1.5;
          n.y += (dy / dist) * 1.5;
        }

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const ndx = n.x - n2.x;
          const ndy = n.y - n2.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);
          if (nDist < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(184, 149, 42, ${(1 - nDist / 140) * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Node circle
        const currentRadius = n.baseRadius + Math.sin(n.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 149, 42, ${n.alpha * (0.6 + Math.sin(n.pulse) * 0.4)})`;
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
