import { useEffect, useRef } from "react";

const CONFIG = {
  count: 320,
  color: '#FF6B35',
  fieldScale: 0.0025,
  fieldTime: 0.0006,
  fieldForce: 0.25,
  curlBoost: 3.2,
  curlEps: 1.2,
  neighborRadius: 42,
  neighborForce: 0.0028,
  mouseRadius: 180,
  mouseForce: 0.12,
  friction: 0.992,
  idleMotion: 0.06,
  reviveMotion: 0.9,
  centerPull: 0.000002,
  strokeMin: 0.2,
  strokeMax: 1.4,
  lengthMin: 0.5,
  lengthMax: 12,
};

type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  sw: number; len: number;
  tSw: number; tLen: number;
};

function fieldAngle(x: number, y: number, t: number) {
  const nx = x * CONFIG.fieldScale;
  const ny = y * CONFIG.fieldScale;
  return (
    Math.sin(nx + t) +
    Math.sin(ny * 1.3 - t * 1.2) +
    Math.sin((nx + ny) * 0.7 + t * 0.8)
  );
}

export const StarfieldBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let dpr = window.devicePixelRatio || 1;
    let W: number, H: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let time = 0;
    let raf: number;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < CONFIG.count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: 0, vy: 0,
          sw: CONFIG.strokeMin,
          len: CONFIG.lengthMin,
          tSw: CONFIG.strokeMin,
          tLen: CONFIG.lengthMin,
        });
      }
    }

    function tick() {
      time += CONFIG.fieldTime;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = CONFIG.color;
      ctx.fillStyle = CONFIG.color;
      ctx.lineCap = "round";

      const cx = W / 2, cy = H / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // curl noise
        const a0 = fieldAngle(p.x, p.y, time);
        const ax = fieldAngle(p.x + CONFIG.curlEps, p.y, time);
        const ay = fieldAngle(p.x, p.y + CONFIG.curlEps, time);
        const curlX = -(ay - a0) / CONFIG.curlEps * CONFIG.curlBoost;
        const curlY = (ax - a0) / CONFIG.curlEps * CONFIG.curlBoost;
        p.vx += curlX * CONFIG.fieldForce;
        p.vy += curlY * CONFIG.fieldForce;

        // neighbor repulsion
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = q.x - p.x, dy = q.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONFIG.neighborRadius * CONFIG.neighborRadius && d2 > 0) {
            const d = Math.sqrt(d2);
            const f = (CONFIG.neighborRadius - d) * CONFIG.neighborForce;
            const fx = (dx / d) * f, fy = (dy / d) * f;
            p.vx -= fx; p.vy -= fy;
            q.vx += fx; q.vy += fy;
          }
        }

        // mouse
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONFIG.mouseRadius && d > 0) {
            const f = (CONFIG.mouseRadius - d) / CONFIG.mouseRadius * CONFIG.mouseForce;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
        }

        // center pull
        p.vx += (cx - p.x) * CONFIG.centerPull;
        p.vy += (cy - p.y) * CONFIG.centerPull;

        // idle motion
        p.vx += (Math.random() - 0.5) * CONFIG.idleMotion;
        p.vy += (Math.random() - 0.5) * CONFIG.idleMotion;

        // friction
        p.vx *= CONFIG.friction;
        p.vy *= CONFIG.friction;

        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.x < 0) p.x += W;
        if (p.x > W) p.x -= W;
        if (p.y < 0) p.y += H;
        if (p.y > H) p.y -= H;

        // visual targets based on speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const mouseDist = mouse.active ? Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2) : 9999;
        const near = Math.max(0, 1 - mouseDist / CONFIG.mouseRadius);
        p.tSw = CONFIG.strokeMin + (CONFIG.strokeMax - CONFIG.strokeMin) * Math.min(spd * 2, 1) + near * 0.5;
        p.tLen = CONFIG.lengthMin + (CONFIG.lengthMax - CONFIG.lengthMin) * Math.min(spd * 3, 1);

        // ease
        p.sw += (p.tSw - p.sw) * 0.18;
        p.len += (p.tLen - p.len) * 0.18;

        // draw
        const angle = Math.atan2(p.vy, p.vx);
        if (p.len < 1.5) {
          ctx.fillRect(p.x, p.y, 1, 1);
        } else {
          ctx.beginPath();
          ctx.lineWidth = p.sw;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - Math.cos(angle) * p.len, p.y - Math.sin(angle) * p.len);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(tick);
    }

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => {
      mouse.active = false;
      // revive
      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * CONFIG.reviveMotion;
        p.vy += (Math.random() - 0.5) * CONFIG.reviveMotion;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", resize);

    resize();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: -1 }}
    />
  );
};
