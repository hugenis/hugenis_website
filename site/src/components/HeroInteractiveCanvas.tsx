import { useEffect, useRef, type JSX } from "react";

interface Particle {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  color: string;
  baseSize: number;
  phase: number;
}

// Official Hugenis Design System v1.0 Ribbon Palette (Aqua -> Azure -> Indigo)
const HUGENIS_PALETTE = [
  "#0D9488", // --aqua-600
  "#19C8C0", // --aqua-500
  "#4CE8E0", // --aqua-400
  "#2E74C9", // --azure-500
  "#4796E8", // --azure-400
  "#1D5BB0", // --azure-600
  "#4F46E5", // --indigo-500
  "#3B339A", // --indigo-600
  "#2C276E"  // --indigo-700
];

export function HeroInteractiveCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    // Smooth mouse-tracking state
    const pointer = {
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      active: false
    };

    const buildParticles = (w: number, h: number) => {
      const list: Particle[] = [];
      const spacing = w < 640 ? 34 : 38;
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;
      const offsetX = (w - (cols - 1) * spacing) * 0.5;
      const offsetY = (h - (rows - 1) * spacing) * 0.5;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Slight organic jitter around hex/grid lattice like antigravity.google
          const jitterX = (Math.sin(r * 12.9898 + c * 78.233) * 0.5) * 14;
          const jitterY = (Math.cos(c * 45.164 + r * 93.721) * 0.5) * 14;
          const hx = offsetX + c * spacing + (r % 2 === 1 ? spacing * 0.5 : 0) + jitterX;
          const hy = offsetY + r * spacing + jitterY;

          // Color mapped smoothly by angle/sector around canvas center using Hugenis Ribbon palette
          const normAngle = (Math.atan2(hy - h * 0.5, hx - w * 0.5) + Math.PI) / (Math.PI * 2);
          const colorIdx = Math.floor(normAngle * HUGENIS_PALETTE.length) % HUGENIS_PALETTE.length;

          list.push({
            hx,
            hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            angle: Math.atan2(hy - h * 0.5, hx - w * 0.5),
            color: HUGENIS_PALETTE[colorIdx],
            baseSize: 1.8 + ((r * 7 + c * 13) % 5) * 0.28,
            phase: (r * 0.35 + c * 0.25)
          });
        }
      }
      particles = list;
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!pointer.active) {
        pointer.x = width * 0.5;
        pointer.y = height * 0.5;
        pointer.targetX = width * 0.5;
        pointer.targetY = height * 0.5;
      }
      buildParticles(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (mx >= -40 && mx <= rect.width + 40 && my >= -40 && my <= rect.height + 40) {
        pointer.targetX = mx;
        pointer.targetY = my;
        pointer.active = true;
      } else {
        pointer.active = false;
      }
    };

    const handleMouseLeave = () => {
      pointer.active = false;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.025;

      // When mouse is inactive, gently orbit the focal center around the middle of the Hero
      if (!pointer.active) {
        pointer.targetX = width * 0.5 + Math.cos(time * 0.55) * (width * 0.08);
        pointer.targetY = height * 0.5 + Math.sin(time * 0.7) * (height * 0.06);
      }

      // Smooth spring-damped focal point tracking the cursor
      const prevX = pointer.x;
      const prevY = pointer.y;
      pointer.x += (pointer.targetX - pointer.x) * 0.095;
      pointer.y += (pointer.targetY - pointer.y) * 0.095;
      pointer.vx = pointer.x - prevX;
      pointer.vy = pointer.y - prevY;

      ctx.clearRect(0, 0, width, height);

      // Soft ambient Aqua/Azure glow following the focal cursor
      const glow = ctx.createRadialGradient(
        pointer.x,
        pointer.y,
        20,
        pointer.x,
        pointer.y,
        Math.max(width, height) * 0.48
      );
      glow.addColorStop(0, "rgba(76, 232, 224, 0.10)");
      glow.addColorStop(0.45, "rgba(46, 116, 201, 0.05)");
      glow.addColorStop(1, "rgba(242, 246, 250, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const influenceRadius = Math.min(width, height) * 0.62;
      const innerCalmRadius = 125;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Vector from focal cursor to particle home
        const dx = p.hx - pointer.x;
        const dy = p.hy - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        // Antigravity radial wave + repulsion ring around the cursor
        const wave = Math.sin(dist * 0.022 - time * 1.6 + p.phase * 0.2);
        let push = 0;
        let excitement = 0;

        if (dist < influenceRadius) {
          const norm = 1 - dist / influenceRadius;
          // Create a calm eye near the cursor and an energized ring around it (120px..420px)
          const ringFactor = dist < innerCalmRadius
            ? (dist / innerCalmRadius) * 0.6
            : Math.sin(norm * Math.PI);
          excitement = Math.max(0, ringFactor);
          push = (dist < innerCalmRadius ? (innerCalmRadius - dist) * 0.32 : excitement * 18) + wave * 4.5;
        }

        const dirX = dx / dist;
        const dirY = dy / dist;

        const targetX = p.hx + dirX * push;
        const targetY = p.hy + dirY * push;

        // Spring physics on particle position
        p.vx = (p.vx + (targetX - p.x) * 0.14) * 0.78;
        p.vy = (p.vy + (targetY - p.y) * 0.14) * 0.78;
        p.x += p.vx;
        p.y += p.vy;

        // Target angle points radially outward from the moving focal point (with subtle cursor velocity swirl)
        const targetAngle = Math.atan2(
          p.y - pointer.y + pointer.vy * 1.8,
          p.x - pointer.x + pointer.vx * 1.8
        );

        // Smooth angle interpolation
        let diff = targetAngle - p.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        p.angle += diff * 0.18;

        // Protect text readability in the very center of the Hero
        const centerDx = (p.x - width * 0.5) / 360;
        const centerDy = (p.y - height * 0.48) / 185;
        const centerDist2 = centerDx * centerDx + centerDy * centerDy;
        const textSafeFade = centerDist2 < 1 ? Math.max(0.16, centerDist2 * centerDist2) : 1;

        // Capsule length & opacity respond dynamically to cursor ring excitement
        const dashLength = (3.2 + excitement * 9.5 + (wave + 1) * 1.2) * (p.baseSize / 2.2);
        const thickness = p.baseSize + excitement * 0.9;
        const alpha = Math.min(0.88, (0.24 + excitement * 0.64) * textSafeFade);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.roundRect(-dashLength * 0.5, -thickness * 0.5, dashLength, thickness, thickness * 0.5);
        ctx.fillStyle = excitement > 0.12 ? p.color : "#6E8CA8";
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="heroInteractiveCanvas"
      aria-hidden="true"
    />
  );
}
