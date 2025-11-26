import React, { useEffect, useRef } from 'react';

const Particles = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    let particles = [];
    let rafId;

    const focalLength = 400;
    const depth = 2000;
    const SPEED = 2;
    const BASE_COUNT = 600;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const colors = ['#4285F4', '#8AB4F8', '#a0c3ff', '#1a73e8'];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    class Particle {
      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.x = (Math.random() - 0.5) * width * 2;
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = initial ? Math.random() * depth : depth;
        this.velocity = SPEED + Math.random() * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 0.5;
      }

      update() {
        this.z -= this.velocity;
        if (this.z <= 1) this.reset();
      }

      draw() {
        const x = (this.x / this.z) * focalLength + width / 2;
        const y = (this.y / this.z) * focalLength + height / 2;

        const prevZ = this.z + this.velocity * 4;
        const prevX = (this.x / prevZ) * focalLength + width / 2;
        const prevY = (this.y / prevZ) * focalLength + height / 2;

        const scale = focalLength / this.z;
        const size = this.size * scale;

        let alpha = 1 - (this.z / depth);
        if (this.z < 200) alpha = this.z / 200;

        // apply parallax offset
        const offsetX = targetMouseX * (depth - this.z) * 0.2;
        const offsetY = targetMouseY * (depth - this.z) * 0.2;

        const pX = x + offsetX;
        const pY = y + offsetY;
        const pPrevX = prevX + offsetX;
        const pPrevY = prevY + offsetY;

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = size;
        ctx.globalAlpha = alpha;
        ctx.moveTo(pPrevX, pPrevY);
        ctx.lineTo(pX, pY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(pX, pY, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = Array.from({ length: BASE_COUNT }, () => new Particle(true));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      rafId = requestAnimationFrame(animate);
    };

    const handlePointer = (e) => {
      const point = e.touches ? e.touches[0] : e;
      targetMouseX = (point.clientX - width / 2) * 0.001;
      targetMouseY = (point.clientY - height / 2) * 0.001;
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    resize();
    initParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointer, { passive: true });
    window.addEventListener('touchmove', handlePointer, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('touchmove', handlePointer);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        style={{ background: "radial-gradient(circle at center, #ffffff 0%, #f8f9fa 100%)" }}
      />
    </div>
  );
};

export default Particles;
