"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 35, mass: 0.3 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left"
      style={{ scaleX }}
    >
      <div className="h-full w-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-lighter" />
    </motion.div>
  );
}
