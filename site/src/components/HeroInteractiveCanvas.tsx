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
  edgeWeight: number;
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

    const pointer = {
      targetX: 0,
      targetY: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      active: false,
      blend: 0 // 0 = default wing/edge distribution, 1 = active mouse tracking
    };

    const buildParticles = (w: number, h: number) => {
      const list: Particle[] = [];
      const spacing = w < 640 ? 32 : 35;
      const cols = Math.ceil(w / spacing) + 2;
      const rows = Math.ceil(h / spacing) + 2;
      const offsetX = (w - (cols - 1) * spacing) * 0.5;
      const offsetY = (h - (rows - 1) * spacing) * 0.5;

      // Central text sanctuary radii (keep center clean where title, subtitle & CTA sit)
      const textRx = Math.min(w * 0.34, 410);
      const textRy = Math.min(h * 0.42, 215);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = (Math.sin(r * 12.9898 + c * 78.233) * 0.5) * 14;
          const jitterY = (Math.cos(c * 45.164 + r * 93.721) * 0.5) * 14;
          const hx = offsetX + c * spacing + (r % 2 === 1 ? spacing * 0.5 : 0) + jitterX;
          const hy = offsetY + r * spacing + jitterY;

          // Distance from central text block (normalized ellipse)
          const ndx = (hx - w * 0.5) / textRx;
          const ndy = (hy - h * 0.48) / textRy;
          const centerEllipticalDist = Math.sqrt(ndx * ndx + ndy * ndy);

          // Skip particles deep inside the central text area so the middle is 100% clean
          if (centerEllipticalDist < 0.78) continue;

          // Weight how close this particle is to the left/right edges ("pontas") of the section
          const horizEdgeDist = Math.abs(hx - w * 0.5) / (w * 0.5); // 0 at center, 1 at left/right edge
          const edgeWeight = Math.min(1, Math.max(0, (centerEllipticalDist - 0.78) * 1.15) * (0.55 + 0.45 * horizEdgeDist));

          // Color mapped smoothly from Luminous Aqua (left wing) -> Cerulean Azure (mid-wings) -> Royal Indigo (right wing)
          const xNorm = Math.max(0, Math.min(0.999, hx / w));
          const yWave = Math.sin((hy / h) * Math.PI) * 0.15;
          const palettePos = Math.max(0, Math.min(0.999, xNorm * 0.85 + yWave));
          const colorIdx = Math.floor(palettePos * HUGENIS_PALETTE.length);

          // Default orientation radiates organically from the nearest lateral wing focal point
          const wingCenterX = hx < w * 0.5 ? w * 0.11 : w * 0.89;
          const wingCenterY = h * 0.5;

          list.push({
            hx,
            hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            angle: Math.atan2(hy - wingCenterY, hx - wingCenterX),
            color: HUGENIS_PALETTE[colorIdx],
            baseSize: 1.9 + ((r * 7 + c * 13) % 5) * 0.3,
            phase: r * 0.35 + c * 0.25,
            edgeWeight
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
      if (mx >= -20 && mx <= rect.width + 20 && my >= -20 && my <= rect.height + 20) {
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

      // Smoothly transition between default wing mode (blend = 0) and active mouse mode (blend = 1)
      const targetBlend = pointer.active ? 1 : 0;
      pointer.blend += (targetBlend - pointer.blend) * 0.08;

      const prevX = pointer.x;
      const prevY = pointer.y;
      pointer.x += (pointer.targetX - pointer.x) * 0.11;
      pointer.y += (pointer.targetY - pointer.y) * 0.11;
      pointer.vx = pointer.x - prevX;
      pointer.vy = pointer.y - prevY;

      ctx.clearRect(0, 0, width, height);

      // Default Left & Right Wing Focal Centers (living in the side margins where there is no text)
      const leftFocalX = width * 0.10 + Math.cos(time * 0.65) * 28;
      const leftFocalY = height * 0.50 + Math.sin(time * 0.8) * 36;
      const rightFocalX = width * 0.90 + Math.cos(time * 0.65 + Math.PI) * 28;
      const rightFocalY = height * 0.50 + Math.sin(time * 0.8 + 1.2) * 36;

      // Soft ambient Aqua glow on left edge & Azure/Indigo glow on right edge
      const leftGlow = ctx.createRadialGradient(leftFocalX, leftFocalY, 10, leftFocalX, leftFocalY, width * 0.34);
      leftGlow.addColorStop(0, "rgba(76, 232, 224, 0.12)");
      leftGlow.addColorStop(0.5, "rgba(46, 116, 201, 0.05)");
      leftGlow.addColorStop(1, "rgba(242, 246, 250, 0)");
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, width, height);

      const rightGlow = ctx.createRadialGradient(rightFocalX, rightFocalY, 10, rightFocalX, rightFocalY, width * 0.34);
      rightGlow.addColorStop(0, "rgba(46, 116, 201, 0.12)");
      rightGlow.addColorStop(0.5, "rgba(59, 51, 154, 0.05)");
      rightGlow.addColorStop(1, "rgba(242, 246, 250, 0)");
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, width, height);

      const wingRadius = Math.min(width * 0.42, 480);
      const mouseRadius = Math.min(width, height) * 0.52;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Default Edge/Wing Field (anchored at left & right edges of the section)
        const wingX = p.hx < width * 0.5 ? leftFocalX : rightFocalX;
        const wingY = p.hx < width * 0.5 ? leftFocalY : rightFocalY;
        const wdx = p.hx - wingX;
        const wdy = p.hy - wingY;
        const wDist = Math.sqrt(wdx * wdx + wdy * wdy) || 1;
        const wWave = Math.sin(wDist * 0.024 - time * 1.5 + p.phase * 0.25);

        const wingExcitement = Math.max(0, Math.min(1, (1 - wDist / wingRadius) * 1.15)) * p.edgeWeight;
        const wingPush = wingExcitement * 12 + wWave * 3.5 * p.edgeWeight;
        const wingAngle = Math.atan2(wdy, wdx);

        // 2. Mouse Cursor Field (when user moves mouse across the section)
        const mdx = p.hx - pointer.x;
        const mdy = p.hy - pointer.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy) || 1;
        const mWave = Math.sin(mDist * 0.025 - time * 1.8 + p.phase * 0.2);

        let mouseExcitement = 0;
        let mousePush = 0;
        if (mDist < mouseRadius) {
          const norm = 1 - mDist / mouseRadius;
          mouseExcitement = Math.sin(norm * Math.PI) * 0.95;
          mousePush = (mDist < 110 ? (110 - mDist) * 0.35 : mouseExcitement * 20) + mWave * 4.5;
        }
        const mouseAngle = Math.atan2(
          p.y - pointer.y + pointer.vy * 1.8,
          p.x - pointer.x + pointer.vx * 1.8
        );

        // Combine default wing field + active mouse field seamlessly
        const activeMouseWeight = pointer.blend * Math.max(0, 1 - mDist / (mouseRadius * 1.15));
        const excitement = Math.min(1, Math.max(wingExcitement, mouseExcitement * pointer.blend));

        const dirX = (wdx / wDist) * (1 - activeMouseWeight) + (mdx / mDist) * activeMouseWeight;
        const dirY = (wdy / wDist) * (1 - activeMouseWeight) + (mdy / mDist) * activeMouseWeight;
        const push = wingPush * (1 - activeMouseWeight) + mousePush * activeMouseWeight;

        const targetX = p.hx + dirX * push;
        const targetY = p.hy + dirY * push;

        p.vx = (p.vx + (targetX - p.x) * 0.14) * 0.78;
        p.vy = (p.vy + (targetY - p.y) * 0.14) * 0.78;
        p.x += p.vx;
        p.y += p.vy;

        // Blend orientation angle between wing flow and cursor tracking
        let angleDiff = mouseAngle - wingAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        const targetAngle = wingAngle + angleDiff * activeMouseWeight;

        let diff = targetAngle - p.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        p.angle += diff * 0.18;

        // Capsule dimensions & opacity: rich and vibrant on the edges ("pontas"), clean in the center
        const dashLength = (3.4 + excitement * 10.5 + (wWave + 1) * 1.4) * (p.baseSize / 2.1);
        const thickness = p.baseSize + excitement * 0.95;
        const alpha = Math.min(0.9, (0.28 + excitement * 0.62) * p.edgeWeight);

        if (alpha < 0.04) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.roundRect(-dashLength * 0.5, -thickness * 0.5, dashLength, thickness, thickness * 0.5);
        ctx.fillStyle = excitement > 0.08 ? p.color : "#6E8CA8";
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
