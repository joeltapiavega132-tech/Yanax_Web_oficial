// Adapted from SmoothUI's free Reveal Text registry component.
// https://smoothui.dev/docs/components/reveal-text
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export function RevealText({ children, direction = 'up', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const from = { up: { y: 24 }, down: { y: -24 }, left: { x: 24 }, right: { x: -24 } }[direction];
  return <motion.span ref={ref} className="smooth-reveal-text"
    initial={reduced ? { opacity: 1 } : { opacity: 0, ...from }}
    animate={reduced || inView ? { opacity: 1, x: 0, y: 0 } : undefined}
    transition={{ duration: reduced ? 0 : .42, delay: delay / 1000, ease: 'easeOut' }}>
    {children}
  </motion.span>;
}
