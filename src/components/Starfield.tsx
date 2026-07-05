'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Theme = 'light' | 'dark';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  hue: number;
  glow: boolean;
}

interface ShootingStar {
  x: number; y: number;
  dx: number; dy: number;
  life: number;
  maxLife: number;
  hue: number;
}

function useThemeDetect(): Theme {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const root = document.documentElement;
    setTheme((root.dataset.theme as Theme) ?? 'light');
    const obs = new MutationObserver(() => setTheme((document.documentElement.dataset.theme as Theme) ?? 'light'));
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

function createParticles(w: number, h: number, count: number): Particle[] {
  const darkHues = [220, 240, 0, 260, 200, 180, 0, 0, 0, 280];
  const lightHues = [45, 30, 15, 0, 340, 50, 35, 20, 10, 330];
  return Array.from({ length: count }, (_, i) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    size: Math.random() * 3 + 0.5,
    alpha: Math.random() * 0.7 + 0.3,
    baseAlpha: Math.random() * 0.7 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.4 + 0.1,
    hue: darkHues[i % darkHues.length],
    glow: Math.random() > 0.7,
  }));
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shootingRef = useRef<ShootingStar[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);
  const theme = useThemeDetect();
  const isDark = theme === 'dark';

  const spawnShootingStar = useCallback((w: number, h: number) => {
    const angle = Math.PI / 5 + (Math.random() - 0.5) * Math.PI / 2.5;
    const speed = 12 + Math.random() * 10;
    shootingRef.current.push({
      x: Math.random() * w,
      y: Math.random() * h * 0.2,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      life: 0,
      maxLife: (Math.min(w, h) / speed) * (0.4 + Math.random() * 0.3),
      hue: Math.random() > 0.5 ? 220 : 280,
    });
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      const count = isDark
        ? Math.min(Math.floor((c.width * c.height) / 3500), 400)
        : Math.min(Math.floor((c.width * c.height) / 5000), 300);
      particlesRef.current = createParticles(c.width, c.height, count);
    };
    resize();
    window.addEventListener('resize', resize);

    let ssTimer = 0;
    let lastTime = 0;

    const draw = (time: number) => {
      if (!c || !ctx) return;
      const dt = lastTime ? Math.min((time - lastTime) / 16.67, 3) : 1;
      lastTime = time;
      const w = c.width, h = c.height;
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const px = w * mx, py = h * my;

      ctx.clearRect(0, 0, w, h);

      const parts = particlesRef.current;

      if (isDark) {
        // draw connections
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const dx = parts[i].x - parts[j].x;
            const dy = parts[i].y - parts[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const alpha = (1 - dist / 150) * 0.12;
              ctx.beginPath();
              ctx.moveTo(parts[i].x, parts[i].y);
              ctx.lineTo(parts[j].x, parts[j].y);
              ctx.strokeStyle = `hsla(220, 40%, 80%, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        for (const p of parts) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < -10) p.x += w + 20;
          if (p.x > w + 10) p.x -= w + 20;
          if (p.y < -10) p.y += h + 20;
          if (p.y > h + 10) p.y -= h + 20;

          p.phase += p.speed * dt * 0.025;
          const twinkle = Math.sin(p.phase) * 0.4 + 0.6;

          const dx = p.x - px, dy = p.y - py;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);
          let mouseGlow = 0;
          if (mouseDist < 200) {
            mouseGlow = (1 - mouseDist / 200) * 0.5;
            const force = 0.02 * (1 - mouseDist / 200);
            p.x -= dx * force * dt;
            p.y -= dy * force * dt;
          }

          const alpha = Math.min(1, p.baseAlpha * twinkle + mouseGlow);
          const size = p.size + mouseGlow * 2;

          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          const color = p.hue === 0
            ? `rgba(255, 255, 255, ${alpha})`
            : `hsla(${p.hue}, 50%, 75%, ${alpha * 0.8})`;
          ctx.fillStyle = color;
          ctx.fill();

          if (p.glow && size > 1.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue || 220}, 60%, 80%, ${alpha * 0.08})`;
            ctx.fill();
          }
        }

        ssTimer += dt;
        if (ssTimer > 80 + Math.random() * 120 && shootingRef.current.length < 3) {
          spawnShootingStar(w, h);
          ssTimer = 0;
        }

        for (let i = shootingRef.current.length - 1; i >= 0; i--) {
          const ss = shootingRef.current[i];
          ss.life += dt;
          if (ss.life >= ss.maxLife) { shootingRef.current.splice(i, 1); continue; }
          ss.x += ss.dx * dt;
          ss.y += ss.dy * dt;
          const prog = ss.life / ss.maxLife;
          const al = Math.max(0, 1 - prog);

          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(ss.x - ss.dx * 5, ss.y - ss.dy * 5);
          ctx.strokeStyle = `hsla(${ss.hue}, 100%, 90%, ${al * 0.9})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${ss.hue}, 100%, 95%, ${al})`;
          ctx.fill();
        }
      } else {
        for (let i = 0; i < parts.length; i++) {
          for (let j = i + 1; j < parts.length; j++) {
            const dx = parts[i].x - parts[j].x;
            const dy = parts[i].y - parts[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const alpha = (1 - dist / 120) * 0.08;
              ctx.beginPath();
              ctx.moveTo(parts[i].x, parts[i].y);
              ctx.lineTo(parts[j].x, parts[j].y);
              ctx.strokeStyle = `hsla(40, 40%, 60%, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        for (const p of parts) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < -30) p.x = w + 30;
          if (p.x > w + 30) p.x = -30;
          if (p.y < -30) p.y = h + 30;
          if (p.y > h + 30) p.y = -30;

          p.vx += (Math.random() - 0.5) * 0.008 * dt;
          p.vy += (Math.random() - 0.5) * 0.008 * dt;
          p.vx = Math.max(-0.25, Math.min(0.25, p.vx));
          p.vy = Math.max(-0.25, Math.min(0.25, p.vy));

          p.phase += p.speed * dt * 0.02;
          const pulse = Math.sin(p.phase) * 0.25 + 0.75;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 40%, 75%, ${p.baseAlpha * 0.45 * pulse})`;
          ctx.fill();

          if (p.glow) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 30%, 80%, ${p.baseAlpha * 0.08 * pulse})`;
            ctx.fill();
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDark, spawnShootingStar]);

  if (!isDark) return null;

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0" style={{ zIndex: -2 }} aria-hidden />
  );
}
