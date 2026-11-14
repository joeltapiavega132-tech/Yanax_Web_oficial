// Adapted from the free Unlumen UI Aurora Bars registry component.
// https://ui.unlumen.com/components/aurora-bars
import { useEffect, useRef, useState } from 'react';
import { useAnimationFrame, useReducedMotion } from 'motion/react';

function barHeight(index, total, time) {
  const position = index / Math.max(1, total - 1);
  const arch = Math.sin(position * Math.PI);
  const wave = 0.5 + 0.25 * Math.sin(time * 1.1 + position * Math.PI * 2)
    + 0.25 * Math.sin(time * 0.7 + position * Math.PI * 5.3);
  return 0.18 + (arch * 0.65 + wave * 0.35) * 0.74;
}

export function AuroraBars({ count = 18, colors = ['#114c5a', '#1c7781', '#ff9932', '#e65f4a', 'transparent'] }) {
  const reduced = useReducedMotion();
  const time = useRef(0);
  const visible = useRef(true);
  const elapsed = useRef(0);
  const container = useRef(null);
  const [heights, setHeights] = useState(() => Array.from({ length: count }, (_, i) => barHeight(i, count, 0)));
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !container.current) return;
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useAnimationFrame((_, delta) => {
    if (reduced || document.hidden || !visible.current) return;
    elapsed.current += delta;
    if (elapsed.current < 33) return;
    time.current += (elapsed.current / 1000) * 0.45;
    elapsed.current = 0;
    setHeights(Array.from({ length: count }, (_, i) => barHeight(i, count, time.current)));
  });
  const gradient = `linear-gradient(to top, ${colors.map((color, i) => `${color} ${Math.round(i / (colors.length - 1) * 100)}%`).join(', ')})`;
  return <div className="unlumen-aurora" ref={container} aria-hidden="true">
    {heights.map((height, i) => <div className="unlumen-aurora-track" key={i}>
      <div className="unlumen-aurora-bar" style={{ height: `${height * 100}%`, background: gradient }} />
    </div>)}
  </div>;
}
