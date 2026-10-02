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

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
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
    let logoVx = 0.55;
    let logoVy = 0.32;

    // 5 Fluid architectural solution ribbons tailored for LIGHT luxury background
    const ribbons: WaveRibbon[] = [
      {
        amplitude: 42,
        frequency: 0.0022,
        speed: 0.01,
        phase: 0,
        yRatio: 0.28,
        color: "rgba(184, 149, 42, 0.42)", // Primary Gold
        lineWidth: 2.2,
      },
      {
        amplitude: 54,
        frequency: 0.0016,
        speed: -0.008,
        phase: Math.PI * 0.35,
        yRatio: 0.65,
        color: "rgba(9, 21, 35, 0.16)", // Soft Deep Navy
        lineWidth: 2.0,
      },
      {
        amplitude: 34,
        frequency: 0.0028,
        speed: 0.012,
        phase: Math.PI * 0.75,
        yRatio: 0.45,
        color: "rgba(201, 168, 76, 0.34)", // Pale Gold
        lineWidth: 1.6,
      },
      {
        amplitude: 46,
        frequency: 0.0019,
        speed: -0.01,
        phase: Math.PI * 1.2,
        yRatio: 0.82,
        color: "rgba(143, 114, 30, 0.36)", // Deep Gold
        lineWidth: 1.8,
      },
      {
        amplitude: 28,
        frequency: 0.0035,
        speed: 0.015,
        phase: Math.PI * 1.6,
        yRatio: 0.18,
        color: "rgba(184, 149, 42, 0.28)", // High Gold Wave
        lineWidth: 1.4,
      },
    ];

    // Constellation / Telemetry nodes
    const nodeCount = 28;
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulse: number;
      detected: number;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 650),
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: 1.6 + Math.random() * 2.2,
        alpha: 0.3 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
        detected: 0,
      });
    }

    // Dynamic data packets (things appearing, traveling along lines, and disappearing)
    const packets: DataPacket[] = [];
    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const fromNode = Math.floor(Math.random() * nodes.length);
      let toNode = Math.floor(Math.random() * nodes.length);
      while (toNode === fromNode) {
        toNode = Math.floor(Math.random() * nodes.length);
      }
      const dx = nodes[fromNode].x - nodes[toNode].x;
      const dy = nodes[fromNode].y - nodes[toNode].y;
      if (Math.sqrt(dx * dx + dy * dy) < 180) {
        packets.push({
          fromNode,
          toNode,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          color: Math.random() > 0.4 ? "rgba(184, 149, 42, 0.9)" : "rgba(224, 185, 66, 0.95)",
        });
      }
    };

    // Expanding sonar radar waves
    const sonarPings: { radius: number; maxRadius: number; alpha: number; speed: number }[] = [];
    let pingTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Mouse smooth interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxRadius = Math.min(width, height) * 0.48;

      // Spawn periodic sonar pings
      pingTimer += 0.016;
      if (pingTimer > 2.8) {
        pingTimer = 0;
        sonarPings.push({
          radius: 10,
          maxRadius: maxRadius * 1.15,
          alpha: 0.4,
          speed: 2.2,
        });
      }

      // Render expanding sonar pings
      for (let p = sonarPings.length - 1; p >= 0; p--) {
        const ping = sonarPings[p];
        ping.radius += ping.speed;
        const progress = ping.radius / ping.maxRadius;
        ping.alpha = (1 - progress) * 0.35;

        if (progress >= 1) {
          sonarPings.splice(p, 1);
        } else {
          ctx.beginPath();
          ctx.arc(centerX, centerY, ping.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(184, 149, 42, ${ping.alpha})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      }

      // 1. RADAR: Concentric Coordinate Rings
      const ringCount = 4;
      for (let r = 1; r <= ringCount; r++) {
        const radius = (maxRadius / ringCount) * r;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(184, 149, 42, 0.12)";
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
      ctx.strokeStyle = "rgba(184, 149, 42, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. RADAR: Smooth Rotating Radar Sweep
      radarAngle += 0.009;
      const sweepGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      sweepGradient.addColorStop(0, "rgba(184, 149, 42, 0.14)");
      sweepGradient.addColorStop(0.5, "rgba(184, 149, 42, 0.05)");
      sweepGradient.addColorStop(0.9, "rgba(184, 149, 42, 0.01)");
      sweepGradient.addColorStop(1, "transparent");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, radarAngle - 0.45, radarAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGradient;
      ctx.fill();

      // Sweep front line with luminous tip
      const sweepX = centerX + Math.cos(radarAngle) * maxRadius;
      const sweepY = centerY + Math.sin(radarAngle) * maxRadius;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = "rgba(184, 149, 42, 0.38)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Luminous pulse at tip of radar
      ctx.beginPath();
      ctx.arc(sweepX, sweepY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(224, 185, 66, 0.6)";
      ctx.fill();
      ctx.restore();

      // 4. DYNAMIC PIVOTING & BREATHING LOGO WATERMARK
      if (logoLoaded && logoImg && logoImg.width > 0) {
        ctx.save();

        // Autonomous wandering movement across canvas with organic curvature
        logoX += logoVx + Math.sin(time * 0.7) * 0.2;
        logoY += logoVy + Math.cos(time * 0.6) * 0.15;

        // Soft magnetic pull toward mouse
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = mouse.x - logoX;
          const mdy = mouse.y - logoY;
          logoX += mdx * 0.009;
          logoY += mdy * 0.009;
        }

        // Breathing scale (crecer y decrecer)
        const breathingScale = 1 + Math.sin(time * 1.3) * 0.14;

        // Pivoting rotation oscillation (balanceo y pivote dinámico)
        const pivotAngle = Math.sin(time * 0.9) * 0.1;

        const baseTargetWidth = Math.min(width * 0.6, 680);
        const targetWidth = baseTargetWidth * breathingScale;
        const aspectRatio = logoImg.height / logoImg.width;
        const targetHeight = targetWidth * aspectRatio;

        // Bounds bounce with soft cushion
        const padX = targetWidth * 0.32;
        const padY = targetHeight * 0.38;
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

        // Ambient gold glow behind logo watermark
        const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, targetWidth * 0.45);
        haloGrad.addColorStop(0, "rgba(184, 149, 42, 0.07)");
        haloGrad.addColorStop(1, "transparent");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(0, 0, targetWidth * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Watermark opacity tuned for warm light ivory background
        ctx.globalAlpha = 0.09 + Math.sin(time * 1.2) * 0.025;
        ctx.drawImage(logoImg, -targetWidth / 2, -targetHeight / 2, targetWidth, targetHeight);

        ctx.restore();
      }

      // 5. FLUID ARCHITECTURAL HARMONIC RIBBONS
      ribbons.forEach((ribbon) => {
        ctx.beginPath();
        const baseY = height * ribbon.yRatio;
        const step = 20;

        for (let x = 0; x <= width + step; x += step) {
          // Dynamic mouse wave ripple
          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let mouseDisplacement = 0;
          if (dist < 220 && dist > 0) {
            mouseDisplacement = Math.sin((dist / 220) * Math.PI) * 22 * (dy > 0 ? 1 : -1);
          }

          const waveY =
            baseY +
            Math.sin(x * ribbon.frequency + ribbon.phase + time * ribbon.speed * 60) * ribbon.amplitude +
            Math.cos(x * ribbon.frequency * 0.6 + time * 0.25) * (ribbon.amplitude * 0.4) +
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
        n.pulse += 0.025;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Check if radar sweep just passed this node -> trigger detection flash
        const angleToNode = Math.atan2(n.y - centerY, n.x - centerX);
        const normSweep = ((radarAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const normNode = (angleToNode + Math.PI * 2) % (Math.PI * 2);
        const angleDiff = Math.abs(normSweep - normNode);
        if (angleDiff < 0.06) {
          n.detected = 1;
        } else {
          n.detected = Math.max(0, n.detected - 0.02);
        }

        // Proximity lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            const lineAlpha = (1 - dist / 140) * (0.16 + (n.detected + n2.detected) * 0.2);
            ctx.strokeStyle = `rgba(184, 149, 42, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw node dot with detection burst
        const currentR = n.radius + Math.sin(n.pulse) * 0.7 + n.detected * 2.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentR, 0, Math.PI * 2);
        const dotAlpha = Math.min(1, n.alpha * (0.65 + Math.sin(n.pulse) * 0.35) + n.detected * 0.5);
        ctx.fillStyle = `rgba(184, 149, 42, ${dotAlpha})`;
        ctx.fill();
      }

      // 7. TRAVELING DATA PULSES (Appear, travel, and disappear!)
      if (Math.random() < 0.05 && packets.length < 8) {
        spawnPacket();
      }

      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
        } else {
          const n1 = nodes[pkt.fromNode];
          const n2 = nodes[pkt.toNode];
          if (n1 && n2) {
            const px = n1.x + (n2.x - n1.x) * pkt.progress;
            const py = n1.y + (n2.y - n1.y) * pkt.progress;
            const pulseAlpha = Math.sin(pkt.progress * Math.PI); // Fades in, peaks at middle, fades out at end

            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(184, 149, 42, ${pulseAlpha * 0.9})`;
            ctx.fill();

            // Tiny trailing aura
            ctx.beginPath();
            ctx.arc(px, py, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(224, 185, 66, ${pulseAlpha * 0.35})`;
            ctx.fill();
          }
        }
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
