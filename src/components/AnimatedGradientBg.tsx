"use client";

import { useEffect, useRef } from "react";

export function AnimatedGradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    const animate = () => {
      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.001;

      // Create moving gradient blobs
      const blobs = [
        {
          x: Math.sin(time) * canvas.width * 0.3 + canvas.width * 0.5,
          y: Math.cos(time * 0.7) * canvas.height * 0.3 + canvas.height * 0.3,
          color: "rgba(212, 166, 77, 0.08)",
          size: 300,
        },
        {
          x: Math.cos(time * 0.5) * canvas.width * 0.3 + canvas.width * 0.2,
          y: Math.sin(time * 0.3) * canvas.height * 0.3 + canvas.height * 0.7,
          color: "rgba(34, 86, 246, 0.06)",
          size: 350,
        },
      ];

      blobs.forEach((blob) => {
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.size);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
