// Adapted from Magic UI's free Border Beam registry component.
// https://magicui.design/docs/components/border-beam
import { motion, useReducedMotion } from 'motion/react';

export function BorderBeam({ size = 110, duration = 7, colorFrom = '#ff9932', colorTo = '#e65f4a' }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <div className="magic-border-beam" aria-hidden="true">
    <motion.div className="magic-border-beam-light"
      style={{ width: size, height: size, offsetPath: `rect(0 auto auto 0 round ${size}px)`, background: `linear-gradient(90deg,transparent,${colorFrom},${colorTo},transparent)` }}
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: '100%' }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }} />
  </div>;
}
