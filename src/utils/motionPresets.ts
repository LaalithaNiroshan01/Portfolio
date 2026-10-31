import { MotionProps } from 'framer-motion';
import { MotionTier } from '../context/MotionPreferencesContext';

export function getRevealMotionProps(tier: MotionTier, delay = 0): Pick<
  MotionProps,
  'initial' | 'whileInView' | 'viewport' | 'transition'
> {
  const reduced = tier === 'minimal';
  const duration = reduced ? 0.12 : tier === 'balanced' ? 0.28 : 0.45;

  return {
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration, delay: reduced ? 0 : delay, ease: 'easeOut' }
  };
}
